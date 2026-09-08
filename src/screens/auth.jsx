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

export function NumberOtp({
  filled = false,
  value,
  onChange,
  onFill,
  onNext,
  hint,
  consented,
  onConsent,
}) {
  const live = Boolean(onChange);
  const isFilled = filled || Boolean(value);
  const agreed = live ? Boolean(consented) : filled;
  return (
    <div className="screen">
      <TopSection variant="logo" />
      <div className="hero">
        <img src={HERO_FAMILY} alt="" />
        <div className="hero__fade" />
      </div>
      <div className="screen__body">
        <p className="auth__headline">Get funds for all your needs with us</p>
        <div className="auth__form stack stack--xl">
          <div className="stack">
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
            <Consent
              checked={agreed}
              onClick={onConsent}
              hint={hint === "consent"}
            />
          </div>
          <Button
            label="Get OTP"
            disabled={!isFilled || !agreed}
            onClick={onNext}
            hint={hint === "cta"}
          />
        </div>
      </div>
      <Bottom absolute />
    </div>
  );
}

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
    <Sheet>
      <div className="sheet__body">
        <div className="stack stack--xl">
          <div className="stack" style={{ gap: 4 }}>
            <div className="sheet__close-row">
              <Icon name="close" className="sheet__close" />
            </div>
            <p className="sheet__title ff-inter">
              {aadhaar ? "Enter Aadhaar OTP" : "Enter OTP"}
            </p>
            <p className="sheet__sub ff-inter">
              {aadhaar
                ? "You’ll receive an OTP from UIDAI on your registered mobile number"
                : `We’ve sent an OTP to ${applicant.mobile}`}
            </p>
          </div>

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

        <div className="stack" style={{ gap: 8 }}>
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
