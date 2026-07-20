"use client"

import { useEffect, useCallback } from "react"
import { toast } from "sonner"
import { useKonamiCode } from "@/hooks/use-konami-code"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { Trophy } from "lucide-react"

export function EasterEggProvider() {
  const { playAchievement } = useSoundEffect()

  const onKonami = useCallback(() => {
    playAchievement()
    toast("Achievement Unlocked", {
      description: "Certified Cheapskate",
      icon: <Trophy className="h-4 w-4 text-yellow-400" />,
      duration: 5000,
    })
  }, [playAchievement])

  useKonamiCode(onKonami)

  useEffect(() => {
    console.log("Nice try, hacker.")
    console.log("Still cheaper than buying Photoshop.")
  }, [])

  return null
}
