"use client"

import { useMemo } from "react"
import { generateCelebrityMatch } from "@/lib/memes"
import { motion } from "framer-motion"

export function CelebrityMatch() {
  const match = useMemo(() => generateCelebrityMatch(), [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-xl p-4"
    >
      <p className="mb-1 text-xs text-zinc-500">Celebrity Lookalike</p>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{match.emoji}</span>
        <div>
          <p className="text-lg font-bold text-purple-300">
            {match.percentage}%
          </p>
          <p className="text-xs text-zinc-400">match with {match.name}</p>
        </div>
      </div>
    </motion.div>
  )
}
