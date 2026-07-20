"use client"

import { FrameOverlay } from "@/components/frame-overlay"

interface LockedImageProps {
  src: string
  frameId: string
}

export function LockedImage({ src, frameId }: LockedImageProps) {
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl">
      <div className="scale-110 blur-xl">
        <FrameOverlay src={src} frameId={frameId} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="rotate-[-30deg] text-4xl font-black tracking-[0.2em] text-white/20 sm:text-6xl">
          PREVIEW
        </span>
      </div>
    </div>
  )
}
