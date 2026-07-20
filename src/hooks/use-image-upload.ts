"use client"

import { useCallback, useState } from "react"

const IMAGE_KEY = "kikir-uploaded-image"
const FRAME_KEY = "kikir-selected-frame"

export function useImageUpload() {
  const [image, setImage] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(IMAGE_KEY)
    }
    return null
  })
  const [isUploading, setIsUploading] = useState(false)

  const upload = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onload = () => {
        const data = reader.result as string
        sessionStorage.setItem(IMAGE_KEY, data)
        setImage(data)
        setIsUploading(false)
        resolve(data)
      }
      reader.onerror = () => {
        setIsUploading(false)
        reject(new Error("Failed to read file"))
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const clear = useCallback(() => {
    sessionStorage.removeItem(IMAGE_KEY)
    sessionStorage.removeItem(FRAME_KEY)
    setImage(null)
  }, [])

  const getImage = useCallback(() => {
    if (image) return image
    const stored =
      typeof window !== "undefined"
        ? sessionStorage.getItem(IMAGE_KEY)
        : null
    return stored
  }, [image])

  const setFrameId = useCallback((frameId: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(FRAME_KEY, frameId)
    }
  }, [])

  const getFrameId = useCallback(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(FRAME_KEY) || "polaroid"
    }
    return "polaroid"
  }, [])

  return {
    image,
    isUploading,
    upload,
    clear,
    getImage,
    setFrameId,
    getFrameId,
  }
}
