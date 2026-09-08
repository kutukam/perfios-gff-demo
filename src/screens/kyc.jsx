import {
  TopSection,
  Bottom,
  Footer,
  Button,
  Field,
  Heading,
} from "../components/index.jsx";
import { applicant } from "../data/journey.js";

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
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <Heading
          title="Enter Your PAN"
          sub="Please share your PAN number to continue"
        />
        <div className="stack">
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
        </div>
      </div>
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
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <Heading
          title="Enter Your Aadhaar"
          sub="Please share your Aadhaar number to continue"
        />
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
