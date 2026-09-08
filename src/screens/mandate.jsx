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

/* ============================================================
   Deposite Account / Default   6031:16323
   Deposite Account / Pre-Filled 6031:16010
   ------------------------------------------------------------
   Three fields; in the filled state the IFSC carries the Axis
   mark in its trailing slot, the account number is masked with
   14 dots, and a blue branch card appears beneath.
   ============================================================ */
export function DepositAccount({
  filled = false,
  /* Demo view: `values` holds ifsc / account / confirm as typed text. */
  values,
  onChangeField,
  onFill,
  onNext,
  hint,
}) {
  const live = Boolean(onChangeField);
  const isFilled = filled || Boolean(values?.ifsc);
  return (
    <div className="screen" style={{ height: 932 }}>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 154,
          width: 382,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Heading title={deposit.title} sub={deposit.sub} />

        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
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
                    <img src={AXIS_LOGO} alt="" style={{ width: 24, height: 20 }} />
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
                trailingSlot={
                  <img src={AXIS_LOGO} alt="" style={{ width: 24, height: 20 }} />
                }
              />
              <Field label={D.account.label} mask={[14]} />
              <Field label={D.confirm.label} value={D.confirm.value} />
              <div
                style={{
                  width: 382,
                  background: "var(--card-bg)",
                  border: "1.6px solid var(--card-stroke)",
                  borderRadius: 8,
                  padding: "12px 16px",
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: "28px",
                    color: "var(--gray-900)",
                  }}
                >
                  {D.branchName}
                </p>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: "28px",
                    color: "var(--gray-900)",
                  }}
                >
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

        <div
          style={{
            marginTop: 24,
            borderTop: "1px solid var(--gray-300)",
            paddingTop: 24,
          }}
        >
          <p
            style={{
              fontSize: 20,
              lineHeight: "32px",
              color: "var(--gray-900)",
            }}
          >
            {deposit.mandateLabel}
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            {deposit.modes.map((m, i) => (
              <div
                key={m}
                className={`choice${
                  isFilled && i === 0 ? " choice--selected" : ""
                }`}
                style={{ width: 183 }}
              >
                <div className="choice__inner">
                  <Icon
                    name={
                      isFilled && i === 0
                        ? "check_circle"
                        : "radio_button_unchecked"
                    }
                    filled={isFilled && i === 0}
                    className={`choice__icon${
                      isFilled && i === 0 ? " choice__icon--on" : ""
                    }`}
                  />
                  <p className="choice__label">{m}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TopSection />
      <Footer>
        <div className="footer__action" style={{ width: 382 }}>
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

/* ============================================================
   E-Nach   6031:16075
   ------------------------------------------------------------
   A different surface: cams.in/enach on the 66px bare chrome, no
   Acme topbar. Tables have solid blue header bars and blue row
   labels — nothing like the journey tables.
   ============================================================ */
function EnachRow({ label, value, chevron, highlight, radios }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #e3ecf7" }}>
      <div
        style={{
          width: 152,
          padding: "8px 12px",
          fontSize: 13,
          lineHeight: "18px",
          color: "var(--blue-800)",
          background: "#fff",
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          padding: "8px 12px",
          fontSize: 13,
          lineHeight: "18px",
          color: highlight ? "var(--primary)" : "var(--gray-700)",
          fontWeight: highlight ? 600 : 400,
          background: highlight ? "var(--card-bg)" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        {radios ? (
          <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <Icon name="radio_button_checked" style={{ fontSize: 13 }} />
              Net Banking
            </span>
            <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
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
  return (
    <div
      style={{
        background: "var(--primary)",
        color: "var(--white-000)",
        textAlign: "center",
        padding: "6px 0",
        fontSize: 14,
        lineHeight: "20px",
      }}
    >
      {children}
    </div>
  );
}

export function ENach({ onSubmit, hint }) {
  return (
    /* Taller than the 932 the other frames use, because this one's content really is:
       the mandate and customer tables plus the declaration run to 947, so at 932 the
       Cancel/Submit row was clipped by `overflow: hidden` — half the button visible,
       and the live half sitting under the home indicator. The Details screen grows
       for the same reason when its address block opens. */
    <div className="screen screen--white" style={{ height: 1000 }}>
      <TopSection variant="bare" url={E.url} />

      <div style={{ position: "absolute", left: 0, top: 66, width: 430 }}>
        {/* Powered by Digio bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderBottom: "1px solid var(--gray-300)",
          }}
        >
          <span style={{ width: 20 }} />
          <span
            style={{
              fontSize: 12,
              color: "var(--gray-700)",
              textDecoration: "underline",
            }}
          >
            Powered by <b style={{ color: "var(--primary)" }}>Digio</b>
          </span>
          <Icon name="close" style={{ fontSize: 20, color: "var(--gray-800)" }} />
        </div>

        <div style={{ padding: "16px 24px 0", textAlign: "center" }}>
          <p style={{ fontSize: 17, lineHeight: "24px" }}>
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>
              {E.titleLead}
            </span>
            <span style={{ fontWeight: 600, color: "var(--gray-900)" }}>
              {E.titleRest}
            </span>{" "}
            <Icon
              name="check_box"
              filled
              style={{ fontSize: 16, color: "var(--primary)", verticalAlign: -3 }}
            />
          </p>
          <p
            style={{
              marginTop: 12,
              fontSize: 12,
              lineHeight: "16px",
              color: "var(--gray-700)",
            }}
          >
            {E.authA}
            <b style={{ color: "var(--primary)" }}>{E.authOrg}</b>
            {E.authB}
          </p>
          <p
            style={{
              marginTop: 12,
              fontSize: 12,
              lineHeight: "16px",
              color: "var(--gray-700)",
            }}
          >
            {E.charges}
          </p>
        </div>

        <div style={{ margin: "16px 24px 0", border: "1px solid #e3ecf7" }}>
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

        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "16px 24px 0",
            alignItems: "flex-start",
          }}
        >
          <Icon
            name="check_box"
            filled
            style={{ fontSize: 16, color: "var(--primary)" }}
          />
          <p
            style={{
              fontSize: 11,
              lineHeight: "15px",
              color: "var(--gray-700)",
              textAlign: "center",
            }}
          >
            {E.confirmA}
            <b style={{ color: "var(--primary)" }}>{E.confirmOrg}</b>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <button
            type="button"
            style={{
              background: "var(--gray-500)",
              color: "#fff",
              fontSize: 12,
              padding: "5px 16px",
              borderRadius: 4,
            }}
          >
            {E.cancel}
          </button>
          <button
            type="button"
            className={`${hint === "cta" ? "hint " : ""}${
              onSubmit ? "is-tappable" : ""
            }`}
            onClick={onSubmit}
            /* The mandate page draws its buttons as spans. The role is what makes
               the page model see a control here at all; the id is what gives it a
               SELECTOR — without one the model reported the control with no `sel`
               and the highlight ring had nothing to attach to. */
            id="enach-submit"
            /* The deposit screen's CTA is also "Submit". Two consecutive steps
               whose target carries the SAME label let the highlight skip
               re-resolving when the screen changed, and the ring stayed frozen
               on the previous screen's node — measured: the ring did not move
               at any scroll position while the button did. The customer still
               reads "Submit"; only the accessible name is made unique. */
            aria-label="Submit mandate"
            style={{
              background: "var(--primary)",
              color: "#fff",
              fontSize: 12,
              padding: "5px 16px",
              borderRadius: 4,
            }}
          >
            {E.submit}
          </button>
        </div>
      </div>

      <Bottom perfios={false} absolute />
    </div>
  );
}

/* ============================================================
   E-Nach / Loading   6031:16168
   ------------------------------------------------------------
   The ring asset has its copy baked in (the Lottie node sits
   under a separate text layer), so it renders as one tile at
   (24,275) and the text is not drawn again.
   ============================================================ */
export function ENachLoading() {
  return (
    <div className="screen screen--white" style={{ height: 932 }}>
      <TopSection variant="bare" url={E.url} />
      <img
        src={ENACH_RING}
        alt={enach.redirect}
        style={{ position: "absolute", left: 24, top: 275, width: 382, height: 382 }}
      />
      <Bottom perfios={false} absolute />
    </div>
  );
}
