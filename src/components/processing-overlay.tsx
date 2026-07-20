"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Camera, Sparkles } from "lucide-react"

interface ProcessingOverlayProps {
  steps: string[]
  currentStep: number
  progress: number
  isDone: boolean
}

export function ProcessingOverlay({
  steps,
  currentStep,
  progress,
  isDone,
}: ProcessingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card mx-auto w-full max-w-xl rounded-2xl p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        {isDone ? (
          <Sparkles className="h-6 w-6 text-green-400" />
        ) : (
          <Camera className="h-6 w-6 animate-pulse text-purple-400" />
        )}
        <span className="text-lg font-medium">
          {isDone ? "Your photobooth is ready!" : "Processing your photo..."}
        </span>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: i <= currentStep ? 1 : 0.4,
              x: 0,
            }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            {i < currentStep ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
            ) : i === currentStep ? (
              <Camera className="h-4 w-4 shrink-0 animate-pulse text-purple-400" />
            ) : (
              <div className="h-4 w-4 shrink-0 rounded-full border border-zinc-600" />
            )}
            <span
              className={`text-sm ${
                i <= currentStep ? "text-zinc-200" : "text-zinc-600"
              }`}
            >
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
