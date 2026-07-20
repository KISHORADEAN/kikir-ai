"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-400" />
          <span className="text-lg font-bold tracking-tight">KIKIR.AI</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
