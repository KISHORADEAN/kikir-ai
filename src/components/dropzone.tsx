"use client"

import { useCallback, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileImage } from "lucide-react"

interface DropzoneProps {
  onUpload: (file: File) => void
  disabled?: boolean
}

export function Dropzone({ onUpload, disabled }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return
      const url = URL.createObjectURL(file)
      setPreview(url)
      onUpload(file)
    },
    [onUpload]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl"
    >
      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`glass-card relative flex cursor-pointer flex-col items-center justify-center rounded-2xl p-16 transition-all duration-300 ${
          isDragging ? "scale-[1.02] border-purple-500" : ""
        } ${disabled ? "pointer-events-none opacity-50" : ""}`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-64 rounded-lg object-contain"
            data-no-optimize
          />
        ) : (
          <>
            <motion.div
              animate={{ y: isDragging ? -8 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isDragging ? (
                <FileImage className="mb-4 h-16 w-16 text-purple-400" />
              ) : (
                <Upload className="mb-4 h-16 w-16 text-zinc-500" />
              )}
            </motion.div>
            <p className="text-lg font-medium text-zinc-300">
              {isDragging ? "Drop your photo here" : "Drag & drop or click to upload"}
            </p>
            <p className="mt-1 text-sm text-zinc-500">PNG, JPG, WEBP</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </motion.div>
  )
}
