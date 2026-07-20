"use client"

import { useCallback, useState } from "react"
import { initGoogleDrive, getAccessToken, uploadStripToDrive } from "@/lib/drive"

export function useGoogleDrive() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resultLink, setResultLink] = useState<string | null>(null)

  const saveToDrive = useCallback(async (photos: string[]) => {
    const clientId =
      typeof window !== "undefined"
        ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        : undefined

    if (!clientId) {
      setError(
        "Google Client ID belum diatur. Tambahkan NEXT_PUBLIC_GOOGLE_CLIENT_ID di .env.local"
      )
      return
    }

    setIsUploading(true)
    setError(null)
    setResultLink(null)

    try {
      setIsInitializing(true)
      await initGoogleDrive(clientId)
      setIsInitializing(false)

      const token = await getAccessToken()
      const link = await uploadStripToDrive(photos, token)
      setResultLink(link)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Gagal upload ke Google Drive"
      setError(message)
    } finally {
      setIsUploading(false)
      setIsInitializing(false)
    }
  }, [])

  return {
    saveToDrive,
    isUploading,
    isInitializing,
    error,
    resultLink,
  }
}
