"use client"

import { useMemo } from "react"
import { getFrameStyle } from "@/lib/frames"
import { generateRandomStickers } from "@/lib/stickers"

interface FrameOverlayProps {
  photos: string[]
  frameId: string
}

export function FrameOverlay({ photos, frameId }: FrameOverlayProps) {
  const frameStyle = useMemo(() => getFrameStyle(frameId), [frameId])
  const stickers = useMemo(() => generateRandomStickers(3), [])

  return (
    <div className={`relative inline-block overflow-hidden ${frameStyle.container}`}>
      <div className={`space-y-1 ${frameStyle.inner}`}>
        {photos.map((photo, i) => (
          <div key={i}>
            <img
              src={photo}
              alt={`Photo ${i + 1}`}
              className="w-64 object-cover sm:w-72"
            />
          </div>
        ))}
      </div>
      {stickers.map((s) => (
        <span
          key={s.id}
          className="absolute text-2xl sm:text-3xl pointer-events-none select-none"
          style={{
            top: s.top,
            left: s.left,
            transform: `rotate(${s.rotate})`,
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  )
}
