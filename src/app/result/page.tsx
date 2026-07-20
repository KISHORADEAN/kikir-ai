"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { LockedImage } from "@/components/locked-image"
import { UnlockCard } from "@/components/unlock-card"
import { PaymentModal } from "@/components/payment-modal"
import { PersonalityCard } from "@/components/personality-card"
import { CelebrityMatch } from "@/components/celebrity-match"
import { useImageUpload } from "@/hooks/use-image-upload"
import { useClickCounter } from "@/hooks/use-click-counter"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { ArrowLeft, Trophy, Camera, Download } from "lucide-react"

export default function ResultPage() {
  const { photos, frameId, loaded } = useImageUpload()
  const { playSuccess, playSad, playAchievement } = useSoundEffect()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (loaded && photos.length > 0) {
      playSuccess()
    }
  }, [loaded, photos.length, playSuccess])

  const onLegendary = useCallback(() => {
    playAchievement()
    toast("Persistence Level: Legendary", {
      description: "You clicked Unlock 10 times. We're impressed.",
      icon: <Trophy className="h-4 w-4 text-yellow-400" />,
    })
  }, [playAchievement])

  const { increment: incrementClicks } = useClickCounter(10, onLegendary)

  const handleUnlock = () => {
    playSad()
    incrementClicks()
    setModalOpen(true)
  }

  const handleDownload = useCallback(() => {
    if (photos.length === 0) return
    const canvas = document.createElement("canvas")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight * photos.length + (photos.length - 1) * 4
      const ctx = canvas.getContext("2d")!
      let y = 0
      const drawNext = (idx: number) => {
        const i = new Image()
        i.onload = () => {
          ctx.drawImage(i, 0, y)
          y += i.naturalHeight + 4
          if (idx < photos.length - 1) drawNext(idx + 1)
          else {
            canvas.toBlob((blob) => {
              if (blob) {
                const a = document.createElement("a")
                a.href = URL.createObjectURL(blob)
                a.download = `KIKIR-${Date.now()}.jpg`
                a.click()
              }
            }, "image/jpeg", 0.92)
          }
        }
        i.src = photos[idx]
      }
      drawNext(0)
    }
    img.src = photos[0]
  }, [photos])

  if (!loaded) {
    return null
  }

  if (photos.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Camera className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
          <h1 className="mb-2 text-2xl font-bold">No Photos Found</h1>
          <p className="mb-8 text-zinc-400">
            Take photobooth photos first before trying to unlock them.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-purple-500"
          >
            Go to Photobooth
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/upload"
          className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Take Another
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold">Your Photobooth Strip</h1>
          <p className="text-sm text-zinc-500">
            Our AI has finished analyzing your photos.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <LockedImage photos={photos} frameId={frameId} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <PersonalityCard />
              <CelebrityMatch />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:pt-0">
            <UnlockCard onUnlock={handleUnlock} />
            <button
              onClick={handleDownload}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              Download Strip
            </button>
          </div>
        </div>
      </div>

      <PaymentModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
