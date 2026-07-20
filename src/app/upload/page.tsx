"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Dropzone } from "@/components/dropzone"
import { ProcessingOverlay } from "@/components/processing-overlay"
import { useImageUpload } from "@/hooks/use-image-upload"
import { useProcessing } from "@/hooks/use-processing"
import { frames } from "@/lib/frames"
import { cn } from "@/lib/utils"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

const PROCESSING_STEPS = [
  "Selecting the perfect frame...",
  "Applying aesthetic stickers...",
  "Analyzing your personality...",
  "Matching with celebrity lookalike...",
  "Consulting expensive GPU...",
  "Done! Say cheese!",
]

export default function UploadPage() {
  const router = useRouter()
  const { upload, setFrameId } = useImageUpload()
  const { state, start } = useProcessing()
  const [showProcessing, setShowProcessing] = useState(false)
  const [selectedFrame, setSelectedFrame] = useState("polaroid")

  const handleFrameSelect = (id: string) => {
    setSelectedFrame(id)
  }

  const handleUpload = async (file: File) => {
    setFrameId(selectedFrame)
    await upload(file)
    setShowProcessing(true)
    await start()
    router.push("/result")
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-2 text-3xl font-bold">Photobooth Time!</h1>
        <p className="text-zinc-400">
          Pick a frame, drop your photo, and let the magic happen.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {showProcessing ? (
          <ProcessingOverlay
            key="processing"
            steps={PROCESSING_STEPS}
            currentStep={state.currentStep}
            progress={state.progress}
            isDone={state.isDone}
          />
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="mb-4 text-center text-sm font-medium text-zinc-400">
                Choose Your Frame
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {frames.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => handleFrameSelect(frame.id)}
                    className={cn(
                      "glass rounded-xl p-4 text-center transition-all duration-200 hover:border-purple-500/50",
                      selectedFrame === frame.id
                        ? "border-purple-500 ring-1 ring-purple-500"
                        : "border-white/10"
                    )}
                  >
                    <div
                      className={cn(
                        "mx-auto mb-2 h-12 w-12 rounded-lg border bg-zinc-800",
                        selectedFrame === frame.id
                          ? "border-purple-500"
                          : "border-white/10"
                      )}
                    />
                    <p className="text-xs font-medium">{frame.name}</p>
                    {selectedFrame === frame.id && (
                      <Check className="mx-auto mt-1 h-3 w-3 text-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <Dropzone onUpload={handleUpload} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
