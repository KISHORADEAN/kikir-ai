"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  description?: string
  features: string[]
  popular?: boolean
  onCta: () => void
}

export function PricingCard({
  title,
  price,
  description,
  features,
  popular,
  onCta,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={cn(
        "glass-card relative flex flex-col rounded-2xl p-8 transition-shadow duration-300",
        popular ? "border-purple-500/50 shadow-lg shadow-purple-500/10" : ""
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-xs font-medium">
          Most Popular
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <div className="mb-1">
        <span className="text-3xl font-bold">{price}</span>
      </div>
      {description && (
        <p className="mb-6 text-sm text-zinc-500">{description}</p>
      )}
      <div className="mb-8 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
            <span className="text-sm text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <Button
          onClick={onCta}
          variant={popular ? "default" : "outline"}
          className={cn(
            "w-full gap-2",
            popular
              ? "bg-purple-600 hover:bg-purple-500"
              : "border-white/20 hover:bg-white/10"
          )}
        >
          {popular && <Sparkles className="h-4 w-4" />}
          {title === "ENTERPRISE" ? "Contact Sales" : "Get Started"}
        </Button>
      </div>
    </motion.div>
  )
}
