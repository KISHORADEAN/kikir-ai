"use client"

import { useCallback, useState } from "react"

const STEPS = [
  "Scanning pixels...",
  "Detecting cinematic lighting...",
  "Enhancing emotions...",
  "Upscaling reality...",
  "Consulting expensive GPU...",
  "Done!",
]

interface ProcessingState {
  currentStep: number
  progress: number
  isDone: boolean
}

export function useProcessing() {
  const [state, setState] = useState<ProcessingState>({
    currentStep: 0,
    progress: 0,
    isDone: false,
  })

  const start = useCallback(() => {
    setState({ currentStep: 0, progress: 0, isDone: false })

    const duration = 8000 + Math.random() * 4000
    const interval = 50

    let elapsed = 0

    return new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        elapsed += interval
        const progress = Math.min(100, (elapsed / duration) * 100)
        const currentStep = Math.min(
          STEPS.length - 1,
          Math.floor((elapsed / duration) * STEPS.length)
        )

        setState({ currentStep, progress, isDone: false })

        if (elapsed >= duration) {
          clearInterval(timer)
          setState({ currentStep: STEPS.length - 1, progress: 100, isDone: true })
          resolve()
        }
      }, interval)
    })
  }, [])

  return { state, steps: STEPS, start }
}
