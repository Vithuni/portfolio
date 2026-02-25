# Vithuni Rodrigo – Personal Portfolio

A modern, responsive, recruiter-focused portfolio website for **Vithuni Rodrigo**, Software Engineering graduate and **Software Engineer**.

Built with **HTML5**, **CSS3**, and **vanilla JavaScript** – no build tools required and fully ready for static hosting (Netlify, Vercel, GitHub Pages).

## Structure

```text
.
├─ index.html          # Main single-page portfolio
├─ assets/
│  ├─ css/
│  │  └─ style.css    # Global styles, layout, dark/light theme
│  ├─ js/
│  │  └─ main.js      # Interactivity, animations, filters, theme toggle
│  └─ img/
│     └─ favicon.png  # (Optional) favicon – add your own
└─ assets/cv/
   └─ Vithuni_Rodrigo_CV.pdf  # CV file used by the "Download CV" button
```

## Features

- **Modern dark UI** with gold accent and light mode toggle.
- **Sticky navbar** with smooth scrolling and mobile menu.
- **Recruiter-focused layout**:
  - Hero with title, tagline, and quick CTA buttons.
  - Profile, Experience, Skills, Projects, Services, and Contact sections.
- **Project cards** with filters (All / Web / Mobile / Academic).
- **Animated skill bars** using IntersectionObserver.
- **Scroll animations** (fade-in sections).
- **Floating contact button** linking to the contact section.
- **SEO-friendly** `<head>` tags and clean semantic HTML.
- **Accessibility-conscious**:
  - Skip link to main content.
  - Color contrast-friendly palette.
  - Respects `prefers-reduced-motion` for scrolling.

## How to Run Locally

1. Place the folder (containing `index.html` and `assets/`) anywhere on your machine.
2. (Optional but recommended) Use a simple local server:
   - With Python 3:
     ```bash
     cd path/to/project
     python -m http.server 8000
     ```
   - Then open `http://localhost:8000` in your browser.
3. Alternatively, open `index.html` directly in your browser (double-click), though some browsers limit certain features when opened from the file system.

## How to Deploy

### Netlify

1. Create a Netlify account.
2. Drag and drop the **entire project folder** (with `index.html` at the root) into the Netlify dashboard’s "Deploy site" area  
   **or** push this folder to a Git repo and:
   - Click **"Add new site" → "Import an existing project"**.
   - Select your repo.
   - Build command: _leave empty_ (no build needed).
   - Publish directory: `.` (project root).

### Vercel

1. Create a Vercel account.
2. Push the project to GitHub/GitLab/Bitbucket.
3. In Vercel:
   - Click **"New Project"** and import the repo.
   - Framework preset: **Other** (static).
   - Build command: _empty_.
   - Output/public directory: `.`.
4. Deploy – Vercel will give you a production URL.

### GitHub Pages

1. Create a new GitHub repository and push these files.
2. In the repo settings:
   - Go to **Pages**.
   - Source: **Deploy from a branch**.
   - Branch: `main` (or `master`), folder: `/root`.
3. Save – GitHub will provide your Pages URL after a minute or two.

## Customization

- **CV**: replace `assets/cv/Vithuni_Rodrigo_CV.pdf` with your actual CV file, keeping the same name (or update the link in `index.html`).
- **Projects**: update the project cards in the **Projects** section in `index.html`, including:
  - Title
  - Description
  - Tech stack tags
  - GitHub URLs and live demo URLs (once available)
- **Branding**: tweak colors and spacing in `assets/css/style.css` (design tokens at the top).
- **Analytics / extra SEO**: you can add Google Analytics, extra meta tags, or JSON-LD in the `<head>` of `index.html` as needed.

