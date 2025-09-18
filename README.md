# KrishiSahayi Prototype (Frontend-only)

This repo contains a frontend prototype built with Vite + React + TypeScript.
The backend (server) was removed to provide a frontend-only prototype suitable for static hosting on Vercel.

## Build & Run Locally

Install dependencies:

```powershell
npm install
```

Run dev server:

```powershell
npm run dev
```

Build production:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

## Deploy to Vercel

This repo includes `vercel.json` configured to use `dist/public` as the static output directory. Vercel will run the `vercel-build` script (which also calls `vite build`).

1. Connect this repository in Vercel
2. Vercel will run `npm install` then `npm run vercel-build`
3. The site will be served from `dist/public`

## Notes & Next Steps

- The project now uses frontend-only Zod schemas in `shared/schema.ts`.
- If you want to re-add server/API endpoints, restore the removed `server/` code and revert the `shared/schema.ts` changes.
- To reduce bundle size further, consider code-splitting large routes or moving heavy libs to dynamic imports.
