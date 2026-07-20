"use client"

import { useCallback, useRef } from "react"

export function useSoundEffect() {
  const audioCtxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  const playBeep = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "square") => {
      try {
        const ctx = getCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = type
        osc.frequency.setValueAtTime(frequency, ctx.currentTime)
        gain.gain.setValueAtTime(0.1, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + duration)
      } catch {
        // Audio not supported
      }
    },
    [getCtx]
  )

  const playSuccess = useCallback(() => {
    playBeep(880, 0.15, "sine")
    setTimeout(() => playBeep(1100, 0.2, "sine"), 150)
  }, [playBeep])

  const playError = useCallback(() => {
    playBeep(200, 0.3, "sawtooth")
    setTimeout(() => playBeep(150, 0.4, "sawtooth"), 300)
  }, [playBeep])

  const playAchievement = useCallback(() => {
    playBeep(523, 0.1, "sine")
    setTimeout(() => playBeep(659, 0.1, "sine"), 100)
    setTimeout(() => playBeep(784, 0.15, "sine"), 200)
    setTimeout(() => playBeep(1047, 0.3, "sine"), 300)
  }, [playBeep])

  const playSad = useCallback(() => {
    playBeep(400, 0.3, "sine")
    setTimeout(() => playBeep(350, 0.3, "sine"), 300)
    setTimeout(() => playBeep(300, 0.5, "sine"), 600)
  }, [playBeep])

  return { playSuccess, playError, playAchievement, playSad }
}
