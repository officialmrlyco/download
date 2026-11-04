# Bingwa Flash Download Page

This repository publishes the direct installer page for `download.bingwaflash.co.ke`.

Current release: Bingwa Flash `v1.4.3` (Build `43`). The installer buttons point to the mutable GitHub release asset tagged `v43` with a build-specific cache key. Its verified size is `17,791,870` bytes and SHA-256 is `232636d7b9c10b93092e325e2101da8fe29e77eeb0abd5dc1bf26cb3973b7b8f`. Release immutability is intentionally disabled so the same asset name and URL can be replaced after a corrected build is verified.

The page intentionally uses `noindex` meta tags instead of a blocking `robots.txt` rule. Search crawlers must be able to fetch the page before they can remove it from search results.

The installer and tutorial library share `styles.css` and `theme.js`. The shared theme key is `bf-theme`, so a visitor's light/dark choice follows them across both pages. The visual system uses flat surfaces, thin borders, yellow release emphasis, and Bingwa green actions so the installer remains clear on phones and desktops.

Cloudflare DNS should contain this record:

```text
Type: CNAME
Name: download
Target: officialmrlyco.github.io
Proxy status: DNS only
```

## Tutorials

Tutorial cards are rendered from the shared list in `tutorials.js`.

- `/index.html` shows only the first three featured tutorial thumbnails.
- `/tutorials/` shows the full searchable tutorial library with auto-generated category filters.
- Cards show thumbnails only. Videos load in a popup when clicked, so the page does not embed every YouTube iframe at once.

To add an unlisted YouTube guide, edit one item or add another object:

```js
{
  title: "Your guide title",
  category: "Setup",
  label: "New",
  duration: "3:45",
  summary: "Short public summary for agents.",
  youtubeUrl: "https://youtu.be/VIDEO_ID",
  thumbnailUrl: "",
  featured: true
}
```

Normal YouTube, `youtu.be`, Shorts, and `/embed/` links are supported. Leave `label` blank when a card should not show `New` or `Latest feature`. Leave `youtubeUrl` empty when a guide is planned but not published.
