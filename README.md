# Sri Tulasi Caterers – Website

A modern, fully responsive website for **Sri Tulasi Caterers**, Hayathnagar, Hyderabad.

## 📁 Project Structure

```
sri-tulasi-caterers/
├── index.html    ← Main HTML (all sections/pages as one-page scroll)
├── style.css     ← Custom CSS (animations, components, responsive)
├── script.js     ← JavaScript (navbar, tabs, reveal, form, smooth scroll)
└── README.md     ← This file
```

## 🚀 How to Run Locally

### Option 1 – Just open in browser (quickest)
1. Download / unzip the project folder.
2. Double-click `index.html` — it opens directly in your browser. ✅

### Option 2 – VS Code Live Server (recommended)
1. Install [VS Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Open the project folder in VS Code.
4. Right-click `index.html` → **"Open with Live Server"**.
5. Site runs at `http://127.0.0.1:5500` with auto-reload on save. ✅

### Option 3 – Python simple server
```bash
cd "/Users/phanimiryala/Desktop/Sri Tulasi"
python3 -m http.server 8001
# Open http://127.0.0.1:8001 in your browser
```

### Option 4 – Node http-server
```bash
npm install -g http-server
cd sri-tulasi-caterers
http-server -p 8080
# Open http://localhost:8080
```

## 📱 Features

| Feature | Detail |
|---|---|
| Responsive | Mobile, tablet & desktop |
| Sticky Navbar | Transparent → frosted glass on scroll |
| Hero Section | Animated biryani bowl, particles, gold ornaments |
| About Section | Chef illustration, stats, story |
| Services | Wedding, Corporate, Birthday, All Functions |
| Menu | Veg / Non-Veg tab toggle with styled items |
| Gallery | 6-item grid with hover overlays |
| Contact Form | Validates input → redirects to WhatsApp |
| Google Maps | Embedded map for location |
| WhatsApp FAB | Floating "Book Now" button |
| Click-to-Call | Phone numbers are `tel:` links |
| Smooth Scroll | Offset-corrected for sticky navbar |
| Scroll Reveal | Staggered fade-in on scroll |

## 🎨 Color Palette

| Name | Hex |
|---|---|
| Forest Green | `#1A4A2E` |
| Antique Gold | `#C8970A` |
| Saffron Orange | `#E8620A` |
| Deep Crimson | `#8B1A1A` |
| Warm Cream | `#FDF6E3` |
| Deep Spice | `#5C1A0A` |

## ✏️ Customisation

- **Phone numbers**: Search `9392923516` and `9989984687` in `index.html` and `script.js`.
- **WhatsApp number**: Update `wa.me/91XXXXXXXXXX` links.
- **Address**: Update in the Contact section and the iframe `src`.
- **Google Maps**: Replace the `iframe src` in the Contact section with an embed link from [maps.google.com](https://maps.google.com) for the exact address.
- **Real photos**: Replace the SVG placeholder `<div class="gallery-placeholder ...">` blocks with `<img>` tags.
- **Menu items**: Edit directly in the `#menu` section of `index.html`.

## 📦 Dependencies (all CDN – no install needed)

- [Tailwind CSS](https://tailwindcss.com/) – utility classes
- [Google Fonts](https://fonts.google.com/) – Playfair Display + Nunito

No npm, no build step, no node_modules. Pure HTML + CSS + JS. ✅

## 🌍 Deploy Live

This project is ready to deploy as a static website on GitHub Pages, Netlify, or Vercel.

### GitHub Pages
1. Create a new GitHub repository.
2. Upload all files in this folder, including `assets/`, `.nojekyll`, `netlify.toml`, and `vercel.json`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your default branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish.

### Netlify
1. Go to [Netlify](https://netlify.com).
2. Choose **Add new site → Deploy manually**.
3. Drag this whole folder into Netlify.
4. Netlify will publish the project root automatically using `netlify.toml`.

### Vercel
1. Go to [Vercel](https://vercel.com).
2. Choose **Add New → Project**.
3. Import your GitHub repo or upload the folder.
4. Vercel will use `vercel.json` and serve `index.html` as the site entry.

## ✅ Before Publishing

- Keep `assets/biryani-background.jpg` inside the project.
- Test the site once on mobile and desktop.
- Replace any temporary content you do not want public before launch.
- If using a custom domain, update DNS only after the first successful deploy.

---

*Built with ❤️ for Sri Tulasi Caterers, Hayathnagar, Hyderabad*
