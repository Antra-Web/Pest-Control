# PestGuard Pro — Website

A clean, animated 8-page pest control business website. Pure HTML/CSS/JS — no build step, no dependencies to install.

## Pages
- `index.html` — Home
- `about.html` — About Us
- `services.html` — Services (Ants, Termites, Mosquitoes, Bed Bugs, Rodents, Commercial)
- `resources.html` — Pest Library / Blog
- `service-areas.html` — Service Areas
- `testimonials.html` — Reviews
- `contact.html` — Contact / Free Quote form

## How to publish on GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `pestguard-website`).
2. Upload **all files in this folder**, keeping the same structure:
   ```
   index.html
   about.html
   services.html
   resources.html
   service-areas.html
   testimonials.html
   contact.html
   css/styles.css
   js/main.js
   ```
   Easiest way: on the repo page, click **Add file → Upload files**, drag the whole folder in, and commit.
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment," set **Source** to `Deploy from a branch`.
5. Set **Branch** to `main` (or `master`) and folder to `/ (root)`, then click **Save**.
6. Wait 1–2 minutes. GitHub will give you a live link like:
   `https://yourusername.github.io/pestguard-website/`

That's it — no build tools, no npm install, it's ready to go as-is.

## Customizing
- **Colors / fonts:** all defined at the top of `css/styles.css` under `:root` — change one value and it updates everywhere.
- **Phone number / email / address:** currently placeholders `(888) 555-0199`, `hello@pestguardpro.com`, `482 Grove Street`. Find-and-replace across all files.
- **Contact form:** currently front-end only (shows a success message on submit but doesn't send anywhere). To actually receive submissions, connect it to a free form backend like Formspree or Getform — swap the `<form>` tag's action to their endpoint, or ask me and I'll wire it up.
- **Logo/images:** all icons and illustrations are inline SVG (no image files to swap), so they scale perfectly and load instantly. You can restyle colors directly in the SVG code, or replace with real photos later.
