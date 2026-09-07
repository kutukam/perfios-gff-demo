import { TopSection, Bottom } from "../components/index.jsx";
import {
  NSDL_AADHAAR,
  NSDL_AADHAAR_FILLED,
  NSDL_OTP,
  NSDL_OTP_FILLED,
  MARK_SUCCESS,
} from "../assets/figmaAssets.js";
import { nsdlChrome as N } from "../data/journey.js";

const PAGES = {
  aadhaar: NSDL_AADHAAR,
  aadhaarFilled: NSDL_AADHAAR_FILLED,
  otp: NSDL_OTP,
  otpFilled: NSDL_OTP_FILLED,
};

/* Shared cream page background + the two Figma text layers that sit
   outside the embedded raster. */
function NsdlFrame({ children, height = 932 }) {
  return (
    <div className="screen" style={{ height, background: N.pageBg }}>
      {children}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 769,
          width: 430,
          textAlign: "center",
          fontSize: 12,
          lineHeight: "16px",
          color: "var(--gray-900)",
        }}
      >
        {N.copyright}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 849,
          width: 430,
          background: "#2f7bbf",
          color: "var(--white-000)",
          textAlign: "center",
          fontSize: 11,
          lineHeight: "20px",
        }}
      >
        {N.warning}
      </div>
      <TopSection />
      <Bottom perfios={false} absolute />
    </div>
  );
}

/* ============================================================
   nsdl esign 61-64   6031:16869 / 16894 / 16921 / 16946
   ------------------------------------------------------------
   The NSDL page itself is a raster in the design ("NSDL-1 1",
   390x583 at (20,154)), so it is rendered as the exported image.
   ============================================================ */
export function NsdlEsign({
  page = "aadhaar",
  /* Demo view: the value the visitor typed (or tapped in) for the
     VID/Aadhaar or OTP box. Frames and Canvas pass nothing and keep
     rendering the pre-filled rasters. */
  value,
  onChange,
  onFill,
  onAction,
  hint,
}) {
  const live = Boolean(onChange);
  /* Live, the value is ours to draw, so the empty page is the backdrop
     even once the box holds something. */
  const src = live ? PAGES[page === "otp" ? "otp" : "aadhaar"] : PAGES[page];
  return (
    <NsdlFrame height={page === "aadhaar" ? 933 : 932}>
      <img
        src={src}
        alt="NSDL Electronic Signature Service"
        style={{ position: "absolute", left: 20, top: 154, width: 390, height: 583 }}
      />

      {/* The page is a raster, so its controls are not real elements —
          both are overlaid, measured off the export. The box comes first:
          it has to be filled before the pill does anything, which is how
          the real NSDL page behaves. */}
      {live && (
        <input
          className={`nsdl__input${hint === "field" ? " hint" : ""}`}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onClick={(e) => {
            if (!value) {
              onFill?.();
              const el = e.currentTarget;
              requestAnimationFrame(() => el.select());
            }
          }}
          inputMode="numeric"
          maxLength={page === "otp" ? 6 : 16}
          autoComplete="off"
          aria-label={page === "otp" ? "OTP" : "VID/Aadhaar"}
          style={{ ...N.field, position: "absolute" }}
        />
      )}

      {onAction && (
        <div
          className={`is-tappable${hint === "cta" ? " hint" : ""}`}
          onClick={live && !value ? undefined : onAction}
          style={{ ...N.pill, position: "absolute" }}
          role="button"
          tabIndex={0}
          /* the pill is pixels in the export, so this is the only name the
             co-browse page model can see for it */
          aria-label={page === "otp" ? "Verify OTP" : "Send OTP"}
        />
      )}
    </NsdlFrame>
  );
}

/* ============================================================
   nsdl esign 65 / 66   6031:16973 / 6031:16992
   ------------------------------------------------------------
   Two takes on the same success state: 65 uses the Lottie success
   mark, 66 draws a filled circle with a check glyph. Both centre
   a 260x662 block at (85,154).
   ============================================================ */
export function NsdlSuccess({ variant = "lottie", onBack, hint }) {
  return (
    <NsdlFrame>
      <div
        style={{
          position: "absolute",
          left: 85,
          top: 154,
          width: 260,
          height: 662,
        }}
      >
        {variant === "lottie" ? (
          <img
            src={MARK_SUCCESS}
            alt=""
            style={{
              position: "absolute",
              left: 77,
              top: 254,
              width: 106,
              height: 106,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              left: 77,
              top: 261,
              width: 106,
              height: 106,
              borderRadius: "50%",
              background: "#1faa62",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="msr"
              style={{ fontSize: 56, color: "#fff", lineHeight: "56px" }}
            >
              check
            </span>
          </div>
        )}

        <p
          style={{
            position: "absolute",
            top: 442,
            width: 260,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 20,
            lineHeight: "32px",
            color: "var(--gray-900)",
          }}
        >
          {N.success}
        </p>

        <div
          className={`${hint === "cta" ? "hint " : ""}${
            onBack ? "is-tappable" : ""
          }`}
          onClick={onBack}
          role="button"
          tabIndex={0}
          aria-label={N.goBack}
          style={{
            position: "absolute",
            left: 92,
            top: 522,
            width: 76,
            height: 30,
            borderRadius: 4,
            background: "#1faa62",
            color: "#fff",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {N.goBack}
        </div>
      </div>
    </NsdlFrame>
  );
}
