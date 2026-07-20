"use client"

import { useCallback, useState } from "react"

const IMAGES_KEY = "kikir-photos"
const FRAME_KEY = "kikir-selected-frame"

export function useImageUpload() {
  const [photos, setPhotos] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(IMAGES_KEY)
      return stored ? JSON.parse(stored) : []
    }
    return []
  })
  const addPhoto = useCallback((dataUrl: string) => {
    const updated = [...photos, dataUrl]
    sessionStorage.setItem(IMAGES_KEY, JSON.stringify(updated))
    setPhotos(updated)
  }, [photos])

  const clear = useCallback(() => {
    sessionStorage.removeItem(IMAGES_KEY)
    sessionStorage.removeItem(FRAME_KEY)
    setPhotos([])
  }, [])

  const getPhotos = useCallback(() => {
    if (photos.length > 0) return photos
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(IMAGES_KEY)
      return stored ? JSON.parse(stored) : []
    }
    return []
  }, [photos])

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
    photos,
    addPhoto,
    clear,
    getPhotos,
    setFrameId,
    getFrameId,
  }
}
