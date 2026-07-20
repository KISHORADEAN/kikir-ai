"use client"

import { useCallback, useSyncExternalStore } from "react"

const IMAGES_KEY = "kikir-photos"
const FRAME_KEY = "kikir-selected-frame"

function getSnapshot(key: string) {
  if (typeof window === "undefined") return null
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function useSessionItem(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => null
  )
}

export function useImageUpload() {
  const storedPhotos = useSessionItem(IMAGES_KEY)
  const storedFrame = useSessionItem(FRAME_KEY)

  const photos: string[] = storedPhotos ? JSON.parse(storedPhotos) : []
  const frameId = storedFrame || "polaroid"
  const loaded = typeof window !== "undefined"

  const addPhoto = useCallback((dataUrl: string) => {
    const stored = sessionStorage.getItem(IMAGES_KEY)
    const current: string[] = stored ? JSON.parse(stored) : []
    const updated = [...current, dataUrl]
    sessionStorage.setItem(IMAGES_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event("storage"))
  }, [])

  const clear = useCallback(() => {
    sessionStorage.removeItem(IMAGES_KEY)
    sessionStorage.removeItem(FRAME_KEY)
    window.dispatchEvent(new Event("storage"))
  }, [])

  const setFrameId = useCallback((id: string) => {
    sessionStorage.setItem(FRAME_KEY, id)
    window.dispatchEvent(new Event("storage"))
  }, [])

  return {
    photos,
    frameId,
    loaded,
    addPhoto,
    clear,
    setFrameId,
  }
}
