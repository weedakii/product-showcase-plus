# اظلال (Adhlal)

A modern marketing and e-commerce website for **اظلال (Adhlal)** — a premium brand for curtains and smart home solutions in the Kingdom of Saudi Arabia.

## About the Project

This is the redesigned frontend for Adhlal, offering:

- **Marketing site**: Hero, products, features, stats, smart home solutions, testimonials, FAQ, and call-to-action sections
- **Store**: Product catalog and shopping experience
- **Company info**: About page, contact form, and legal pages (Privacy, Terms)
- **Dashboard**: Admin area for products and orders management (with login)
- **RTL-friendly**: Arabic-oriented branding and content (اظلال)

The app is a single-page application (SPA) with client-side routing and a responsive layout.

## Tech Stack

- **Vite** — Build tool and dev server
- **React 18** — UI library
- **TypeScript** — Typed JavaScript
- **React Router DOM** — Client-side routing
- **Tailwind CSS** — Styling
- **shadcn/ui** — UI components (Radix-based)
- **TanStack Query** — Server state / data fetching
- **Framer Motion** — Animations
- **Lucide React** — Icons

## Project Structure

```
adhlal-redesigned/
├── public/                 # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── assets/             # Images and static assets (logo, hero, etc.)
│   ├── components/
│   │   ├── ui/             # shadcn/ui primitives (Button, Card, Dialog, etc.)
│   │   ├── layout/         # Navbar, Footer, Layout
│   │   ├── home/           # Home page sections (Hero, Products, FAQ, CTA, etc.)
│   │   └── dashboard/      # Dashboard components (Products, Orders, Notifications)
│   ├── hooks/              # Custom hooks (toast, theme, mobile)
│   ├── lib/                # Utilities (e.g. cn, utils)
│   ├── pages/              # Route-level pages
│   │   ├── Index.tsx       # Home
│   │   ├── About.tsx
│   │   ├── Store.tsx
│   │   ├── Contact.tsx
│   │   ├── Privacy.tsx
│   │   ├── Terms.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── test/               # Vitest setup and tests
│   ├── App.tsx             # App shell, routing, providers
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles, Tailwind
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Key Routes

| Path        | Page       | Description                    |
|------------|------------|--------------------------------|
| `/`        | Home       | Landing with all home sections |
| `/about`   | About      | Company information            |
| `/store`   | Store      | Product catalog                |
| `/contact` | Contact    | Contact form                   |
| `/privacy` | Privacy    | Privacy policy                 |
| `/terms`   | Terms      | Terms of use                   |
| `/login`   | Login      | Admin login                    |
| `/dashboard` | Dashboard | Admin (products, orders)       |

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended) and **npm**  
  - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (optional)

### Install and run

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd adhlal-redesigned

# Install dependencies
npm install

# Start the development server (with HMR)
npm run dev
```

The app will be available at **http://localhost:8080** (or the port shown in the terminal).

### Other scripts

| Command           | Description                |
|-------------------|----------------------------|
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |
| `npm run test`    | Run Vitest tests           |

## Deployment

Build the app with:

```sh
npm run build
```

The output is in the `dist/` folder. Deploy `dist/` to any static host (e.g. Vercel, Netlify, or your own server). The project includes a `vercel.json` for Vercel deployment.

For client-side routing, ensure the server is configured to serve `index.html` for all routes (SPA fallback).

## License

Private — Adhlal (اظلال).
