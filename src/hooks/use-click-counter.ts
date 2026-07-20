"use client"

import { useCallback, useRef } from "react"

export function useClickCounter(threshold: number, onReach: () => void) {
  const countRef = useRef(0)
  const triggeredRef = useRef(false)

  const increment = useCallback(() => {
    countRef.current++
    if (countRef.current >= threshold && !triggeredRef.current) {
      triggeredRef.current = true
      onReach()
    }
  }, [threshold, onReach])

  const reset = useCallback(() => {
    countRef.current = 0
    triggeredRef.current = false
  }, [])

  return { increment, reset }
}
