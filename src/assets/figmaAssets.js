/* ============================================================
   Asset registry — real assets, extracted from the Figma export
   and vendored into src/assets/figma/ at 1x (frame-exact).

   Nothing here points at a remote URL any more, so nothing
   expires. Sizes in the comments are the true pixel dimensions
   of each file; where that differs from the Figma slot, the
   screen centres the asset in the slot.
   ============================================================ */

import acmeLogo from "./figma/acme-logo.png";
import perfiosLogo from "./figma/perfios-logo.png";
import heroFamily from "./figma/hero-family.png";
import offerIllustration from "./figma/offer-illustration.png";
import markRupee from "./figma/mark-rupee.png";
import markSuccess from "./figma/mark-success.png";
import axisLogo from "./figma/axis-logo.png";
import iosKeyboard from "./figma/ios-keyboard.png";
import msgAvatar from "./figma/msg-avatar.png";
import notifAppIcon from "./figma/notif-app-icon.png";
import livenessCamera from "./figma/liveness-camera.png";
import livenessCapture from "./figma/liveness-capture.png";
import livenessLocationBlur from "./figma/liveness-location-blur.png";
import enachRing from "./figma/lottie-enach-loader.png";
import nsdlAadhaar from "./figma/nsdl-page-aadhaar.png";
import nsdlAadhaarFilled from "./figma/nsdl-page-aadhaar-filled.png";
import nsdlOtp from "./figma/nsdl-page-otp.png";
import nsdlOtpFilled from "./figma/nsdl-page-otp-filled.png";

/* Chrome */
export const ACME_LOGO = acmeLogo;            /* 96x21, slot 96x24 contain */
export const PERFIOS_LOGO = perfiosLogo;      /* 51x21, slot 58.483x24     */

/* Landing hero. Figma places the image at x=-48 w=526; only 0..430 is
   ever visible, which is exactly what this file contains. */
export const HERO_FAMILY = heroFamily;        /* 430x410 */

/* Offer illustration — 6031:15458, slot 382x232 */
export const OFFER_ILLUSTRATION = offerIllustration; /* 360x232, centred */

/* Nodes named "lottiefiles.com/78373-payment-processing" are 390x390
   placeholder frames. What actually renders is this rupee mark, centred
   at (189,429). Same mark heads the in-process outcome screen. */
export const MARK_RUPEE = markRupee;          /* 52x52  */
export const MARK_SUCCESS = markSuccess;      /* 106x106 */

/* Deposit account — bank mark in the IFSC field's trailing slot */
export const AXIS_LOGO = axisLogo;            /* 24x20, slot 24x24 */

/* Active Liveness */
export const LIVENESS_CAMERA = livenessCamera;             /* 430x569 */
export const LIVENESS_CAPTURE = livenessCapture;           /* 320x440 */
export const LIVENESS_LOCATION_BLUR = livenessLocationBlur;/* 430x810 */

/* E-Nach redirect ring. The Lottie placeholder sits *under* a separate
   text layer in Figma, so the export has the copy baked in — this tile
   is the whole visual and the screen does not redraw the text on top. */
export const ENACH_RING = enachRing;          /* 382x382 */

/* NSDL e-sign — the design embeds the page as a raster ("NSDL-1 1") */
export const NSDL_AADHAAR = nsdlAadhaar;              /* 390x583 */
export const NSDL_AADHAAR_FILLED = nsdlAadhaarFilled;
export const NSDL_OTP = nsdlOtp;
export const NSDL_OTP_FILLED = nsdlOtpFilled;

/* iOS message mockup */
export const IOS_KEYBOARD = iosKeyboard;      /* 430x291 */
export const MSG_AVATAR = msgAvatar;          /* 40x40   */
export const NOTIF_APP_ICON = notifAppIcon;   /* 38x38   */
