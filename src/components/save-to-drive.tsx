"use client"

import { useCallback } from "react"
import { motion } from "framer-motion"
import { useGoogleDrive } from "@/hooks/use-google-drive"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { Loader2, CheckCircle2, AlertCircle, ExternalLink, Cloud } from "lucide-react"

interface SaveToDriveProps {
  photos: string[]
}

export function SaveToDrive({ photos }: SaveToDriveProps) {
  const { saveToDrive, isUploading, isInitializing, error, resultLink } =
    useGoogleDrive()
  const { playSuccess } = useSoundEffect()

  const handleSave = useCallback(async () => {
    await saveToDrive(photos)
    playSuccess()
  }, [saveToDrive, photos, playSuccess])

  if (resultLink) {
    return (
      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        href={resultLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-green-500"
      >
        <CheckCircle2 className="h-4 w-4" />
        Tersimpan di Google Drive
        <ExternalLink className="h-3 w-3" />
      </motion.a>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleSave}
        disabled={isUploading || isInitializing}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 disabled:opacity-50"
      >
        {isUploading || isInitializing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {isInitializing ? "Initializing..." : "Menyimpan ke Drive..."}
          </>
        ) : (
          <>
            <Cloud className="h-4 w-4" />
            Save to Google Drive
          </>
        )}
      </button>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1 text-xs text-red-400"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </motion.p>
      )}
    </div>
  )
}
