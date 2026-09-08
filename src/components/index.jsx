import { useRef } from "react";

import { ACME_LOGO, PERFIOS_LOGO, MARK_RUPEE } from "../assets/figmaAssets.js";
import { ICON_PATHS } from "./icons.jsx";

/* ============================================================
   Icon — Material Symbols Rounded. `light` maps to the Light
   weight the file uses on buttons and checkboxes; `filled` maps
   to FILL 1 (the success check_circle).
   ============================================================ */
export function Icon({ name, light, filled, className = "", style, onClick }) {
  const cls = ["msr", light ? "msr--light" : "", filled ? "msr--filled" : "", className]
    .filter(Boolean)
    .join(" ");
  const path = ICON_PATHS[name];
  return (
    <span className={cls} style={style} onClick={onClick} aria-hidden="true">
      {path ? (
        /* The glyph is drawn, never typed: a webfont that has not arrived
           renders its own ligature TEXT, and "check_box_outline_blank" in
           place of a checkbox is what broke this page on a phone. `1em`
           keeps every existing font-size rule working unchanged. */
        <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" focusable="false">
          <path d={path} />
        </svg>
      ) : null}
    </span>
  );
}

/* ============================================================
   Status bar glyphs. The file uses SF Symbols (cellularbars, wifi,
   battery.50percent); these are drawn to the same footprint.
   ============================================================ */
