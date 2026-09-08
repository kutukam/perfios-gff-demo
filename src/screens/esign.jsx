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

function NsdlFrame({ children }) {
  return (
    <div className="screen nsdl">
      <TopSection />
      {children}
      <p className="nsdl__meta">{N.copyright}</p>
      <div className="nsdl__warn">{N.warning}</div>
      <Bottom perfios={false} />
    </div>
  );
}

export function NsdlEsign({
  page = "aadhaar",
  value,
  onChange,
  onFill,
  onAction,
  hint,
}) {
  const live = Boolean(onChange);
  const src = live ? PAGES[page === "otp" ? "otp" : "aadhaar"] : PAGES[page];
  return (
    <NsdlFrame>
      <div className="screen__body" style={{ paddingBottom: 0 }}>
        <div className="nsdl__raster">
          <img src={src} alt="NSDL Electronic Signature Service" />
          {live && (
            <input
              className={`nsdl__input nsdl__field${hint === "field" ? " hint" : ""}`}
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
              onClick={(e) => e.currentTarget.focus()}
              inputMode="numeric"
              maxLength={page === "otp" ? 6 : 16}
              autoComplete="off"
              aria-label={page === "otp" ? "OTP" : "VID/Aadhaar"}
            />
          )}
          {onAction && (
            <button
              type="button"
              className={`nsdl__pill is-tappable${hint === "cta" ? " hint" : ""}`}
              onClick={live && !value ? undefined : onAction}
              id="nsdl-pill"
              aria-label={page === "otp" ? "Verify OTP" : "Send OTP"}
            />
          )}
        </div>
      </div>
    </NsdlFrame>
  );
}

export function NsdlSuccess({ variant = "lottie", onBack, hint }) {
  return (
    <NsdlFrame>
      <div className="nsdl-success">
        {variant === "lottie" ? (
          <img src={MARK_SUCCESS} alt="" className="nsdl-success__mark" />
        ) : (
          <div className="nsdl-success__drawn">
            <span className="msr">check</span>
          </div>
        )}
        <p className="heading__title" style={{ textAlign: "center" }}>
          {N.success}
        </p>
        <button
          type="button"
          className={`nsdl-success__cta${hint === "cta" ? " hint" : ""}${
            onBack ? " is-tappable" : ""
          }`}
          onClick={onBack}
          id="nsdl-go-back"
          aria-label={N.goBack}
        >
          {N.goBack}
        </button>
      </div>
    </NsdlFrame>
  );
}
