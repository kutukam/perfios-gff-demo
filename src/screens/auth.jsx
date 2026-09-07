import {
  TopSection,
  Bottom,
  Button,
  Field,
  Consent,
  Sheet,
  HomeIndicator,
  Icon,
} from "../components/index.jsx";
import { HERO_FAMILY } from "../assets/figmaAssets.js";
import { applicant } from "../data/journey.js";

/* ============================================================
   Number + OTP / Default        6031:16381
   Number + OTP / Filled         6031:16358
   ------------------------------------------------------------
   Hero image sits at (-48, 125.21), 526x406.789, with a
   180.079deg white->gray-050 gradient over it from 46.944% to
   96.823%. Headline is Test Calibre Medium 36/40, -0.25 tracking.
   ============================================================ */
export function NumberOtp({
  filled = false,
  value,
  onChange,
  onFill,
  onNext,
  hint,
}) {
  /* Demo view passes onChange, which swaps the field for a real input.
     Frames and Canvas pass only `filled`, so they render as before. */
  const live = Boolean(onChange);
  const isFilled = filled || Boolean(value);
  return (
    <div className="screen" style={{ height: 932 }}>
      {/* hero + gradient scrim */}
      <div
        style={{
          position: "absolute",
          left: -48,
          top: 125.21,
          width: 526,
          height: 406.789,
        }}
      >
        <img
          src={HERO_FAMILY}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(180.07859295551611deg, rgba(255,255,255,0) 46.944%, rgb(250,250,250) 96.823%)",
          }}
        />
      </div>

      {/* headline block at y=532, 16px top padding inside a 96px frame */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 532,
          width: 430,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "16px 24px 0",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-brand)",
            fontWeight: 500,
            fontSize: 36,
            lineHeight: "40px",
            letterSpacing: "-0.25px",
            color: "var(--brand-navy)",
            width: "100%",
          }}
        >
          Get funds for all your needs with us
        </p>
      </div>

      {/* form: 24px gap stack pinned 80px from the bottom */}
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 80,
          width: 382,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
          }}
        >
          {live ? (
            <Field
              state={value ? "active" : "focus"}
              leadingIcon="phone"
              label={applicant.mobileLabel}
              placeholder="Mobile Number"
              brandPlaceholder
              editable
              value={value}
              onChange={onChange}
              onClick={onFill}
              inputMode="tel"
              hint={hint === "field"}
            />
          ) : filled ? (
            <Field
              state="focus"
              leadingIcon="phone"
              label={applicant.mobileLabel}
              value={applicant.mobile}
            />
          ) : (
            <Field
              state="focus"
              leadingIcon="phone"
              placeholder="Mobile Number"
              brandPlaceholder
              onClick={onFill}
              hint={hint === "field"}
            />
          )}
          <Consent checked={isFilled} />
        </div>
        <Button
          label="Get OTP"
          disabled={!isFilled}
          onClick={onNext}
          hint={hint === "cta"}
        />
      </div>

      <TopSection variant="logo" />
      <Bottom absolute />
    </div>
  );
}

/* ============================================================
   Otp / Default   6031:16404   (366 tall)
   Otp / Filled    6031:16432   (366 tall)
   Aadhaar OTP     6031:16418 / 6031:16446   (390 tall)
   ------------------------------------------------------------
   Rendered as a bottom sheet. The Aadhaar variant has a
   two-line subtitle, which is what makes it 24px taller.
   ============================================================ */
export function OtpSheet({
  filled = false,
  aadhaar = false,
  value,
  onChange,
  onFill,
  onNext,
  hint,
}) {
  const live = Boolean(onChange);
  const isFilled = filled || Boolean(value);
  return (
    <Sheet style={{ height: aadhaar ? 390 : 366 }}>
      <div className="sheet__body">
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div className="sheet__close-row">
              <Icon name="close" className="sheet__close" />
            </div>
            <p className="sheet__title ff-inter">
              {aadhaar ? "Enter Aadhaar OTP" : "Enter OTP"}
            </p>
            <p
              className="sheet__sub ff-inter"
              style={aadhaar ? { height: 48 } : undefined}
            >
              {aadhaar
                ? "You’ll receive an OTP from UIDAI on your registered mobile number"
                : `We’ve sent an OTP to ${applicant.mobile}`}
            </p>
          </div>

          {/* the filled OTP field sits at rest: gray border, no ring */}
          {live ? (
            <Field
              state={value ? "rest" : "active"}
              label={applicant.otpLabel}
              placeholder="Enter OTP"
              editable
              value={value}
              onChange={onChange}
              onClick={onFill}
              inputMode="numeric"
              maxLength={6}
              hint={hint === "field"}
            />
          ) : filled ? (
            <Field label={applicant.otpLabel} value={applicant.otp} />
          ) : (
            <Field
              state="active"
              placeholder="Enter OTP"
              onClick={onFill}
              hint={hint === "field"}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
          }}
        >
          <Button
            label="Submit OTP"
            disabled={!isFilled}
            chevron={false}
            onClick={onNext}
            hint={hint === "cta"}
          />
          <Button
            label="Wait for 30 sec to resend OTP"
            variant="ghost"
            leadingIcon="schedule"
            chevron={false}
          />
        </div>
      </div>
      <HomeIndicator />
    </Sheet>
  );
}
