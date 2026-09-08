import {
  TopSection,
  Bottom,
  Footer,
  Button,
  Field,
  Heading,
  Icon,
} from "../components/index.jsx";
import { AXIS_LOGO, ENACH_RING } from "../assets/figmaAssets.js";
import { deposit, depositFields as D, enach, enachPage as E } from "../data/journey.js";

export function DepositAccount({
  filled = false,
  values,
  onChangeField,
  onFill,
  onNext,
  hint,
}) {
  const live = Boolean(onChangeField);
  const isFilled = filled || Boolean(values?.ifsc);
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <Heading title={deposit.title} sub={deposit.sub} />
        <div className="stack">
          {live ? (
            <>
              <Field
                label={D.ifsc.labelFilled}
                placeholder={D.ifsc.label}
                state={values?.ifsc ? "rest" : "focus"}
                editable
                value={values?.ifsc ?? ""}
                onChange={(v) => onChangeField("ifsc", v.toUpperCase())}
                onClick={onFill}
                maxLength={11}
                hint={hint === "field"}
                trailingSlot={
                  values?.ifsc ? (
                    <img src={AXIS_LOGO} alt="" width="24" height="20" />
                  ) : undefined
                }
              />
              <Field
                label={D.account.label}
                placeholder={D.account.label}
                editable
                value={values?.account ?? ""}
                onChange={(v) => onChangeField("account", v)}
                onClick={onFill}
                inputMode="numeric"
              />
              <Field
                label={D.confirm.label}
                placeholder={D.confirm.label}
                editable
                value={values?.confirm ?? ""}
                onChange={(v) => onChangeField("confirm", v)}
                onClick={onFill}
                inputMode="numeric"
              />
            </>
          ) : filled ? (
            <>
              <Field
                label={D.ifsc.labelFilled}
                value={D.ifsc.value}
                state="rest"
                trailingSlot={<img src={AXIS_LOGO} alt="" width="24" height="20" />}
              />
              <Field label={D.account.label} mask={[14]} />
              <Field label={D.confirm.label} value={D.confirm.value} />
              <div className="info-block">
                <p style={{ fontSize: "var(--text-md)", lineHeight: 1.75, color: "var(--gray-900)" }}>
                  {D.branchName}
                </p>
                <p style={{ fontSize: "var(--text-md)", lineHeight: 1.75, color: "var(--gray-900)" }}>
                  {D.branchAddress}
                </p>
              </div>
            </>
          ) : (
            <>
              <Field
                placeholder={D.ifsc.label}
                state="focus"
                onClick={onFill}
                hint={hint === "field"}
              />
              <Field placeholder={D.account.label} />
              <Field placeholder={D.confirm.label} />
            </>
          )}
        </div>
        <div style={{ borderTop: "1px solid var(--gray-300)", paddingTop: "var(--space-xl)" }}>
          <p style={{ fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--gray-900)" }}>
            {deposit.mandateLabel}
          </p>
          <div className="split" style={{ marginTop: "var(--space-lg)" }}>
            {deposit.modes.map((m, i) => (
              <div
                key={m}
                className={`choice${isFilled && i === 0 ? " choice--selected" : ""}`}
              >
                <div className="choice__inner">
                  <Icon
                    name={isFilled && i === 0 ? "check_circle" : "radio_button_unchecked"}
                    filled={isFilled && i === 0}
                    className={`choice__icon${isFilled && i === 0 ? " choice__icon--on" : ""}`}
                  />
                  <p className="choice__label">{m}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer>
        <div className="footer__action">
          <Button
            label={D.cta}
            disabled={!isFilled}
            onClick={onNext}
            hint={hint === "cta"}
          />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}

function EnachRow({ label, value, chevron, highlight, radios }) {
  return (
    <div className="enach-row">
      <div className="enach-row__label">{label}</div>
      <div className={`enach-row__value${highlight ? " is-hl" : ""}`}>
        {radios ? (
          <span className="row" style={{ gap: 14, flexWrap: "wrap" }}>
            <span className="row" style={{ gap: 4 }}>
              <Icon name="radio_button_checked" style={{ fontSize: 13 }} />
              Net Banking
            </span>
            <span className="row" style={{ gap: 4 }}>
              <Icon name="radio_button_unchecked" style={{ fontSize: 13 }} />
              Debit Card
            </span>
          </span>
        ) : (
          <span>{value}</span>
        )}
        {chevron && <Icon name="expand_more" style={{ fontSize: 14 }} />}
      </div>
    </div>
  );
}

function EnachHeader({ children }) {
  return <div className="enach-header">{children}</div>;
}

export function ENach({ onSubmit, hint }) {
  return (
    <div className="screen screen--white">
      <div className="enach__bar">
        <span />
        <span style={{ fontSize: "var(--text-xs)", color: "var(--gray-700)", textDecoration: "underline" }}>
          Powered by <b style={{ color: "var(--primary)" }}>Digio</b>
        </span>
        <Icon name="close" style={{ fontSize: 20, color: "var(--gray-800)" }} />
      </div>
      <div className="enach">
        <p style={{ fontSize: 17, lineHeight: 1.4, textAlign: "center" }}>
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>{E.titleLead}</span>
          <span style={{ fontWeight: 600, color: "var(--gray-900)" }}>{E.titleRest}</span>{" "}
          <Icon name="check_box" filled style={{ fontSize: 16, color: "var(--primary)", verticalAlign: -3 }} />
        </p>
        <p style={{ marginTop: "var(--space-md)", fontSize: "var(--text-xs)", lineHeight: 1.35, color: "var(--gray-700)", textAlign: "center" }}>
          {E.authA}
          <b style={{ color: "var(--primary)" }}>{E.authOrg}</b>
          {E.authB}
        </p>
        <p style={{ marginTop: "var(--space-md)", fontSize: "var(--text-xs)", lineHeight: 1.35, color: "var(--gray-700)", textAlign: "center" }}>
          {E.charges}
        </p>
        <div className="enach-table">
          <EnachHeader>{E.mandateHeader}</EnachHeader>
          {enach.mandate.map((r) => (
            <EnachRow key={r.label} {...r} />
          ))}
          <EnachHeader>{E.customerHeader}</EnachHeader>
          {enach.customer.map((r, i) => (
            <EnachRow key={r.label + i} {...r} highlight={i === 3} />
          ))}
          <EnachRow label="Mode of mandate" radios />
        </div>
        <div className="row" style={{ gap: "var(--space-md)", paddingTop: "var(--space-lg)", alignItems: "flex-start" }}>
          <Icon name="check_box" filled style={{ fontSize: 16, color: "var(--primary)" }} />
          <p style={{ fontSize: 11, lineHeight: 1.4, color: "var(--gray-700)", textAlign: "center", flex: 1 }}>
            {E.confirmA}
            <b style={{ color: "var(--primary)" }}>{E.confirmOrg}</b>
          </p>
        </div>
        <div className="row" style={{ gap: "var(--space-md)", justifyContent: "center", paddingTop: "var(--space-xl)" }}>
          <button
            type="button"
            style={{
              background: "var(--gray-500)",
              color: "#fff",
              fontSize: "var(--text-xs)",
              padding: "5px 16px",
              borderRadius: 4,
            }}
          >
            {E.cancel}
          </button>
          <button
            type="button"
            className={`${hint === "cta" ? "hint " : ""}${onSubmit ? "is-tappable" : ""}`}
            onClick={onSubmit}
            id="enach-submit"
            aria-label="Submit mandate"
            style={{
              background: "var(--primary)",
              color: "#fff",
              fontSize: "var(--text-xs)",
              padding: "5px 16px",
              borderRadius: 4,
            }}
          >
            {E.submit}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ENachLoading() {
  return (
    <div className="screen screen--white">
      <div className="enach__bar">
        <span />
        <span style={{ fontSize: "var(--text-xs)", color: "var(--gray-700)" }}>
          Powered by <b style={{ color: "var(--primary)" }}>Digio</b>
        </span>
        <Icon name="close" style={{ fontSize: 20, color: "var(--gray-800)" }} />
      </div>
      <img src={ENACH_RING} alt={enach.redirect} className="enach__ring" />
    </div>
  );
}
