import {
  TopSection,
  Bottom,
  Footer,
  Button,
  Heading,
  TableCard,
  TableGroup,
  Row,
  StackedRow,
  Loader,
  Icon,
} from "../components/index.jsx";
import { kfs, terms } from "../data/journey.js";

/* ============================================================
   Loader screens
   6031:16587 "Processing..."           caption y=537
   6031:15983 "Processing"              caption y=549
   6031:15997 "Please be patient"       caption y=549
   6031:16600 "Verifying your details..." caption y=549
   6031:16855 "Redirecting you to e-Mandate" (caption inside slot)
   6031:16190 "Connecting to NSDL for E-Signing" caption y=604
   ============================================================ */
export function ProcessingScreen({ caption, captionTop = 552 }) {
  return (
    <div className="screen" style={{ height: 932 }}>
      <Loader caption={caption} captionTop={captionTop} />
      <TopSection />
      <Bottom absolute />
    </div>
  );
}

/* ============================================================
   Terms   6031:16173
   ------------------------------------------------------------
   Title at (24, 154), then a 382x496 bordered scroll block at
   (24, 210) holding the body at 8px inset.
   ============================================================ */
export function TermsScreen({ onNext, hint }) {
  return (
    <div className="screen" style={{ height: 932 }}>
      <div style={{ position: "absolute", left: 24, top: 154, width: 382 }}>
        <p
          className="ff-inter"
          style={{
            fontWeight: 700,
            fontSize: 24,
            lineHeight: "32px",
            color: "var(--gray-900)",
          }}
        >
          {terms.title}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: 24,
          top: 210,
          width: 382,
          height: 496,
          border: "1.6px solid var(--gray-400)",
          borderRadius: 8,
          background: "var(--white-000)",
          padding: 8,
          overflow: "hidden",
        }}
      >
        <p
          className="ff-inter"
          style={{
            width: 366,
            fontSize: 14,
            lineHeight: "20px",
            color: "var(--gray-700)",
          }}
        >
          {terms.body}
        </p>
      </div>

      <TopSection />
      <Footer>
        <div className="footer__action" style={{ width: 382 }}>
          <Button label="Accept & Continue" onClick={onNext} hint={hint === "cta"} />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}

/* ============================================================
   Review Application   6031:16204   (1474 tall — a scrolling frame)
   ------------------------------------------------------------
   Key Fact Statement: five dashed-divider groups, two stacked
   penal-charge rows, then the Grievance Redressal Officer card.
   ============================================================ */
export function ReviewApplication({ onNext, hint }) {
  return (
    <div className="screen" style={{ height: 1474 }}>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 154,
          width: 382,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <Heading title={kfs.title} sub={kfs.sub} />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <TableCard>
            {kfs.groups.map((group, gi) => (
              <TableGroup divided key={gi}>
                {group.map((r) => (
                  <Row key={r.label} {...r} />
                ))}
              </TableGroup>
            ))}
            <TableGroup>
              {kfs.stacked.map((r) => (
                <StackedRow key={r.label} {...r} />
              ))}
            </TableGroup>
          </TableCard>

          {/* Grievance Redressal Officer — 6031:16298 */}
          <div
            style={{
              width: 382,
              background: "var(--white-000)",
              border: "1.6px solid var(--gray-400)",
              borderRadius: 8,
              padding: "12px 16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <p
              className="ff-num"
              style={{
                fontWeight: 600,
                fontSize: 20,
                lineHeight: "32px",
                color: "var(--gray-900)",
              }}
            >
              {kfs.grievance.title}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <p
                className="ff-num"
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "var(--gray-900)",
                }}
              >
                {kfs.grievance.name}
              </p>
              <p
                className="ff-num"
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "var(--gray-600)",
                }}
              >
                {kfs.grievance.role}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "phone", value: kfs.grievance.phone },
                { icon: "email", value: kfs.grievance.email },
              ].map((r) => (
                <div
                  key={r.icon}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <Icon
                    name={r.icon}
                    style={{ fontSize: 24, color: "var(--primary)" }}
                  />
                  <p
                    className="ff-num"
                    style={{
                      flex: "1 0 0",
                      fontWeight: 500,
                      fontSize: 16,
                      lineHeight: "24px",
                      color: "var(--gray-900)",
                    }}
                  >
                    {r.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TopSection />
      <Footer>
        <div className="footer__action" style={{ width: 382 }}>
          <Button label="Proceed" onClick={onNext} hint={hint === "cta"} />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}
