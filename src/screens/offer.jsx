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

/* ============================================================
   Offer Screen   6031:15454
   ------------------------------------------------------------
   Content at (24, 154), 382x616: headline (120 tall), a 382x232
   illustration at y=160, then the 3-row summary table at y=432.
   ============================================================ */
export function OfferScreen({ onNext, hint }) {
  return (
    <div className="screen" style={{ height: 932 }}>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 154,
          width: 382,
          height: 616,
        }}
      >
        <p
          className="ff-inter"
          style={{
            width: 382,
            height: 120,
            fontWeight: 700,
            fontSize: 24,
            lineHeight: "40px",
            color: "var(--gray-900)",
          }}
        >
          {offer.headline}
        </p>

        {/* 6031:15458 — 382x232 slot; the exported artwork is 360x232
            so it centres horizontally */}
        <div
          style={{
            position: "absolute",
            top: 160,
            width: 382,
            height: 232,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={OFFER_ILLUSTRATION} alt="" style={{ height: 232 }} />
        </div>

        <div
          style={{
            position: "absolute",
            top: 432,
            width: 382,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
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

      <TopSection />
      <Footer>
        <div className="footer__action" style={{ width: 382 }}>
          <Button label="Next" onClick={onNext} hint={hint === "cta"} />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}

/* ============================================================
   Offer Screen / new   6031:17013 (nothing picked)
                        6031:17039 (top-up picked, table revealed)
   ------------------------------------------------------------
   NOTE: the six rows in the revealed table (nodes 6031:17058 ..
   6031:17088) have unnamed text layers, so their copy is not in
   the metadata dump and I could not fetch design context for
   them before hitting the Figma rate limit. Labels below are
   marked so they are obvious placeholders — everything else on
   this screen is verbatim.
   ============================================================ */
export function OfferTopUp({ selected = false, onSelect, onInfo, onNext, hint }) {
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
        <div style={{ height: 32, display: "flex", alignItems: "center" }}>
          <p
            className="ff-inter"
            style={{
              fontWeight: 700,
              fontSize: 24,
              lineHeight: "32px",
              color: "var(--gray-900)",
              width: 303,
            }}
          >
            {topUp.title}
          </p>
        </div>

        <div style={{ paddingTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
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
          <div
            style={{
              paddingTop: 56,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
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

      <TopSection />
      <Footer>
        <div className="footer__action" style={{ width: 382 }}>
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

/* ============================================================
   Charges / Existing loan info sheet   6280:30863  (493 tall)
   ------------------------------------------------------------
   Rows here are 24px tall with 12/16 labels, right-aligned
   values — a different, tighter table than the journey tables.
   ============================================================ */
export function ExistingLoanSheet({ onClose }) {
  return (
    <Sheet flush style={{ height: 493 }}>
      <div style={{ width: "100%", paddingTop: 13 }}>
        {/* title row */}
        <div style={{ padding: "16px 16px 0", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 398,
              height: 36,
            }}
          >
            <p
              className="ff-inter"
              style={{
                fontWeight: 700,
                fontSize: 24,
                lineHeight: "36px",
                color: "var(--asphalt-900)",
              }}
            >
              {existingLoan.title}
            </p>
            <div
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="close" style={{ color: "var(--gray-500)", fontSize: 24 }} />
            </div>
          </div>
        </div>

        {/* detail card */}
        <div style={{ padding: "16px 16px 0" }}>
          <div
            style={{
              width: 398,
              padding: 16,
              border: "1.6px solid var(--gray-400)",
              borderRadius: 8,
              background: "var(--white-000)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {existingLoan.rows.map((r) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 366,
                  height: 24,
                }}
              >
                <p
                  className="ff-inter"
                  style={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: "var(--gray-700)",
                  }}
                >
                  {r.label}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {r.bankLogo && (
                    <img src={AXIS_LOGO} alt="" style={{ width: 14, height: 12 }} />
                  )}
                  <p
                    className="ff-num"
                    style={{
                      fontSize: 12,
                      lineHeight: "16px",
                      color: "var(--gray-900)",
                      fontWeight: 500,
                    }}
                  >
                    {r.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* footnote + indicator */}
        <div style={{ padding: "16px 16px 0" }}>
          <p
            className="ff-inter"
            style={{
              width: 366,
              margin: "8px 16px",
              fontSize: 12,
              lineHeight: "16px",
              color: "var(--gray-600)",
            }}
          >
            {existingLoan.footnote}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0 8px",
          }}
        >
          <div
            style={{
              width: 140,
              height: 4,
              borderRadius: 10,
              background: "var(--gray-900)",
            }}
          />
        </div>
      </div>
    </Sheet>
  );
}
