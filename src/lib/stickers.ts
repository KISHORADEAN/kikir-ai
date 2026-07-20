export interface Sticker {
  id: string
  emoji: string
  label: string
  top: string
  left: string
  rotate: string
}

const randomPositions = [
  { top: "5%", left: "5%", rotate: "-10deg" },
  { top: "10%", left: "70%", rotate: "15deg" },
  { top: "60%", left: "5%", rotate: "5deg" },
  { top: "65%", left: "75%", rotate: "-5deg" },
  { top: "35%", left: "80%", rotate: "20deg" },
  { top: "45%", left: "-5%", rotate: "-15deg" },
  { top: "0%", left: "40%", rotate: "0deg" },
  { top: "70%", left: "35%", rotate: "8deg" },
]

const stickerEmojis = [
  { id: "crown", emoji: "👑", label: "Royal" },
  { id: "glasses", emoji: "😎", label: "Cool" },
  { id: "fire", emoji: "🔥", label: "Fire" },
  { id: "hundred", emoji: "💯", label: "Perfect" },
  { id: "star", emoji: "⭐", label: "Star" },
  { id: "rainbow", emoji: "🌈", label: "Rainbow" },
  { id: "heart", emoji: "❤️", label: "Love" },
  { id: "muscle", emoji: "💪", label: "Strong" },
  { id: "sparkle", emoji: "✨", label: "Magic" },
  { id: "skull", emoji: "💀", label: "Dead" },
  { id: "clown", emoji: "🤡", label: "Clown" },
  { id: "money", emoji: "💰", label: "Rich" },
]

export function generateRandomStickers(count = 3): Sticker[] {
  const shuffled = [...stickerEmojis].sort(() => Math.random() - 0.5)
  const positions = [...randomPositions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((s, i) => ({
    ...s,
    ...positions[i],
  }))
}
