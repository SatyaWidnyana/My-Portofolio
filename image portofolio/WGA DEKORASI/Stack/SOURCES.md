# WGA Dekorasi Tech-Stack assets

Downloaded on 14 October 2026. These marks identify technologies found in the
source audit at [WGA_DEKORASI_AUDIT.md](../../../docs/WGA_DEKORASI_AUDIT.md).
Brand assets retain their original geometry and colors. They describe the
project's technology and do not imply endorsement by any vendor.

## Frontend (`FE`)

| File | Source | Attribution |
| --- | --- | --- |
| `html5.svg` | [W3C HTML5 logo](https://www.w3.org/html/logo/downloads/HTML5_Badge.svg) | W3C, CC BY 3.0. [Logo information](https://www.w3.org/html/logo/). |
| `css3.svg` | [Devicon CSS3](https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg) | Community CSS3 mark distributed by Devicon. |
| `javascript.svg` | [Devicon JavaScript](https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg) | Community JS mark distributed by Devicon. |

These three files are copied from the existing Bali Adventure assets into WGA's
own folder. [Devicon repository and license](https://github.com/devicons/devicon).

## Backend and data (`BE`)

| File | Source | Context |
| --- | --- | --- |
| `nodejs.svg` | [Official Node.js green JS icon](https://nodejs.org/static/logos/jsIconGreen.svg) | Linked from [Node.js branding](https://nodejs.org/en/about/branding). |
| `vercel.svg` | [Official Vercel symbol](https://vercel.com/vc-ap-b3331f/_next/static/immutable/media/logo-vercel-light.1xgi91gcqswpt.svg) | Referenced by [Vercel brand guidelines](https://vercel.com/geist/brands). Vercel and its marks belong to Vercel Inc. |
| `supabase.svg` | [Supabase official repository](https://raw.githubusercontent.com/supabase/supabase/master/apps/studio/public/supabase-logo.svg) | The same brand mark represents Database and Storage. [Supabase branding](https://supabase.com/brand-assets). |

## Integrations (`Integrations`)

| File | Source | Context |
| --- | --- | --- |
| `cloudflare.png` | [Official Cloudflare logo kit](https://cf-assets.www.cloudflare.com/dzlvafdwdttg/2Twekn3xyYyd94qDYAl0ed/9ab649caa40958f195166e0d9f5d9a04/Logos.zip?download=true) | Unchanged `CF-Logo 1.png` from the [Cloudflare press kit](https://www.cloudflare.com/press/press-kit/). The company logo represents its Turnstile integration. |
| `whatsapp.svg` | [Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg) | WhatsApp brand mark, copied from the existing Bali asset. [File attribution](https://commons.wikimedia.org/wiki/File:WhatsApp.svg). |
| `google-maps.svg` | [Google-hosted product logo](https://www.gstatic.com/images/branding/productlogos/maps_2025/v1/192px.svg) | Copied from the existing Bali asset. WGA uses an embedded map. |
| `google-fonts.png` | [Google-hosted product image](https://www.gstatic.com/images/branding/product/2x/google_fonts_96dp.png) | Copied from the existing Bali asset. |

## Media and testing (`Tools`)

| File | Source | Context |
| --- | --- | --- |
| `sharp.svg` | [Official Sharp logo](https://sharp.pixelplumbing.com/sharp-logo.svg) | CC0 dedication embedded in the SVG. [Sharp website](https://sharp.pixelplumbing.com/). |
| `pglite.svg` | [Official PGlite icon](https://pglite.dev/img/brand/icon-light.svg) | Linked from [PGlite](https://pglite.dev/). Used for local tests, not production storage. |

The monochrome Vercel logo, Cloudflare wordmark, and PGlite icon have a small
white presentation surface so they remain legible in both portfolio themes.
Their image files are unchanged.

To refresh the assets, run `tools/download-wga-stack-logos.ps1` from the portfolio
workspace. The script fetches only the public vendor URLs listed above and
copies shared logos from Bali's existing asset folder. It does not read the WGA
source project or its configuration.
