import {
  TopSection,
  Bottom,
  Footer,
  Button,
  Choice,
  TableCard,
  TableGroup,
  Row,
  Footnote,
  Sheet,
  Icon,
} from "../components/index.jsx";
import { OFFER_ILLUSTRATION, AXIS_LOGO } from "../assets/figmaAssets.js";
import { offer, topUp, existingLoan } from "../data/journey.js";

export function OfferScreen({ onNext, hint }) {
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <p className="heading__title ff-inter">{offer.headline}</p>
        <div className="offer-art">
          <img src={OFFER_ILLUSTRATION} alt="" />
        </div>
        <div className="stack" style={{ gap: "var(--space-sm)" }}>
          <TableCard>
            <TableGroup pad12>
              {offer.rows.map((r) => (
                <Row key={r.label} {...r} />
              ))}
            </TableGroup>
          </TableCard>
          <Footnote>{offer.footnote}</Footnote>
        </div>
      </div>
      <Footer>
        <div className="footer__action">
          <Button label="Next" onClick={onNext} hint={hint === "cta"} />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}

export function OfferTopUp({ selected = false, onSelect, onInfo, onNext, hint }) {
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <p className="heading__title ff-inter">{topUp.title}</p>
        <div className="stack">
          <Choice
            label={topUp.optionTopUp}
            selected={selected}
            info
            onClick={selected ? undefined : onSelect}
            onInfo={selected ? onInfo : undefined}
            hint={hint === "option"}
          />
          <Choice label={topUp.optionNew} />
        </div>
        {selected && (
          <div className="stack" style={{ gap: "var(--space-sm)" }}>
            <TableCard>
              <TableGroup divided>
                <Row label="Existing Loan Amount" value="—" tone="strongDark" />
                <Row label="Current Outstanding" value="—" tone="muted" indent />
                <Row label="Existing EMI" value="—" tone="muted" indent />
              </TableGroup>
              <TableGroup>
                <Row label="Top Up Amount" value="—" tone="strongDark" />
                <Row label="Revised Loan Amount" value="—" tone="muted" />
                <Row label="Revised Monthly EMI" value="—" tone="muted" />
              </TableGroup>
            </TableCard>
            <Footnote>{topUp.footnote}</Footnote>
          </div>
        )}
      </div>
      <Footer>
        <div className="footer__action">
          <Button
            label="Next"
            disabled={!selected}
            onClick={onNext}
            hint={hint === "cta"}
          />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}

export function ExistingLoanSheet({ onClose }) {
  return (
    <Sheet flush>
      <div className="stack" style={{ width: "100%", padding: "var(--space-md) var(--gutter)" }}>
        <div className="sheet-head">
          <p className="sheet__title ff-inter">{existingLoan.title}</p>
          <Icon
            name="close"
            style={{ color: "var(--gray-500)", fontSize: 24 }}
            onClick={onClose}
          />
        </div>
        <div className="sheet-card">
          {existingLoan.rows.map((r) => (
            <div className="sheet-row" key={r.label}>
              <p className="ff-inter" style={{ fontSize: "var(--text-xs)", lineHeight: 1.35, color: "var(--gray-700)" }}>
                {r.label}
              </p>
              <div className="row" style={{ gap: 4 }}>
                {r.bankLogo && (
                  <img src={AXIS_LOGO} alt="" width="14" height="12" />
                )}
                <p className="ff-num" style={{ fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--gray-900)" }}>
                  {r.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="ff-inter" style={{ fontSize: "var(--text-xs)", lineHeight: 1.35, color: "var(--gray-600)" }}>
          {existingLoan.footnote}
        </p>
      </div>
    </Sheet>
  );
}
