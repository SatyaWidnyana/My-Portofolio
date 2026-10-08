# Bali Adventure stack assets

These locally stored assets identify technologies found in the Bali Adventure source project. They are not custom-drawn logos and have not been recolored. SVG is used where available so logos stay sharp; the Google Fonts asset is PNG.

## Frontend (`FE`)

| File | Download source | Attribution / context |
| --- | --- | --- |
| `html5.svg` | https://www.w3.org/html/logo/downloads/HTML5_Badge.svg | HTML5 logo by W3C, CC BY 3.0. https://www.w3.org/html/logo/ |
| `css3.svg` | https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg | Conventional CSS3 shield distributed by Devicon. Not a claim of an official language logo. |
| `javascript.svg` | https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg | Conventional JS community mark distributed by Devicon. Not an ECMAScript certification badge. |

Devicon provenance and license: https://github.com/devicons/devicon, https://github.com/devicons/devicon/blob/master/LICENSE. Brand marks remain the property of their respective owners.

## Backend (`BE`)

All three SVG files are extracted without alteration from the official Firebase brand asset package:

https://firebase.google.com/static/downloads/brand-guidelines/firebase-brand-assets.zip

| Local file | Original file in the package |
| --- | --- |
| `firebase.svg` | `Firebase Logo/Primary Logomark/SVG/Logomark_Full Color.svg` |
| `cloud-firestore.svg` | `Firebase Product Icons/Product Logomark/SVG/Product_Logomark_Cloud_Firestore_Full_Color.svg` |
| `firebase-authentication.svg` | `Firebase Product Icons/Product Logomark/SVG/Product_Logomark_Authentication_Full_Color.svg` |

Brand source and guidelines: https://firebase.google.com/brand-guidelines.

## Integrations and UI assets (`Integrations`)

| File | Download source | Context |
| --- | --- | --- |
| `whatsapp.svg` | https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg | Existing WhatsApp brand mark mirrored on Wikimedia Commons: https://commons.wikimedia.org/wiki/File:WhatsApp.svg |
| `google-maps.svg` | https://www.gstatic.com/images/branding/productlogos/maps_2025/v1/192px.svg | Google-hosted product logo referenced by https://developers.google.com/maps. The project uses a Maps iframe, not the JavaScript Maps API. |
| `google-fonts.png` | https://www.gstatic.com/images/branding/product/2x/google_fonts_96dp.png | Google-hosted product image referenced by https://fonts.google.com. |
| `font-awesome.svg` | https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/svgs/brands/font-awesome.svg | Official Font Awesome brand glyph. This logo source is separate from the project's actual Font Awesome runtime version, 6.4.0. |

Font Awesome icon license: https://fontawesome.com/license/free (CC BY 4.0 for SVG icons).

## Implementation facts

- Public website: `D:/PROJECT WEB BALI ADVENTURE/index.html`, `script.js`, `style.css`.
- Admin dashboard: `secret.html`, `secret.js`, `secret.css`.
- Firestore holds `services`, `promos`, and `moments`; uploaded images are compressed in the browser and stored as Base64 strings in Firestore documents.
- Firebase Authentication handles admin email/password login.
- WhatsApp enquiries use a `wa.me` link with a pre-filled message, not the WhatsApp Business API.
- CSS transitions/keyframes, IntersectionObserver, and requestAnimationFrame provide animation; no GSAP dependency was found.
- Vercel configuration and Node.js maintenance scripts exist, but they are not presented as verified runtime hosting or a custom server backend.
- No React, Next.js, Tailwind, Bootstrap, or independently measured Lighthouse score is claimed.

To refresh downloaded assets, run `tools/download-bali-stack-logos.ps1` from the portfolio workspace. The downloaded marks are displayed only to describe the technology used in this portfolio project.
