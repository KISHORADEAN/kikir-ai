export interface Personality {
  title: string
  description: string
  emoji: string
}

export interface CelebrityMatch {
  name: string
  percentage: number
  emoji: string
}

const personalities: Personality[] = [
  { title: "Meme Lord", description: "You would laugh at a meme during a funeral.", emoji: "🤣" },
  { title: "Night Owl", description: "Your brain works best at 3 AM doomscrolling.", emoji: "🦉" },
  { title: "Certified Cheapskate", description: "You're still here instead of paying Rp200.000.", emoji: "💰" },
  { title: "Main Character", description: "You think your life is a movie. It's not.", emoji: "🎬" },
  { title: "Side Quest Enjoyer", description: "You open TikTok for 5 minutes. 3 hours later...", emoji: "🎮" },
  { title: "Professional Procrastinator", description: "You'll read this later.", emoji: "⏰" },
  { title: "WiFi Warrior", description: "Your opinions are 80% Twitter threads.", emoji: "📱" },
  { title: "Overthinker Supreme", description: "You're analyzing why you got this result.", emoji: "🧠" },
  { title: "Broke But Boujee", description: "You want premium results for free. Relatable.", emoji: "💅" },
  { title: "NPC Energy", description: "You just go with the flow. Literally.", emoji: "🧑‍💻" },
]

const celebrities: CelebrityMatch[] = [
  { name: "Luna Maya", percentage: 73, emoji: "🌟" },
  { name: "Raffi Ahmad", percentage: 42, emoji: "🎤" },
  { name: "Atta Halilintar", percentage: 58, emoji: "🔥" },
  { name: "Baim Wong", percentage: 35, emoji: "🎬" },
  { name: "Nagita Slavina", percentage: 67, emoji: "👑" },
  { name: "Bryan Domani", percentage: 51, emoji: "😎" },
  { name: "Cinta Laura", percentage: 88, emoji: "💪" },
  { name: "Jerome Polin", percentage: 45, emoji: "📐" },
  { name: "Brad Pitt", percentage: 12, emoji: "🤷" },
  { name: "Ny. Kasino", percentage: 69, emoji: "😂" },
]

export function generatePersonality(): Personality {
  return personalities[Math.floor(Math.random() * personalities.length)]
}

export function generateCelebrityMatch(): CelebrityMatch {
  return celebrities[Math.floor(Math.random() * celebrities.length)]
}
