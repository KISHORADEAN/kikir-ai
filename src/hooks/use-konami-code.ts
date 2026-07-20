"use client"

import { useEffect } from "react"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
]

export function useKonamiCode(onActivate: () => void) {
  useEffect(() => {
    let index = 0
    let timeout: ReturnType<typeof setTimeout> | null = null

    const handler = (e: KeyboardEvent) => {
      if (timeout) clearTimeout(timeout)

      const expected = KONAMI_CODE[index]
      if (e.key === expected) {
        index++
        if (index === KONAMI_CODE.length) {
          index = 0
          onActivate()
        }
      } else {
        index = 0
      }

      timeout = setTimeout(() => {
        index = 0
      }, 1000)
    }

    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
      if (timeout) clearTimeout(timeout)
    }
  }, [onActivate])
}
