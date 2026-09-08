/* ============================================================
   NO STAND-IN FACE
   ------------------------------------------------------------
   The liveness screens used to fall back to a photograph of a
   real, identifiable person — shown as the customer's own camera
   feed and their own captured video. Anyone shown this demo saw
   a stranger's face presented as theirs, and the person in the
   photograph agreed to none of it.

   So the fallback is drawn, not photographed, and it is inline
   rather than a file: there is no image here to leak into the
   next build. It is only ever reached when there is no camera to
   open; with one, these screens show the live feed and then the
   video this journey actually recorded.
   ============================================================ */

const svg = (body, w, h) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">${body}</svg>`,
  )}`;

/** Head and shoulders, for wherever a camera frame would have been. */
export const FACE_PLACEHOLDER = svg(
  '<rect width="320" height="440" fill="#E8EDF5"/>' +
    '<circle cx="160" cy="158" r="54" fill="#BAC7DA"/>' +
    '<path d="M58 440c0-62 46-108 102-108s102 46 102 108z" fill="#BAC7DA"/>',
  320,
  440,
);

/**
 * The backdrop behind the location dialog.
 *
 * This used to be a SCREENSHOT of the liveness screen — dialog and blurred person
 * baked into the picture — with the app's own dialog drawn on top of it. A soft field
 * says the same thing about a modal being modal, without photographing anybody.
 */
export const SCREEN_BACKDROP = svg(
  '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#DCE3EE"/><stop offset="0.55" stop-color="#C6D0E0"/>' +
    '<stop offset="1" stop-color="#AFBCD0"/></linearGradient></defs>' +
    '<rect width="430" height="810" fill="url(#g)"/>' +
    '<circle cx="215" cy="250" r="150" fill="#FFFFFF" opacity="0.16"/>' +
    '<circle cx="70" cy="640" r="190" fill="#FFFFFF" opacity="0.10"/>',
  430,
  810,
);
