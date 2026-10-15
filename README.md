# Heregoesnothing

Create an interactive romantic proposal website to ask someone to be your girlfriend.

Features and design requirements:

1. Intro with Animated Envelope & Audio Start:
- Start on a dreamy, romantic scene with soft pastel background, floating sparkles, and a sealed envelope in the center.
- The envelope has a cute heart wax seal and a label prompting: "A special delivery for you 💌 — Tap to open".
- When tapped, the wax seal breaks, the envelope flap smoothly unfolds, and the camera zooms/dives smoothly into the letter.
- Tapping to open the envelope starts playing the attached background audio ("Blue" by Yung Kai, from the attached mp3 file).
- Include a discreet floating music controller in the top corner (play/pause toggle, mute/volume icon, animated soundwave indicator when playing).

2. The Main Proposal Screen:
- Smoothly reveals the question: "Will you be my girlfriend? 🥺"
- No long story pages or filler; dive straight into the playful question.
- Starts with a cute GIF (such as the Minion blowing love kisses from Tenor post ID 10586631440146974859 or cute Mochi peach cat/bear).
- Two interactive buttons:
  - "Yes! 💕" — glowing, welcoming, and progressively grows bigger each time "No" is hovered or clicked.
  - "No" — playful evasion mechanics:
    - Dodges the cursor or touch on hover/tap by jumping to a new position on screen.
    - Scales down slightly with each attempt.
    - Button text cycles through funny pleading phrases: "Are you sure?", "Wait, reconsider!", "Pookie please 🥺", "Look at this face!", "Wrong button bestie 😂", "Say yes already 😭".
    - With each "No" attempt, swap the GIF to increasingly dramatic and cute reaction GIFs (shocked, pleading puppy eyes, crying minion/bear).

3. The "Yes!" Celebration:
- Full-screen confetti cannon explosion with heart particles.
- Celebratory victory GIF (cute dancing minions or happy mochi bear celebration).
- Celebration messaging:
  - "YAYYY! Officially official 🥰"
  - Include lyrics from the song: "I'll nap under moonlight skies with you... ✨"
  - Do NOT include the phrase "You just made me the happiest person alive!".
  - A sweet romantic card commemorating the moment with date and cute details.

4. UI & Polish:
- Responsive on both mobile and desktop.
- Smooth animations (using Tailwind and Framer Motion / Lucide icons).
- Dreamy aesthetic matching the warm, acoustic vibe of Yung Kai's "Blue".

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://heregoesnothing.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/212af327-51e3-4449-ba2f-74e4b7a66d3f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
