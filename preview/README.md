# Standalone preview

`pcg-loan-topup-preview.html` opens directly in a browser — no install, no dev
server. It is the full app: Demo, Frames and Canvas views all work.

All 18 assets are inlined as data URIs and are the **unquantized originals**,
byte-identical to `../src/assets/figma/`, so this file is safe to pixel-diff
against the Figma exports.

One difference from the dev project: fonts load from Google Fonts, so first open
needs internet. Inlining them locally costs ~8 MB, almost all of it the Material
Symbols variable font. The dev project bundles fonts via `@fontsource` and runs
fully offline.

Regenerate:

```bash
npm install vite-plugin-singlefile
# add viteSingleFile() to vite.config.js, set assetsInlineLimit high,
# swap the @fontsource/material-symbols @imports in base.css for CDN <link>s
npm run build
```
