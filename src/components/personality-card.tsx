"use client"

import { useMemo } from "react"
import { generatePersonality } from "@/lib/memes"
import { motion } from "framer-motion"

export function PersonalityCard() {
  const personality = useMemo(() => generatePersonality(), [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-xl p-4"
    >
      <p className="mb-1 text-xs text-zinc-500">AI Personality Analysis</p>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{personality.emoji}</span>
        <div>
          <p className="font-semibold text-purple-300">{personality.title}</p>
          <p className="text-xs text-zinc-400">{personality.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
