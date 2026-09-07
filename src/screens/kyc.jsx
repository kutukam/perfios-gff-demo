import {
  TopSection,
  Bottom,
  Footer,
  Button,
  Field,
  Heading,
} from "../components/index.jsx";
import { applicant } from "../data/journey.js";

/* ============================================================
   Enter PAN / Default   6031:16460
   Enter PAN / Filled    6031:16498
   ------------------------------------------------------------
   Content block at (24, 154), 32px gap between heading and field.
   Filled state adds the blue "Fetched from PAN" card and swaps
   the field's trailing icon to a filled green check_circle.
   ============================================================ */
export function EnterPan({
  filled = false,
  value,
  onChange,
  onFill,
  onNext,
  hint,
}) {
  const live = Boolean(onChange);
  const isFilled = filled || Boolean(value);
  return (
    <div className="screen" style={{ height: 932 }}>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 154,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "flex-start",
        }}
      >
        <Heading
          title="Enter Your PAN"
          sub="Please share your PAN number to continue"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: 382,
          }}
        >
          {live ? (
            <Field
              label={applicant.panLabel}
              placeholder={applicant.panLabel}
              editable
              value={value}
              onChange={(v) => onChange(v.toUpperCase())}
              onClick={onFill}
              maxLength={10}
              trailingIcon={value ? "check_circle" : undefined}
              trailingFilled
              trailingOk
              hint={hint === "field"}
            />
          ) : filled ? (
            <Field
              label={applicant.panLabel}
              value={applicant.pan}
              trailingIcon="check_circle"
              trailingFilled
              trailingOk
            />
          ) : (
            <Field
              placeholder={applicant.panLabel}
              onClick={onFill}
              hint={hint === "field"}
            />
          )}

          {isFilled && (
            <div className="info-card ff-inter">
              <p className="info-card__label">Fetched from PAN</p>
              <p className="info-card__value">{applicant.name}</p>
            </div>
          )}
        </div>
      </div>

      <TopSection />
      <Footer>
        <div className="footer__action">
          <Button
            label="Next"
            disabled={live && !isFilled}
            onClick={onNext}
            hint={hint === "cta"}
          />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}

/* ============================================================
   Enter AADHAAR / Default   6031:16479
   Enter AADHAAR / Filled    6031:16521
   ------------------------------------------------------------
   Filled state masks the first 8 digits as two groups of four
   6px dots, then shows the last four in plain text.
   ============================================================ */
export function EnterAadhaar({
  filled = false,
  value,
  onChange,
  onFill,
  onNext,
  hint,
}) {
  const live = Boolean(onChange);
  const isFilled = filled || Boolean(value);
  return (
    <div className="screen" style={{ height: 932 }}>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 154,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "flex-start",
        }}
      >
        <Heading
          title="Enter Your Aadhaar"
          sub="Please share your Aadhaar number to continue"
        />

        <div style={{ width: 382 }}>
          {live ? (
            <Field
              label="Aadhaar Number *"
              placeholder="Aadhaar Number *"
              editable
              value={value}
              onChange={onChange}
              onClick={onFill}
              inputMode="numeric"
              maxLength={12}
              hint={hint === "field"}
            />
          ) : filled ? (
            <Field
              label="Aadhaar Number *"
              mask={[4, 4]}
              maskTail={applicant.aadhaarTail}
            />
          ) : (
            <Field
              placeholder="Aadhaar Number *"
              onClick={onFill}
              hint={hint === "field"}
            />
          )}
        </div>
      </div>

      <TopSection />
      <Footer>
        <div className="footer__action">
          <Button
            label="Next"
            disabled={live && !isFilled}
            onClick={onNext}
            hint={hint === "cta"}
          />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}
