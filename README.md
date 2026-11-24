# Portfolio — Andrii Zhmuryk

Source of my portfolio: **https://nostradam4ik.github.io**

I am an AI and full-stack developer based in Paris. The site is bilingual (French and English) and is built to be
checked rather than admired: every figure on it is read off a repository or a running product, and each project states
what it is (professional work, university project, personal product) and what it is not.

*Version française : le site s'ouvre en français par défaut, le sélecteur FR / EN est en haut à droite.*

## What is on the site

| Page | Content |
|---|---|
| **Home** | Who I am, availability, and the four pages. |
| **Work** (`/travaux`) | Full case studies: Leakia, AI Review Responder and Drone Watch (with a 34-second film), then three restaurant site mock-ups and three clickable demo apps, each with a scripted film. |
| **Experience** (`/parcours`) | Internships and missions, and the index of the other projects with links to their code. |
| **BUT framework** (`/referentiel`) | The competency self-assessment for my BUT Informatique, with the evidence and the limits. |
| **Profile** (`/profil`) | Education (degree certificate with the date of birth blacked out), languages, certificates, skills. |

The demos under `public/demos/` are real, scrollable pages with invented data (the restaurants and the fashion label do
not exist). The pages say so.

## Stack

- React 19, TypeScript 6, Vite 8
- Tailwind CSS 4
- oxlint
- No router library: a small hash router in `src/lib/router.ts`, so the site works on GitHub Pages without server rules
- No UI kit and no animation library; motion is CSS, and the videos are plain `<video>` elements that respect
  `prefers-reduced-motion`

Content lives in typed data files (`src/data/`), one object per language, so French and English cannot drift apart
silently: a missing translation is a type error.

## Run it

Node 22 or later.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, then production build into dist/
npm run lint
```

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
`vercel.json` also describes the same build and its security headers, in case the site is hosted elsewhere.

## Project layout

```
src/
  pages/        Home, Travaux, Parcours, Referentiel, Profil
  components/   header, footer, page head, home diagnostic, mock-ups and demo cards
  data/         profile, projects, competencies, copy (all text, FR and EN)
  lib/          i18n, router, types, typography helpers
public/
  cv/           CV and certificates published as PDF
  demos/        the clickable mock-ups and demo apps
  media/        films and posters
```

## Notes on what is published

- The employer of my most recent mission is not named at its request; the case study says so.
- The TOEIC score report is not published because it carries a date of birth; the score is stated and can be shown on
  request.
- The degree certificate is published as a PDF with the date and place of birth blacked out.
- Projects with private code say so instead of linking to a repository that does not exist.
