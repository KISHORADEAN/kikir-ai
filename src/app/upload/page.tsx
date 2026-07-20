"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { WebcamView } from "@/components/webcam-view"
import { PhotoStrip } from "@/components/photo-strip"
import { ProcessingOverlay } from "@/components/processing-overlay"
import { useImageUpload } from "@/hooks/use-image-upload"
import { useProcessing } from "@/hooks/use-processing"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { frames } from "@/lib/frames"
import { cn } from "@/lib/utils"
import { ArrowLeft, Check, Sparkles } from "lucide-react"
import Link from "next/link"

const PROCESSING_STEPS = [
  "Selecting the perfect frame...",
  "Applying aesthetic stickers...",
  "Analyzing your personality...",
  "Matching with celebrity lookalike...",
  "Consulting expensive GPU...",
  "Done! Say cheese!",
]

const MAX_PHOTOS = 4

export default function UploadPage() {
  const router = useRouter()
  const { photos, addPhoto, setFrameId, clear } = useImageUpload()
  const { state, start } = useProcessing()
  const { playSuccess } = useSoundEffect()
  const [step, setStep] = useState<"webcam" | "preview" | "processing">("webcam")
  const [selectedFrame, setSelectedFrame] = useState("polaroid")

  const handleCapture = (dataUrl: string) => {
    addPhoto(dataUrl)
    playSuccess()
    if (photos.length + 1 >= MAX_PHOTOS) {
      setStep("preview")
    }
  }

  const handleRetake = () => {
    clear()
    setStep("webcam")
  }

  const handleProceed = async () => {
    setFrameId(selectedFrame)
    setStep("processing")
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
          {step === "webcam"
            ? "Ambil 4 foto untuk photobooth strip-mu!"
            : step === "preview"
              ? "Hasil jepretanmu! Pilih frame dan proses."
              : "AI sedang bekerja..."}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === "webcam" && (
          <motion.div
            key="webcam"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WebcamView
              onCapture={handleCapture}
              capturedCount={photos.length}
              maxCaptures={MAX_PHOTOS}
            />
            {photos.length > 0 && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setStep("preview")}
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-purple-500"
                >
                  <Sparkles className="h-4 w-4" />
                  Lanjut ke Preview ({photos.length}/{MAX_PHOTOS})
                </button>
              </div>
            )}
          </motion.div>
        )}

        {step === "preview" && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <PhotoStrip photos={photos} />

            <div className="flex justify-center gap-3">
              <button
                onClick={handleRetake}
                className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Ambil Ulang
              </button>
              <button
                onClick={handleProceed}
                className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-purple-500"
              >
                Proses ✨
              </button>
            </div>

            <div>
              <h2 className="mb-4 text-center text-sm font-medium text-zinc-400">
                Pilih Frame
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {frames.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame.id)}
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
          </motion.div>
        )}

        {step === "processing" && (
          <ProcessingOverlay
            key="processing"
            steps={PROCESSING_STEPS}
            currentStep={state.currentStep}
            progress={state.progress}
            isDone={state.isDone}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
