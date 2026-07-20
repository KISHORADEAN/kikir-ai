"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="text-gradient mb-4 text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
          KIKIR.AI
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 text-xl text-zinc-300 sm:text-2xl"
        >
          The world&apos;s most premium digital photobooth.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 text-sm text-zinc-500"
        >
          Transform your photos with state-of-the-art frames, stickers, and AI personality analysis.*
          <br />
          <span className="text-xs">*Results may already exist. Frames may look cheap.</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/upload">
            <Button
              size="lg"
              className="group gap-2 bg-purple-600 px-8 text-base hover:bg-purple-500"
            >
              <Camera className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
              Take a Photo
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              size="lg"
              variant="outline"
              className="group gap-2 border-white/20 px-8 text-base hover:bg-white/10"
            >
              View Pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
