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
import { ArrowLeft, Trophy } from "lucide-react"

export default function ResultPage() {
  const { getImage, getFrameId } = useImageUpload()
  const { playSuccess, playSad, playAchievement } = useSoundEffect()
  const [modalOpen, setModalOpen] = useState(false)
  const image = getImage()
  const frameId = getFrameId()

  useEffect(() => {
    if (image) {
      playSuccess()
    }
  }, [image, playSuccess])

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

  if (!image) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Trophy className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
          <h1 className="mb-2 text-2xl font-bold">No Photo Found</h1>
          <p className="mb-8 text-zinc-400">
            Take a photobooth photo first before trying to unlock it.
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
          <h1 className="mb-2 text-3xl font-bold">Your Photobooth Result</h1>
          <p className="text-sm text-zinc-500">
            Our AI has finished analyzing your photo.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <LockedImage src={image} frameId={frameId} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <PersonalityCard />
              <CelebrityMatch />
            </div>
          </div>
          <div className="flex items-start lg:pt-0">
            <UnlockCard onUnlock={handleUnlock} />
          </div>
        </div>
      </div>

      <PaymentModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
