# Nashville Enclosures — website build

WordPress site on WP Engine (`nashvilleenclo.wpenginepowered.com`), Theratio theme + Elementor / Elementor Pro.
This repo holds the build scripts, custom CSS and optimized photography used to complete the site content
from the client's *Nash Enclosures website Page Layouts.docx* and photo folders.

## What was done

**Content (all copy from the client doc)**
- Home, About, Our Process (new, `/about/our-process/`), Products catalog, 9 product pages, Projects,
  Videos & Resources, Warranty & Service, Contact.
- Product pages: Louvered Roofs, Retractable Screens, Cantilever Roof Systems, 3 & 4 Season Rooms,
  Sliding & Motorized Glass Enclosures, Infrared Heating, Screen Rooms (new), Architectural Metal,
  Commercial Outdoor Spaces (new).
- Renamed slugs: `cantilever-structures → cantilever-roof-systems`, `3-season-rooms → 3-4-season-rooms`,
  `outdoor-glazing → glass-enclosures`, `cladding → architectural-metal`.
- Patio Covers (not in the client doc) set to **Draft** — nothing deleted.
- Removed placeholder content: demo testimonials ("Pablo Gusterio"), copied Suncoast FAQ/spec copy,
  15/10/5-year warranty claims (the doc says warranties vary by product), 22 duplicate placeholder videos.

**Photos**
- 162 photos selected from ~930 originals (later QA: 21 cropped, 11 removed — see Verified), resized to ≤2000px, sRGB progressive JPEG, metadata stripped,
  ≤450 KB each (≈50 MB total), SEO file names (`nashville-louvered-roof-01.jpg`) and descriptive alt text.
- Cards use the 1024px “large” size; galleries use 768px thumbnails with lightbox to the full image.
- Not used: 4 commercial photos showing other businesses’ signage (Cactus Club, First Watch).

**Fixes**
- Sticky header rewritten (`scripts/sticky-header.html` + `css/custom.css`): no layout jump, compact state,
  respects the WP admin bar, no flicker; tablet (768–1024px) header is now sticky too.
- Theme page-title banner switched off on pages that now have their own hero (`pheader_switch = 0`).
- Footer: wrong `mailto:theratio_interior@mail.com`, product links to the theme demo site, copyright link.
- Header/footer/contact social icons hidden (they had no URLs) — re-enable once real profile URLs exist.
- Forms: product lists updated, warranty photo upload made optional, clearer email subjects.
- Menus (desktop + mobile) restructured; Patio Covers menu items repointed to the new pages.

## Verified (headless Chrome, logged-out visitor view)
Automated audit of all 18 pages + the blog article at 1440px, 820px and 390px (plus 360px and 1100px for layout):
- Every page returns 200 and has exactly one H1; no broken internal links; no leftover demo/placeholder text.
- No broken or missing images, every image has alt text, no images visibly upscaled.
- No horizontal overflow, no clipped/overlapping buttons, no content touching the window edges (1100px).
- Sticky header: pins when the nav reaches the top with no content jump; tablet and phone headers stick.
- Mobile/tablet menu: every link, submenu, call and email item is tappable; closing keeps scroll position.
  (Bug found on a real phone: Elementor's sticky "spacer" copy of the mobile header carried a second
  dark overlay that the theme force-showed above the menu. Fixed in custom.css; the close arrow's
  `href="#"` jump is cancelled in scripts/sticky-header.html.)
- Pages open cleanly in the Elementor editor; gallery filters, lightboxes, YouTube embeds, Google Map and
  the mobile menu all work.
- First-visit image payload (whole page scrolled): Home ~1.8 MB, Louvered Roofs ~2.6 MB, Projects ~0.7 MB
  initial (gallery lazy-loads). Only full-width heroes exceed 300 KB.

Fixed during the audit: blog post demo filler + demo category/tags, blog/post H1 banners, author box,
Screen Rooms/Commercial pages stuck in the sidebar layout, hero buttons clipped on phones, tablet layouts
(stacking, padding, footer), laptop-width edge padding, ragged galleries (uniform 4:3), Canadian street
banners in two cantilever photos (cropped), 43 placeholder Portfolio posts + Blog Grid duplicate (drafted).

Photo QA (every one of the 162 photos reviewed): 21 photos replaced by crops (`*-c.jpg`) that remove non-US
flags/landmarks, third-party signage (restaurant names, hotel logo, storefronts), close faces, shipping wrap
and site clutter; 11 photos removed from the site (Vancouver street/skyline, Canadian flag, restaurant logo on
glass, an AI-looking render, unfinished-site shots). `B.SWAP` / `B.DROP` in `scripts/ne-build.js` enforce this,
and the builder throws if a dropped photo is referenced.

## Recommendation (not changed)
The theme's Royal Preloader keeps the page hidden ~1.5–2.4 s even when it has already loaded
(longer on first visit). Turning it off (Customizer › theme options) would noticeably improve
perceived speed and LCP.

## Cache
After Customizer CSS or header/footer template changes, clear WP Engine's cache (WP Engine › Caching ›
Clear all caches) and confirm `x-cache: MISS` or the new markup with `curl`; the button doesn't always
register on the first click.

## Backups
Before any change, every touched page/template was saved as an Elementor template:
**Templates › Saved Templates › “BACKUP 2026-10-06 – …”** (18 templates). Insert one into a page to restore it.

## Scripts (run in a logged-in browser tab on the site)
| File | Purpose |
|---|---|
| `scripts/ne-lib.js` | Elementor ajax (read/save documents), REST, media upload helpers |
| `scripts/ne-build.js` | Section builders cloned from the existing design prototypes |
| `scripts/ne-pages*.js` | Page content (copy + photo keys) |
| `scripts/ne-run.js` | Create/rename pages and publish |
| `scripts/ne-globals.js` | Header, mobile header, footer, side panel, menus |
| `scripts/sticky-header.html` | Sticky header script (lives in the header template's HTML widget) |
| `css/custom.css` | Appearance › Customize › Additional CSS |
| `docs/media-map.json` | Photo key → WordPress attachment ID |

## Open items for the client
- Real social media profile URLs (icons are hidden until then).
- Their own YouTube videos for the Videos & Resources page (two Suncoast product videos are used now).
- Photos of cantilever projects (the Cantilever folder was empty) and higher-resolution heater photos.
- Form “From” address uses the staging domain; switch to `@nashvilleenclosures.com` at launch.
