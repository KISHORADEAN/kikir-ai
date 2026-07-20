"use client"

import { motion } from "framer-motion"
import { Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UnlockCardProps {
  onUnlock: () => void
}

export function UnlockCard({ onUnlock }: UnlockCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass-card mx-auto max-w-sm rounded-2xl p-8 text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-4"
      >
        <Lock className="mx-auto h-12 w-12 text-purple-400" />
      </motion.div>
      <h2 className="mb-2 text-2xl font-bold">Locked</h2>
      <p className="mb-1 text-zinc-400">Unlock Full Photobooth Experience</p>
      <p className="mb-6 text-3xl font-bold text-purple-400">Rp99.900</p>
      <p className="mb-6 text-xs text-zinc-600">Lifetime Access</p>
      <Button
        onClick={onUnlock}
        size="lg"
        className="group w-full gap-2 bg-purple-600 text-base hover:bg-purple-500"
      >
        <Sparkles className="h-4 w-4" />
        Unlock Now
      </Button>
    </motion.div>
  )
}
