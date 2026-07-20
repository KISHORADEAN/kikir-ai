"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-6 text-3xl font-bold">About KIKIR.AI</h1>

        <div className="glass-card space-y-4 rounded-2xl p-8 text-zinc-300 leading-relaxed">
          <p>
            KIKIR.AI is a <strong>parody photobooth project</strong> created
            for learning web development.
          </p>

          <p>
            The website is designed to look like a premium AI photobooth
            platform, complete with glassmorphism UI, smooth animations, and
            convincing marketing copy. But it&apos;s all a joke.
          </p>

          <p>
            Upload a photo, pick a frame, and watch as our &quot;AI&quot; adds
            random stickers, generates a fake personality analysis, and matches
            you with a celebrity lookalike — all before asking you to pay
            Rp200.000 to unlock what you already uploaded.
          </p>

          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-300">
            <p className="font-medium">
              No real payments are accepted.
            </p>
            <p className="mt-1 text-sm text-yellow-400/80">
              Every &quot;payment&quot; button opens a funny modal explaining
              that this is just a demo. No money is collected, no transactions
              are processed, and no AI photo enhancement actually occurs.
            </p>
          </div>

          <p>
            Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and
            shadcn/ui.
          </p>

          <p className="text-sm text-zinc-500">
            Kikir (pronounced kee-keer) means &quot;stingy&quot; in Indonesian.
            The name is a commentary on how much you&apos;d have to be willing
            to pay for something that probably already exists.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
