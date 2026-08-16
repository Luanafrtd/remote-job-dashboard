# Branding Assets

Social preview images for this project, built from the real logo mark, brand
colors, and a live dashboard screenshot rather than generic placeholder art.

| File                        | Dimensions | Used for                                                                                                                                                              |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `og-image.png`              | 1200×630   | Open Graph preview (Facebook, Slack, iMessage, generic link unfurling)                                                                                                |
| `linkedin-image.png`        | 1200×627   | LinkedIn share preview                                                                                                                                                |
| `github-social-preview.png` | 1280×640   | GitHub repository social preview — upload manually at **Settings → General → Social preview** on the repo page (GitHub does not support setting this via file or API) |

The live site's actual `<meta property="og:image">` is generated dynamically
at build time by `src/app/opengraph-image.tsx` using `next/og`; these static
files are for platforms — GitHub chief among them — that require an uploaded
image rather than a URL.

Regenerate by editing the HTML/CSS template used to render these (dark
gradient background, `RemoteJob` logo mark, and a framed crop of
`docs/screenshots/dashboard.png`) and re-exporting at the dimensions above.
