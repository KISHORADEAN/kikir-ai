"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WebcamViewProps {
  onCapture: (dataUrl: string) => void
  capturedCount: number
  maxCaptures: number
}

export function WebcamView({ onCapture, capturedCount, maxCaptures }: WebcamViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setIsCameraReady(true)
      } catch {
        setError("Kamera tidak ditemukan. Izinkan akses kamera di browser.")
      }
    }
    start()
    return () => {
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const capture = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext("2d")!.drawImage(video, 0, 0)
    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader()
        reader.onload = () => {
          onCapture(reader.result as string)
        }
        reader.readAsDataURL(blob)
      }
    }, "image/jpeg", 0.85)
  }, [onCapture])

  const handleCapture = useCallback(() => {
    if (countdown !== null) return
    setCountdown(3)
    let c = 3
    const timer = setInterval(() => {
      c--
      if (c <= 0) {
        clearInterval(timer)
        setCountdown(null)
        capture()
      } else {
        setCountdown(c)
      }
    }, 1000)
  }, [countdown, capture])

  const isDone = capturedCount >= maxCaptures

  if (error) {
    return (
      <div className="glass-card mx-auto max-w-xl rounded-2xl p-12 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="glass-card relative overflow-hidden rounded-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full ${isCameraReady ? "opacity-100" : "opacity-0"}`}
          onCanPlay={() => videoRef.current?.play()}
        />
        {!isCameraReady && (
          <div className="flex h-80 items-center justify-center">
            <Camera className="h-12 w-12 animate-pulse text-zinc-600" />
          </div>
        )}

        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60"
            >
              <span className="text-8xl font-bold text-white">{countdown}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          {isDone
            ? "Semua foto sudah diambil!"
            : `Foto ${capturedCount + 1} dari ${maxCaptures}`}
        </p>
        {!isDone && (
          <Button
            onClick={handleCapture}
            disabled={!isCameraReady || countdown !== null}
            size="lg"
            className="gap-2 bg-purple-600 hover:bg-purple-500"
          >
            <Camera className="h-4 w-4" />
            Ambil Foto
          </Button>
        )}
      </div>
    </div>
  )
}
