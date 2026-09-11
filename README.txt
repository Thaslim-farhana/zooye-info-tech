ZOOYE INFO TECHNOLOGIES — WEBSITE PROJECT FILES
=================================================

HOW TO VIEW THE SITE
---------------------
Unzip this folder, then just double-click index.html (or any other .html
file) to open it in your browser. Everything is linked with relative paths,
so as long as this folder structure stays intact, it works fully offline —
no server or internet connection required (aside from the Google Fonts
CDN link in each page's <head>, which is optional — the site still works
without it, just with a fallback system font).

FOLDER STRUCTURE
-----------------
/index.html                  Homepage
/services.html               Full services catalog (Core / White Label / API)
/about.html                  About Us
/portfolio.html              Portfolio (filterable)
/process.html                Our Process
/faqs.html                   FAQ page (accordion + category filter)
/careers.html                Careers
/contact.html                Contact form
/service-*.html              50 individual service detail pages
                              (linked from services.html)

/css/styles.css              Single shared stylesheet used by every page
                              (colors, layout, components, animations)

/js/site.js                  Shared site-wide behavior used by every page:
                              - scroll-reveal animations
                              - header shadow on scroll
                              - stats count-up
                              Respects prefers-reduced-motion.

/assets/images/logo.png      Zooye logo (transparent PNG)
/assets/images/hero-infinity.png
                              The homepage hero infinity graphic

PAGE-SPECIFIC JAVASCRIPT
-------------------------
A few pages have small inline <script> blocks (in the page itself, right
before the </body> tag) for content that's unique to that page:
  - index.html      — renders the service cards, "Why Zooye" cards,
                       portfolio cards, and infinity-bar marquee
  - services.html   — renders the Core/White Label/API service lists
                       and builds each service's detail-page link
  - portfolio.html  — the category filter buttons
  - faqs.html       — the accordion open/close + category filter

Everything else (about, careers, process, contact, and all 50 service
pages) only loads js/site.js, since their content is static HTML.

CONTENT NOTES
--------------
- Contact details (address, phone, email) are Zooye's real published
  info, pulled from zooyeinfo.com.
- Stats on the homepage (100+, 50+, 98%, 24/7) are placeholders —
  swap in verified numbers before launch.
- Portfolio thumbnails and the 50 service-detail pages use generic/
  template content since real project write-ups and case studies
  weren't available — replace with real work before publishing.
- The Careers page has no fabricated job listings; it's left honest
  and empty pending real openings.

CUSTOMIZING
------------
- Brand colors, fonts, and spacing are all defined as CSS variables
  at the top of css/styles.css (look for the :root block) — change
  them once and they apply site-wide.
- To add a new page: copy an existing page's structure (header, nav,
  footer are consistent across all pages), link css/styles.css and
  js/site.js the same way, and drop in your content.
