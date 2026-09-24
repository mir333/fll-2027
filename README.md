# FLL 2027 – Team Progress Page

A simple static website, deployed on [Vercel](https://vercel.com), that shows our progress in the
FIRST LEGO League 2026/2027 season.

## Updating progress

All content is in **`public/progress.json`**, so you don't need to touch any code:

- Mark a task finished: set `"done": true`
- Add a task: add `{ "title": "...", "done": false }` to an area's `tasks`
- Add a news entry: add `{ "date": "YYYY-MM-DD", "text": "..." }` to the top of `log`
- Change `updated` to today's date

Commit and push, and Vercel redeploys the site automatically.

## Run locally

```bash
npm run dev   # http://localhost:3000
```

## Deploy on Vercel (one-time setup)

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New → Project**, then import the `fll-2027` repository.
3. Keep the defaults (Framework Preset: *Other*). `vercel.json` already sets `public/` as the output directory, with no build step.
4. Click **Deploy**.

Each push to `main` updates the live site. Other branches and pull requests get their own preview URLs.

## Project structure

```
public/
  index.html      page layout
  styles.css      styling (LEGO colours, light/dark mode)
  app.js          reads progress.json and renders the page
  progress.json   ← edit this to update progress
vercel.json       Vercel configuration
zaklad.llsp3      SPIKE Prime robot program
```
