const SCOPES = "https://www.googleapis.com/auth/drive.file"

let tokenClient: google.accounts.oauth2.TokenClient | null = null
let gisLoaded = false

export function initGoogleDrive(clientId: string) {
  return new Promise<void>((resolve) => {
    if (gisLoaded) {
      resolve()
      return
    }
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.onload = () => {
      gisLoaded = true
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES,
        callback: () => {},
      })
      resolve()
    }
    document.head.appendChild(script)
  })
}

export function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error("Google Drive not initialized"))
      return
    }
    tokenClient.callback = (resp) => {
      if (resp.access_token) {
        resolve(resp.access_token)
      } else {
        reject(new Error("Failed to get access token"))
      }
    }
    tokenClient.requestAccessToken()
  })
}

async function ensureFolder(token: string): Promise<string> {
  const query = encodeURIComponent("name='KIKIR.AI' and mimeType='application/vnd.google-apps.folder' and trashed=false")
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const searchData = await searchRes.json()
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id
  }
  const createRes = await fetch(
    "https://www.googleapis.com/drive/v3/files",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "KIKIR.AI",
        mimeType: "application/vnd.google-apps.folder",
      }),
    }
  )
  const createData = await createRes.json()
  return createData.id
}

export async function uploadStripToDrive(
  photos: string[],
  token: string
): Promise<string> {
  const folderId = await ensureFolder(token)

  const canvas = document.createElement("canvas")
  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })

  const loaded = await Promise.all(photos.map(loadImage))
  const stripW = Math.max(...loaded.map((i) => i.naturalWidth))
  const stripH = loaded.reduce((sum, i) => sum + i.naturalHeight, 0)
  canvas.width = stripW
  canvas.height = stripH

  const ctx = canvas.getContext("2d")!
  let y = 0
  for (const img of loaded) {
    ctx.drawImage(img, 0, y)
    y += img.naturalHeight
    if (y < stripH) {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, y - 4, stripW, 4)
    }
  }

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Canvas empty"))), "image/jpeg", 0.92)
  )
  const metadata = JSON.stringify({
    name: `KIKIR-Photobooth-${new Date().toISOString().slice(0, 19).replace(/[:-]/g, "")}.jpg`,
    parents: [folderId],
  })

  const form = new FormData()
  form.append(
    "metadata",
    new Blob([metadata], { type: "application/json" })
  )
  form.append("file", blob, "photo.jpg")

  const uploadRes = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    }
  )
  const uploadData = await uploadRes.json()
  return uploadData.webViewLink || `https://drive.google.com/file/d/${uploadData.id}/view`
}
