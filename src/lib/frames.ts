export interface Frame {
  id: string
  name: string
  description: string
}

export const frames: Frame[] = [
  {
    id: "polaroid",
    name: "Polaroid Classic",
    description: "That iconic white border. Very aesthetic.",
  },
  {
    id: "retro",
    name: "Retro 90s",
    description: "Like your mom's photo album. But digital.",
  },
  {
    id: "glitch",
    name: "Glitch Core",
    description: "When the matrix is having a stroke.",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "ＡＥＳＴＨＥＴＩＣ　ｖｉｂｅｓ　ｏｎｌｙ",
  },
  {
    id: "kikir",
    name: "Kikir Edition",
    description: "The cheapest frame. Fits the brand.",
  },
]

export interface FrameStyle {
  container: string
  inner: string
}

export function getFrameStyle(frameId: string): FrameStyle {
  switch (frameId) {
    case "polaroid":
      return {
        container:
          "bg-white p-4 pb-12 shadow-xl rotate-1",
        inner: "border-2 border-zinc-200",
      }
    case "retro":
      return {
        container:
          "border-8 border-yellow-200/80 rounded-sm shadow-lg",
        inner: "",
      }
    case "glitch":
      return {
      container:
        "relative before:absolute before:inset-0 before:bg-cyan-400/20 before:translate-x-1 after:absolute after:inset-0 after:bg-fuchsia-400/20 after:-translate-x-1 border-2 border-cyan-400/50",
        inner: "",
      }
    case "vaporwave":
      return {
        container:
          "border-4 border-pink-400/60 rounded-none shadow-[0_0_30px_10px_rgba(168,85,247,0.3)]",
        inner: "",
      }
    case "kikir":
      return {
        container:
          "border-2 border-dashed border-zinc-600 rounded-md",
        inner: "",
      }
    default:
      return { container: "", inner: "" }
  }
}
