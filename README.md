# RallyUp LinkedIn Post Generator

A minimal, attractive React (Vite + Tailwind) frontend with a Vercel serverless API that generates LinkedIn-style posts from a topic/brief. Light & dark themes supported.

## Tech
- React + Vite + TypeScript
- Tailwind CSS
- Vercel serverless function (`/api/generate`)
- OpenAI Chat Completions (fallback to a mock if no key)

## Quick Start (Local with Vercel CLI)
1. Install dependencies:
   ```bash
   npm i -g vercel
   npm i
   ```
2. Create a `.env.local` at the project root:
   ```bash
   OPENAI_API_KEY=your_key_here
   ```
3. Run locally with the API available:
   ```bash
   vercel dev
   ```
   > This runs both Vite and the `/api/generate` function so your front-end can call `/api/generate`.

## Deploy on Vercel
1. Push this repo to GitHub (`lohitredyy/rallyupchatbot`).
2. Import on Vercel → Framework preset: **Vite**.
3. Add Environment Variable `OPENAI_API_KEY` in Vercel Project Settings.
4. Deploy. The app will call `/api/generate` in your Vercel deployment.

## Customization
- **Branding:** Replace `public/favicon.ico` with your logo.
- **Tone/guardrails:** Tweak the `system` message in `api/generate.ts`.
- **Styling:** Edit `src/index.css` + Tailwind config.

## Accessibility & UX
- Keyboard focusable controls, readable color contrast in both themes.
- Clear error messages and loading states.
- Copy-to-clipboard button for generated text.

## Notes
- Keep prompts short and specific for best results.
- Default output length ~120–180 words; adjust in `api/generate.ts` user message.