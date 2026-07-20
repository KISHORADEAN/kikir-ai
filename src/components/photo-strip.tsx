"use client"

import { motion } from "framer-motion"

interface PhotoStripProps {
  photos: string[]
}

export function PhotoStrip({ photos }: PhotoStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-64 space-y-1 rounded-lg bg-white p-2 shadow-xl"
    >
      {photos.map((photo, i) => (
        <div key={i} className="relative overflow-hidden">
          <img
            src={photo}
            alt={`Photo ${i + 1}`}
            className="w-full object-cover"
          />
          {i < photos.length - 1 && (
            <div className="h-1 bg-white" />
          )}
        </div>
      ))}
    </motion.div>
  )
}
