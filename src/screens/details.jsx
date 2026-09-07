import { TopSection, Bottom, Footer, Button, Field } from "../components/index.jsx";
import { details } from "../data/journey.js";

/* ============================================================
   Details / PAN AADHAAR                    6031:16558   (932)
   Details / PAN AADHAAR / Address          6031:16775  (1166)
   Details / PAN AADHAAR / Address Filled   6031:16815  (1166)
   ------------------------------------------------------------
   The blue "info from pan" card holds Full Name + Date of Birth
   side by side (two 169px fields) then the Aadhaar address as a
   full-width block. Below it, the toggle; when on, three fields
   plus a City/State pair reveal and the frame grows to 1166.
   ============================================================ */

function InfoCard() {
  return (
    <div
      style={{
        width: 382,
        background: "var(--card-bg)",
        border: "1.6px solid var(--card-stroke)",
        borderRadius: 8,
        padding: "12px 16px 16px",
      }}
    >
      <p
        className="ff-inter"
        style={{
          fontWeight: 700,
          fontSize: 20,
          lineHeight: "32px",
          color: "var(--gray-900)",
        }}
      >
        {details.cardTitle}
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <ReadOut
          label={details.fullNameLabel}
          value={details.fullName}
          width={169}
        />
        <ReadOut label={details.dobLabel} value={details.dob} width={169} />
      </div>

      <div style={{ marginTop: 16 }}>
        <ReadOut
          label={details.addressLabel}
          value={details.address}
          width={342}
          wrap
        />
      </div>
    </div>
  );
}

/* A label/value read-out with no field chrome — this is how the
   "Fields" instances render inside the blue card. */
function ReadOut({ label, value, width, wrap = false }) {
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 2 }}>
      <p className="field__label">{label}</p>
      <p
        className="field__value"
        style={wrap ? { whiteSpace: "normal", lineHeight: "28px" } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function Toggle({ on, onClick, hint }) {
  return (
    <div
      className={`${hint ? "hint " : ""}${onClick ? "is-tappable" : ""}`}
      style={{ display: "flex", gap: 12, alignItems: "center", width: 382 }}
      onClick={onClick}
    >
      <div
        style={{
          width: 40,
          height: 20,
          borderRadius: 100,
          background: on ? "var(--primary)" : "var(--gray-400)",
          display: "flex",
          alignItems: "center",
          justifyContent: on ? "flex-end" : "flex-start",
          padding: 2,
          flex: "none",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "var(--white-000)",
          }}
        />
      </div>
      <p style={{ fontSize: 16, lineHeight: "20px", color: "var(--gray-900)" }}>
        {details.toggle}
      </p>
    </div>
  );
}

export function DetailsScreen({
  address = false,
  filled = false,
  /* Demo view: `values` is keyed by field label, `onChangeField` edits one.
     Frames and Canvas pass neither, so they keep the static filled state. */
  values,
  onChangeField,
  onToggle,
  onFill,
  onNext,
  hint,
}) {
  const live = Boolean(onChangeField);
  const typed = live && details.form.some((f) => values?.[f.label]);
  const isFilled = filled || typed;
  const tall = address;
  return (
    <div className="screen" style={{ height: tall ? 1166 : 932 }}>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 154,
          width: 382,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <InfoCard />
        <div style={{ paddingTop: 16 }}>
          <Toggle on={address} onClick={onToggle} hint={hint === "toggle"} />
        </div>

        {address && (
          <div
            style={{
              paddingTop: 22,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {details.form.map((f) =>
              live ? (
                <Field
                  key={f.label}
                  label={f.label}
                  placeholder={f.label}
                  editable
                  value={values?.[f.label] ?? ""}
                  onChange={(v) => onChangeField(f.label, v)}
                  onClick={onFill}
                  hint={hint === "field" && f === details.form[0]}
                />
              ) : filled ? (
                <Field key={f.label} label={f.label} value={f.value} />
              ) : (
                <Field
                  key={f.label}
                  placeholder={f.label}
                  onClick={onFill}
                  hint={hint === "field" && f === details.form[0]}
                />
              )
            )}

            <div style={{ display: "flex", gap: 24, paddingTop: 4 }}>
              <ReadOut
                label={details.city.label}
                value={isFilled ? details.city.value : details.city.empty}
                width={179}
              />
              <ReadOut
                label={details.state.label}
                value={isFilled ? details.state.value : details.state.empty}
                width={179}
              />
            </div>
          </div>
        )}
      </div>

      <TopSection />
      <Footer>
        <div className="footer__action" style={{ width: 382 }}>
          <Button
            label={address ? details.ctaAddress : details.cta}
            disabled={live && address && !isFilled}
            onClick={onNext}
            hint={hint === "cta"}
          />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}
