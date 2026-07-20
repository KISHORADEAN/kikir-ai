"use client"

import { useMemo } from "react"
import { getFrameStyle } from "@/lib/frames"
import { generateRandomStickers } from "@/lib/stickers"

interface FrameOverlayProps {
  src: string
  frameId: string
}

export function FrameOverlay({ src, frameId }: FrameOverlayProps) {
  const frameStyle = useMemo(() => getFrameStyle(frameId), [frameId])
  const stickers = useMemo(() => generateRandomStickers(3), [])

  return (
    <div className={`relative inline-block overflow-hidden ${frameStyle.container}`}>
      <div className={frameStyle.inner}>
        <img
          src={src}
          alt="Photobooth"
          className="w-full max-h-[60vh] object-contain"
        />
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
