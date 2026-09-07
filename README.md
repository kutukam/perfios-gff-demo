# PA/PQ &lt;&gt; Personal Loan Top Up — reimplementation

Reimplementation of Figma section `6031:15453` from *Internal - Universal PCG
Journeys* (`56kjTPayHR1LvNxvlGFoDU`). **46 frames, all real assets, no
placeholders.**

```bash
npm install
npm run dev
```

Three views:

- **Demo** (default) — the interactive walkthrough. Tap the pulsing control and
  the details fill in, exactly like the Figma prototype: tap the mobile field
  and it populates, tap Get OTP and the sheet slides up, and so on through to
  disbursal. Loader screens advance on their own. 41 steps.
- **Frames** — steps through all 45 frames one at a time, static.
- **Canvas** — every frame side by side with its node id underneath. This is
  the view to diff against Figma.

## Fidelity approach

Every frame in the source is 430px wide. Screens are composed as absolutely
positioned boxes inside a 430px container, so Figma's x/y/w/h map 1:1 — no
responsive reinterpretation, no rounding.

- **Tokens** (`src/styles/tokens.css`) are transcribed from the file's own
  variables and styles: `primary #0050AA`, `perfios-blue`, `card-bg #E9F1FD`,
  `card-storke #84B9F9` (that typo is the variable's real name), the gray
  050–900 ramp, blue 050–800, green 600/800, `asphalt-900 #263238`.
- **Type** — Inter (400/500/600/700) and Roboto ship as local `@fontsource`
  packages, Material Symbols Rounded via `material-symbols`. No CDN, and icon
  weights match the file (Light 300 on buttons and checkboxes, Regular 400
  elsewhere, FILL 1 on the success check). The OpenType features the file
  enables on Inter (`ss02`, `cv01`, `lnum`, `tnum` and the rest) are applied via
  `.ff-inter` / `.ff-num`, so glyphs and digits render identically.
- **Copy** (`src/data/journey.js`) is verbatim, typos preserved: "Allow us to
  Access yur Location ?", "Please don not press...", "can very in case of pre EMI
  charges", "late Payment Fee", "Deposite Account", "Please Wait white you are
  being redirected...".

## Interactive demo

`src/demo/flow.jsx` holds the whole walkthrough as one ordered array. Each entry
is `{ id, label, render, wait? }` — `render(go, jump)` returns the screen with
its callbacks bound, `wait` marks a step that advances itself after n ms (the
loaders). Extending it means inserting an entry or pointing a callback at a
different index; three branches already work that way (skip the address form,
skip the charges sheet, retake the video).

The screens stay presentational. Every one takes optional callbacks
(`onFill`, `onNext`, `onToggle`, `onSelect`, `onInfo`, `onAllow`, `onStart`,
`onStop`, `onConfirm`, `onSubmit`, `onAction`, `onBack`) plus a `hint` string
naming which control should pulse. Pass nothing and you get the static frame
back — which is exactly what Canvas and Frames render, so there is one
implementation of each screen, not two.

The `.hint` ring is drawn with `::after` and `inset: -5px`, so it never affects
layout: a hinted screen measures identically to its Figma frame.

One hotspot is unavoidable. The NSDL e-sign page is a raster in the design, so
its Send OTP / Verify OTP pill isn't a real element — there's a transparent
click target over it at (55,645) 74×29, measured off the export.

## Assets

All 18 are real, cropped from the supplied 1x frame exports and vendored into
`src/assets/figma/`. Nothing hotlinks to Figma; nothing expires.

`acme-logo` · `perfios-logo` · `hero-family` · `offer-illustration` ·
`mark-rupee` · `mark-success` · `axis-logo` · `liveness-camera` ·
`liveness-capture` · `liveness-location-blur` · `lottie-enach-loader` ·
`nsdl-page-{aadhaar,aadhaar-filled,otp,otp-filled}` · `ios-keyboard` ·
`msg-avatar` · `notif-app-icon`

`src/assets/figmaAssets.js` is the only place they're referenced, with true
pixel sizes noted against each Figma slot. `extract-assets.py` at the repo root
is the script that produced them, so the crop is reproducible if the frames get
re-exported.

Two things the exports revealed:

- **The Lottie nodes are placeholders.** Layers named
  `lottiefiles.com/78373-payment-processing` are empty 390×390 frames. What
  actually renders on every loader screen is the 52×52 ₹ mark at (189,429) with
  the caption below. Nothing animates.
- **The E-Nach ring has its copy baked in.** That Lottie node sits *under* a
  separate text layer, so the exported tile already contains "Please Wait white
  you are being redirected...". The screen renders the tile and does not draw
  the text again.

## Custom font

The brand headline and the landing field placeholder use **Test Calibre**, a
licensed face that isn't redistributable and isn't on npm. `--font-brand` falls
back to Inter. Drop the woff2 into `src/assets/fonts/`, add an `@font-face`, and
that one variable picks it up everywhere.

## Provenance: the export is the sibling section

The frame export supplied is of the adjacent journey — the ₹7,00,000 flow with
Customise Offer, employment details and bank-statement sharing — not
`6031:15453`. Same components, different numbers. Its offer screen reads "You
have an approved personal loan offer of ₹7,00,000 / ₹14,508 / Complete Loan
Application"; this section's node says ₹2,00,000 / ₹4,145 / Next.

So:

- Values pulled from `6031:15453` nodes directly are authoritative and used.
- Values that were only readable from the export are tagged `FROM-EXPORT` in
  `journey.js`. These are the ones to check: the outcome table (₹4,96,500, Acme
  Bank Ltd, Axis Bank, 9211209837, 1 / 03 / 2024, ACM-123457890), the SMS body
  amount, and the filled OTP digits (756283). Labels and structure are correct
  either way — only the amounts are in question.

Still unresolved: the six rows revealed on **Offer Screen / new (selected)**
(`6031:17039`, nodes 6031:17058–17088). Their text layers are unnamed and that
frame isn't in the export, so they render with `—`. Row labels there are my
reading of the layout, not transcribed copy.

## Not verified

Playwright's Chromium download is blocked by this environment's network
allowlist, so I could not screenshot-diff my render against your PNGs. Compare
Canvas mode against the exports by eye; since the exports are frame-exact, drift
will be obvious.

## Frames (46)

Landing ×2 · OTP sheet ×2 · PAN ×2 · Aadhaar ×2 · Aadhaar OTP ×2 · Details ×3 ·
Loader · Offer · Offer top-up ×2 · Existing loan sheet · Location Access ·
Video Liveness ×4 · loaders ×3 · Key Fact Statement · e-Mandate loader ·
Deposit Account ×2 · E-Nach ×2 · enach redirect · Terms · NSDL redirect ·
NSDL e-sign ×6 · Congratulations ×2 · Notification · SMS thread · Tooltip

## Layout

```
src/
  assets/figma/       18 extracted assets
  assets/figmaAssets.js
  components/index.jsx  Top Section, Bottom, Footer, Button, Field, Consent,
                        table primitives, Sheet, Choice, Loader
  data/journey.js       every string and number, with provenance tags
  screens/              auth, kyc, details, offer, review, liveness,
                        mandate, esign, outcome
  styles/               tokens, base, components, app
  App.jsx               frame registry + canvas/flow shell
extract-assets.py       reproducible asset crop
```
