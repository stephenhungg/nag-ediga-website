# Nag Ediga - Portfolio Website

A modern, abstract portfolio website for a Mechanical Engineering student at UC Berkeley, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Abstract Design**: Asymmetric layouts, geometric elements, and creative typography
- **Smooth Animations**: GSAP-powered landing animation with thread patterns
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Projects**: Expandable masonry grid for showcasing projects
- **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **React Bits** - UI components

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite configuration
4. Deploy!

The `vercel.json` configuration file is included for optimal settings:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing: All routes redirect to `index.html`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the production-ready files
3. Deploy the `dist` folder to your hosting provider

## Project Structure

```
├── public/          # Static assets (images, etc.)
├── src/
│   ├── components/  # React components
│   ├── styles/      # Global styles
│   └── lib/         # Utility functions
├── index.html       # HTML entry point
└── vite.config.ts   # Vite configuration
```

## License

Private project - All rights reserved
