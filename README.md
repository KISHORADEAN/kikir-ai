# KIKIR.AI

A parody "premium AI photobooth" built with Next.js. It is a learning project:
the marketing copy is deliberately over the top, the AI is fake, and there is
no payment processing.

## What it does

- Opens the webcam and captures up to four photos.
- Applies a frame plus random stickers and effects.
- Runs a fake multi-step "AI processing" animation.
- Generates a joke personality reading and a celebrity lookalike.
- Shows a locked result with a fake paywall; the unlock flow is a prank.

Photos are kept in the browser's session storage and are never sent to a
server. Closing the tab clears them.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero, stats and entry points |
| `/upload` | Webcam capture, frame selection and "processing" |
| `/result` | Photo strip, personality card, locked image and fake paywall |
| `/pricing` | Parody pricing tiers and payment modal |
| `/about` | What the project really is |

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 and TypeScript
- Tailwind CSS 4
- Base UI, shadcn-style components, lucide-react icons
- Framer Motion for animation
- Sonner for toasts
- Vercel Analytics

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The webcam needs a browser
permission and a secure context (`localhost` counts as secure).

## Scripts

```bash
npm run dev     # development server
npm run build   # production build (type-checks too)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```text
src/
├── app/            routes: /, upload, result, pricing, about
├── components/     UI sections, webcam, frames, stickers, payment modal
├── hooks/          photo storage, fake processing, sounds, click counter
└── lib/            frame, sticker and meme data
```

Edit the homepage in `src/app/page.tsx`; it reloads automatically while the
development server runs.

## Notes

- Everything runs client-side. There is no API, database or authentication.
- The "payment" modal does not charge anything and no card details are
  collected.
- Session storage means a refresh keeps the photos, but a new tab does not.
