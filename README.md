# 🎬 Netflix Clone
**Live demo:** https://netflix-clone-six-xi-23.vercel.app/

A streaming-style browsing app built with Next.js, TypeScript, and Tailwind CSS.
Built as a learning project to practice production-style frontend architecture.

> ⚠️ Educational project. Not affiliated with Netflix. Movie data and images
> are provided by [TMDB](https://www.themoviedb.org).

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- TMDB API

## Getting Started

### Prerequisites

- Node.js 20.9+
- pnpm

### Setup

```bash
git clone https://github.com/QueenNatty/netflix-clone.git
cd netflix-clone
pnpm install
cp .env.example .env.local   # then add your TMDB API key
pnpm dev
```

Open http://localhost:3000.

## Roadmap

- [x] Project setup
- [x] Data layer (TMDB)
- [x] Hero banner and movie rows
- [x] Authentication (email + Google)
- [x] Profile selection
- [ ] Search
- [ ] Movie details page

## License

MIT, see [LICENSE](./LICENSE).