function StatusGlyphs() {
  return (
    <div className="chrome__glyphs">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="6" width="3" height="6" rx="1" />
        <rect x="10" y="3" width="3" height="9" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
        <path d="M8 11.2 6.1 9.1a2.6 2.6 0 0 1 3.8 0L8 11.2Z" />
        <path
          d="M3.6 6.4a6.4 6.4 0 0 1 8.8 0"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M1.1 3.6a10 10 0 0 1 13.8 0"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="21"
          height="11"
          rx="3"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        <rect x="2" y="2" width="9.5" height="8" rx="2" fill="currentColor" />
        <path
          d="M23 4v4a2.2 2.2 0 0 0 0-4Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
}

function LockGlyph() {
  return (
    <svg width="9" height="12" viewBox="0 0 9 12" fill="#fff" aria-hidden="true">
      <path d="M4.5 0a2.6 2.6 0 0 0-2.6 2.6v1.3H1.5A1.5 1.5 0 0 0 0 5.4v5.1A1.5 1.5 0 0 0 1.5 12h6A1.5 1.5 0 0 0 9 10.5V5.4a1.5 1.5 0 0 0-1.5-1.5h-.4V2.6A2.6 2.6 0 0 0 4.5 0Zm1.6 3.9H2.9V2.6a1.6 1.6 0 0 1 3.2 0v1.3Z" />
    </svg>
  );
}

/* ============================================================
   TOP SECTION — 430x122. Three variants in the file:
   "logo"  = brand mark only, navy icons  (landing screen)
   "back"  = arrow_back + brand mark, gray icons (every step after)
   ============================================================ */
export function TopSection({ variant = "back", url = "pcg.perfios.com/personal_loan", time = "2:55" }) {
  const withBack = variant === "back";
  /* "bare" is the 66px chrome the E-Nach screens use: browser bands
     only, no Acme topbar. */
  if (variant === "bare") {
    return (
      <div className="top-section">
        <div className="chrome__status">
          <p className="chrome__time">{time}</p>
          <StatusGlyphs />
        </div>
        <div className="chrome__address">
          <div className="chrome__address-inner">
            <LockGlyph />
            <div className="chrome__url">{url}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="top-section">
      <div className="chrome__status">
        <p className="chrome__time">{time}</p>
        <StatusGlyphs />
      </div>

      <div className="chrome__address">
        <div className="chrome__address-inner">
          <LockGlyph />
          <div className="chrome__url">{url}</div>
        </div>
      </div>

      <div className={`topbar${withBack ? " topbar--back" : ""}`}>
        <div className="topbar__left">
          {withBack && <Icon name="arrow_back" className="topbar__back" />}
          <div className="topbar__logo">
            <img src={ACME_LOGO} alt="Acme" />
          </div>
        </div>
        <div
          className={`topbar__icons ${
            withBack ? "topbar__icons--gray" : "topbar__icons--navy"
          }`}
        >
          <Icon name="help" />
          <Icon name="more_vert" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM — "Powered by Perfios" + home indicator.
   `perfios={false}` gives the 32px indicator-only variant.
   ============================================================ */
export function Bottom({ perfios = true, absolute = false, width }) {
  return (
    <div
      className={`bottom${absolute ? " bottom--abs" : ""}`}
      style={width ? { width } : undefined}
    >
      {perfios && (
        <div className="bottom__perfios">
          <p className="bottom__perfios-label">Powered by</p>
          <div className="bottom__perfios-logo">
            <img src={PERFIOS_LOGO} alt="Perfios" />
          </div>
        </div>
      )}
      <div className="bottom__indicator">
        <div className="bottom__indicator-bar" />
      </div>
    </div>
  );
}

export function HomeIndicator({ style }) {
  return (
    <div className="home-indicator" style={style}>
      <div className="home-indicator__bar" />
    </div>
  );
}

/* ============================================================
   FOOTER — sticky white action shelf at the bottom of a screen.
   ============================================================ */
export function Footer({ children, plain = false, style }) {
  return (
    <div className={`footer${plain ? " footer--plain" : ""}`} style={style}>
      {children}
    </div>
  );
}

/* ============================================================
   BUTTON — component "Button_mobile". Trailing chevron is on by
   default because that is how it ships on the journey CTAs.
   ============================================================ */
export function Button({
  label,
  variant = "primary",
  disabled = false,
  chevron = true,
  leadingIcon,
  onClick,
  hint = false,
  style,
}) {
  return (
    <button
      className={`btn btn--${variant}${disabled ? " is-disabled" : ""}${
        hint ? " hint" : ""
      }`}
      onClick={disabled ? undefined : onClick}
      style={style}
      type="button"
      /* without this the Material Symbols glyph inside is part of the button's
         text, and the assistant reads "Get OTPkeyboard_arrow_right" */
      aria-label={label}
    >
      {leadingIcon && <Icon name={leadingIcon} light className="btn__icon" />}
      <span className="btn__label ff-num">{label}</span>
      {chevron && (
        <Icon name="keyboard_arrow_right" light className="btn__icon" />
      )}
    </button>
  );
}

/* ============================================================
   FIELD — component "Fields". Three shapes appear in the file:
   - placeholder only          (state: "rest" | "focus")
   - label + typed value       (filled)
   - label + masked value      (Aadhaar / mandate password)
   ============================================================ */
export function Field({
  label,
  value,
  placeholder,
  brandPlaceholder = false,
  leadingIcon,
  trailingIcon,
  trailingFilled = false,
  trailingOk = false,
  state = "rest",
  mask,
  maskTail,
  trailingSlot,
  width,
  onClick,
  hint = false,
  /* Demo view only: `editable` turns the value into a real input, so the
     field can be typed into as well as tapped. Frames and Canvas never
     pass it, so the static frames are untouched. */
  editable = false,
  onChange,
  inputMode,
  maxLength,
}) {
  const input = useRef(null);
  /* An editable field is stacked once it holds something, which is the
     same label-above-value shape the "filled" frames use. */
  const stacked = editable ? Boolean(value) : Boolean(label);

  /* Tapping an empty editable field fills it with the demo value and
     selects it, so the next keystroke replaces it. Tapping a filled one
     just places the caret. */
  const handleClick = editable
    ? () => {
        if (!value) onClick?.();
        requestAnimationFrame(() => {
          input.current?.focus();
          input.current?.select();
        });
      }
    : onClick;

  return (
    <div
      className={`field${state === "focus" ? " field--focus" : ""}${
        state === "active" ? " field--active" : ""
      }${hint ? " hint" : ""}${handleClick ? " is-tappable" : ""}`}
      style={width ? { width } : undefined}
      onClick={handleClick}
      role={!editable && onClick ? "button" : undefined}
    >
      <div className={`field__box${stacked ? " field__box--stacked" : ""}`}>
        {leadingIcon && (
          <div className="field__leading">
            <Icon name={leadingIcon} />
          </div>
        )}

        {editable ? (
          /* One input either way — keyed so React keeps the same DOM node
             when the box restacks on the first keystroke and focus holds. */
          <div className={stacked ? "field__container--stacked" : "field__container"}>
            {stacked && (
              <p className="field__label" key="label">
                {label ?? placeholder}
              </p>
            )}
            <input
              key="input"
              ref={input}
              className={`${
                brandPlaceholder && !stacked
                  ? "field__placeholder-brand"
                  : "field__value"
              } field__input`}
              value={value ?? ""}
              placeholder={placeholder}
              onChange={(e) => onChange?.(e.target.value)}
              inputMode={inputMode}
              maxLength={maxLength}
              autoComplete="off"
              /* the visible label moves above the value once the box fills, so
                 the accessible name is pinned here instead — it is what the
                 co-browse page model reads. */
              aria-label={label ?? placeholder}
            />
          </div>
        ) : stacked ? (
          <div className="field__container--stacked">
            <p className="field__label">{label}</p>
            {mask ? (
              <Mask groups={mask} tail={maskTail} />
            ) : (
              <p className="field__value">{value}</p>
            )}
          </div>
        ) : (
          <div className="field__container">
            <p
              className={
                brandPlaceholder
                  ? "field__placeholder-brand"
                  : "field__placeholder"
              }
            >
              {placeholder}
            </p>
          </div>
        )}

        {trailingIcon && (
          <div
            className={`field__trailing${trailingOk ? " field__trailing--ok" : ""}`}
          >
            <Icon name={trailingIcon} light filled={trailingFilled} />
          </div>
        )}

        {/* an arbitrary trailing element, e.g. the Axis mark on the
            IFSC field of the pre-filled deposit screen */}
        {trailingSlot && <div className="field__trailing">{trailingSlot}</div>}
      </div>
    </div>
  );
}

/* Masked value: `groups` is an array of dot counts, e.g. [4, 4]. */
function Mask({ groups, tail }) {
  return (
    <div className="field__mask">
      {groups.map((count, gi) => (
        <div className="field__mask-group" key={gi}>
          {Array.from({ length: count }).map((_, i) => (
            <span className="field__dot" key={i} />
          ))}
        </div>
      ))}
      {tail && <span className="field__mask-tail">{tail}</span>}
    </div>
  );
}

/* ============================================================
   CONSENT — checkbox + MITC link.
   ============================================================ */
export function Consent({ checked = false, onClick, hint = false }) {
  return (
    <button
      className={`consent${hint ? " hint" : ""}`}
      type="button"
      onClick={onClick}
      aria-label="I have read and accepted Most Important Terms and Conditions (MITC)"
    >
      <Icon
        name={checked ? "check_box" : "check_box_outline_blank"}
        light
        className="consent__box"
      />
      <div className="consent__text ff-inter">
        I have read and accepted{" "}
        <span className="consent__link">
          Most Important Terms and Conditions (MITC)
        </span>
      </div>
    </button>
  );
}

/* ============================================================
   HEADING — title + supporting line.
   ============================================================ */
export function Heading({ title, sub }) {
  return (
    <div className="heading">
      <p className="heading__title ff-inter">{title}</p>
      {sub && <p className="heading__sub ff-inter">{sub}</p>}
    </div>
  );
}

/* ============================================================
   TABLE primitives — the "_base / cell" + "Row" pattern.
   ============================================================ */
export function TableCard({ children, style }) {
  return (
    <div className="table-card" style={style}>
      {children}
    </div>
  );
}

export function TableGroup({ children, divided = false, pad12 = false }) {
  return (
    <div
      className={`table-group${divided ? " table-group--divided" : ""}${
        pad12 ? " table-group--pad12" : ""
      }`}
    >
      {children}
    </div>
  );
}

/* One label/value row. `tone` selects the value treatment seen in
   the file: strong (600), bold (700), primary, green, muted. */
export function Row({ label, value, note, indent = false, tone = "default" }) {
  const toneClass = {
    default: "",
    muted: "cell__value--muted",
    strong: "cell__value--strong",
    bold: "cell__value--bold",
    primary: "cell__value--bold cell__value--primary",
    green: "cell__value--strong cell__value--green",
    strongDark: "cell__value--strong",
  }[tone];

  return (
    <div className="table-row">
      <div className={`cell${indent ? " cell--indent" : ""}`}>
        <p className="cell__label">{label}</p>
      </div>
      <div className="cell cell--value">
        {value && <p className={`cell__value ff-num ${toneClass}`}>{value}</p>}
        {note && (
          <p className="cell__value ff-num cell__value--gray800">{note}</p>
        )}
      </div>
    </div>
  );
}

/* Stacked row: bold label on its own line, value beneath. */
export function StackedRow({ label, value }) {
  return (
    <div className="table-row table-row--stacked">
      <div className="cell--full">
        <p className="cell__label--strong ff-num">{label}</p>
      </div>
      <div className="cell--full-value">
        <p className="cell__value ff-num cell__value--muted">{value}</p>
      </div>
    </div>
  );
}

export function Footnote({ children }) {
  return (
    <div className="footnote">
      <p className="footnote__text ff-inter">{children}</p>
    </div>
  );
}

/* ============================================================
   SHEET — bottom sheet shell.
   ============================================================ */
export function Sheet({ children, flush = false, style }) {
  return (
    <div className={`sheet${flush ? " sheet--flush" : ""}`} style={style}>
      <div className="sheet__grabber" />
      {children}
    </div>
  );
}

export function Scrim() {
  return <div className="scrim" />;
}

/* ============================================================
   CHOICE — radio / check list item, 56px.
   ============================================================ */
export function Choice({
  label,
  selected = false,
  info = false,
  width,
  onClick,
  onInfo,
  hint = false,
}) {
  return (
    <div
      className={`choice${selected ? " choice--selected" : ""}${
        hint ? " hint" : ""
      }${onClick ? " is-tappable" : ""}`}
      style={{ width: width || "100%" }}
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      /* the radio glyph and the ⓘ are text nodes inside this card, so without
         an explicit name the assistant reads
         "radio_button_uncheckedTop Up this to…loaninfo" */
      aria-label={label}
    >
      <div className="choice__inner">
        <Icon
          name={selected ? "check_circle" : "radio_button_unchecked"}
          className={`choice__icon${selected ? " choice__icon--on" : ""}`}
        />
        <p className="choice__label">{label}</p>
      </div>
      {info && (
        <Icon
          name="info"
          className={`choice__info${onInfo ? " is-tappable" : ""}`}
          style={onInfo ? { color: "var(--primary)" } : undefined}
          onClick={
            onInfo
              ? (e) => {
                  e.stopPropagation();
                  onInfo();
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

/* ============================================================
   LOADER — the "lottiefiles" 390x390 node is a placeholder; what
   renders is the rupee mark, 52x52 centred at (189,429), with the
   caption below at the y each frame specifies.
   ============================================================ */
export function Loader({ caption, captionTop = 552 }) {
  return (
    <>
      <img
        src={MARK_RUPEE}
        alt=""
        style={{ position: "absolute", left: 189, top: 429, width: 52, height: 52 }}
      />
      {caption && (
        <p className="loader__caption ff-inter" style={{ top: captionTop }}>
          {caption}
        </p>
      )}
    </>
  );
}
