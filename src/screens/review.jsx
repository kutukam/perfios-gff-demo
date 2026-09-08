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

export function ProcessingScreen({ caption }) {
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body screen__body--center">
        <Loader caption={caption} />
      </div>
      <Bottom absolute />
    </div>
  );
}

export function TermsScreen({ onNext, hint }) {
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <p className="heading__title ff-inter">{terms.title}</p>
        <div className="terms-box">
          <p className="ff-inter">{terms.body}</p>
        </div>
      </div>
      <Footer>
        <div className="footer__action">
          <Button label="Accept & Continue" onClick={onNext} hint={hint === "cta"} />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}

export function ReviewApplication({ onNext, hint }) {
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <Heading title={kfs.title} sub={kfs.sub} />
        <div className="stack stack--xl">
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
          <div className="grievance">
            <p className="ff-num" style={{ fontWeight: 600, fontSize: "var(--text-lg)", lineHeight: 1.6, color: "var(--gray-900)" }}>
              {kfs.grievance.title}
            </p>
            <div className="stack" style={{ gap: 4 }}>
              <p className="ff-num" style={{ fontWeight: 500, fontSize: "var(--text-md)", color: "var(--gray-900)" }}>
                {kfs.grievance.name}
              </p>
              <p className="ff-num" style={{ fontSize: "var(--text-md)", color: "var(--gray-600)" }}>
                {kfs.grievance.role}
              </p>
            </div>
            <div className="stack" style={{ gap: "var(--space-sm)" }}>
              {[
                { icon: "phone", value: kfs.grievance.phone },
                { icon: "email", value: kfs.grievance.email },
              ].map((r) => (
                <div key={r.icon} className="row" style={{ gap: "var(--space-md)", alignItems: "flex-start" }}>
                  <Icon name={r.icon} style={{ fontSize: 24, color: "var(--primary)" }} />
                  <p className="ff-num" style={{ flex: 1, fontWeight: 500, fontSize: "var(--text-md)", color: "var(--gray-900)" }}>
                    {r.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <div className="footer__action">
          <Button label="Proceed" onClick={onNext} hint={hint === "cta"} />
        </div>
        <Bottom />
      </Footer>
    </div>
  );
}
