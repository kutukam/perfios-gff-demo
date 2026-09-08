import {
  TopSection,
  Bottom,
  Footer,
  Button,
  Field,
  Heading,
} from "../components/index.jsx";
import { details } from "../data/journey.js";

export function currentKey(key) {
  return `current_${key}`;
}

function Toggle({ on, onClick, hint }) {
  return (
    <div
      className={`toggle${hint ? " hint" : ""}${onClick ? " is-tappable" : ""}`}
      onClick={onClick}
    >
      <div className={`toggle__track${on ? " is-on" : ""}`}>
        <div className="toggle__knob" />
      </div>
      <p style={{ fontSize: "var(--text-md)", lineHeight: 1.25, color: "var(--gray-900)" }}>
        {details.toggle}
      </p>
    </div>
  );
}

function Fields({ items, live, values, onChangeField, prefix = "", hintFirst }) {
  return items.map((f, i) => {
    const key = prefix ? currentKey(f.key) : f.key;
    return live ? (
      <Field
        key={key}
        label={f.label}
        placeholder={f.placeholder || f.label}
        editable
        value={values?.[key] ?? ""}
        onChange={(v) => onChangeField(key, v)}
        options={f.options}
        trailingIcon={f.options ? "expand_more" : undefined}
        hint={hintFirst && i === 0}
      />
    ) : (
      <Field
        key={key}
        placeholder={f.placeholder || f.label}
        trailingIcon={f.options ? "expand_more" : undefined}
        hint={hintFirst && i === 0}
      />
    );
  });
}

function filled(items, values, prefix = "") {
  return items.every((f) => values?.[prefix ? currentKey(f.key) : f.key]);
}

export function DetailsScreen({
  address = false,
  values,
  onChangeField,
  onToggle,
  onNext,
  hint,
}) {
  const live = Boolean(onChangeField);
  const profileOk =
    !live ||
    (filled(details.identity, values) && filled(details.address, values));
  const extraOk = !live || !address || filled(details.address, values, "current");
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <Heading title={details.title} sub={details.sub} />
        <div className="stack">
          <Fields
            items={details.identity}
            live={live}
            values={values}
            onChangeField={onChangeField}
            hintFirst={hint === "field" && !address}
          />
          <Fields
            items={details.address}
            live={live}
            values={values}
            onChangeField={onChangeField}
          />
        </div>
        <Toggle on={address} onClick={onToggle} hint={hint === "toggle"} />
        {address && (
          <div className="stack">
            <Fields
              items={details.address}
              live={live}
              values={values}
              onChangeField={onChangeField}
              prefix="current"
              hintFirst={hint === "field"}
            />
          </div>
        )}
      </div>
      <Footer>
        <div className="footer__action">
          <Button
            label={address ? details.ctaAddress : details.cta}
            disabled={!profileOk || !extraOk}
            onClick={onNext}
            hint={hint === "cta"}
          />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}
