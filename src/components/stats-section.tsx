"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const stats = [
  { label: "Selfies Taken", value: 1.2, suffix: "M" },
  { label: "Muh Aesthetic", value: 99.9, suffix: "%" },
  { label: "Trusted by", value: 0, suffix: " Absolutely Nobody" },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(current)
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString("en-US", {
        maximumFractionDigits: target % 1 === 0 ? 0 : 1,
      })}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-24">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="glass-card rounded-2xl p-6 text-center"
          >
            <div className="mb-1 text-3xl font-bold text-purple-400">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm text-zinc-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
