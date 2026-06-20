# Bingwa Flash Download Page

This repository publishes the direct installer page for `download.bingwaflash.co.ke`.

The page intentionally uses `noindex` meta tags instead of a blocking `robots.txt` rule. Search crawlers must be able to fetch the page before they can remove it from search results.

Cloudflare DNS should contain this record:

```text
Type: CNAME
Name: download
Target: officialmrlyco.github.io
Proxy status: DNS only
```

## Tutorials

Tutorial cards are rendered from the `tutorialVideos` list near the bottom of `index.html`.

To add an unlisted YouTube guide, edit one item or add another object:

```js
{
  title: "Your guide title",
  category: "Setup",
  summary: "Short public summary for agents.",
  youtubeUrl: "https://youtu.be/VIDEO_ID"
}
```

Normal YouTube, `youtu.be`, Shorts, and `/embed/` links are supported. Leave `youtubeUrl` empty when a guide is planned but not published.
