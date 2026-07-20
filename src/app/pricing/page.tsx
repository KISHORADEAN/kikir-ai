"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PaymentModal } from "@/components/payment-modal"
import { PricingCard } from "@/components/pricing-card"

const plans = [
  {
    title: "FREE",
    price: "Free",
    features: [
      "144p Preview",
      "Blur Included",
      "Unlimited Disappointment",
      "Basic Frame",
    ],
  },
  {
    title: "PRO",
    price: "Rp200.000",
    description: "Absolutely Worth It*",
    features: [
      "Full HD Photobooth",
      "All Premium Frames",
      "Exclusive Sticker Pack",
      "Personality Analysis",
      "Celebrity Lookalike",
      "Absolutely Worth It*",
    ],
    popular: true,
  },
  {
    title: "ENTERPRISE",
    price: "Contact Sales",
    features: [
      "Dedicated Account Manager",
      "Emotional Support",
      "Premium Kikir Experience",
      "Custom Frame Design",
    ],
  },
]

export default function PricingPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold">Simple Pricing</h1>
          <p className="text-zinc-400">
            Choose the plan that&apos;s right for you.
            <br />
            <span className="text-xs text-zinc-600">
              Or don&apos;t. We&apos;re not picky.
            </span>
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              onCta={() => setModalOpen(true)}
            />
          ))}
        </div>
      </div>

      <PaymentModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
