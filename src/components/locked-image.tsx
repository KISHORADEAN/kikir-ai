"use client"

import { FrameOverlay } from "@/components/frame-overlay"

interface LockedImageProps {
  photos: string[]
  frameId: string
}

export function LockedImage({ photos, frameId }: LockedImageProps) {
  return (
    <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl">
      <div className="scale-110 blur-xl">
        <FrameOverlay photos={photos} frameId={frameId} />
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
