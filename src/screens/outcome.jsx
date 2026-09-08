import { TopSection, Bottom, Icon } from "../components/index.jsx";
import {
  MARK_RUPEE,
  MARK_SUCCESS,
  IOS_KEYBOARD,
  MSG_AVATAR,
  NOTIF_APP_ICON,
} from "../assets/figmaAssets.js";
import { outcome, outcomeTable as T, sms, tooltip } from "../data/journey.js";

export function Congratulations({ disbursed = false }) {
  return (
    <div className="screen">
      <TopSection />
      <div className="screen__body">
        <div className="outcome-mark">
          {disbursed ? (
            <img src={MARK_SUCCESS} alt="" className="is-lg" />
          ) : (
            <img src={MARK_RUPEE} alt="" />
          )}
        </div>
        <p className="outcome-copy ff-inter">
          {disbursed ? (
            outcome.disbursed
          ) : (
            <>
              Thank you for choosing us. Your loan application{" "}
              <span style={{ color: "var(--blue-700)" }}>2345091211</span> is under
              process.
            </>
          )}
        </p>
        <div className="table-card">
          <div className="table-group table-group--divided">
            <div className="table-row">
              <div className="cell">
                <p className="cell__label">{T.statusLabel}</p>
              </div>
              <div className="cell cell--value">
                <p
                  className="cell__value cell__value--strong"
                  style={{ color: disbursed ? "#2e9e5b" : "#e07a1f" }}
                >
                  {disbursed ? T.disbursedStatus : T.inProgress}
                </p>
              </div>
            </div>
            <div className="table-row">
              <div className="cell">
                <p className="cell__label">{T.amountLabel}</p>
              </div>
              <div className="cell cell--value">
                <p className="cell__value ff-num cell__value--strong">{T.amount}</p>
              </div>
            </div>
          </div>
          <div className="table-group">
            {T.rows.map((r) => (
              <div className="table-row" key={r.label}>
                <div className="cell">
                  <p className="cell__label">{r.label}</p>
                </div>
                <div className="cell cell--value">
                  <p className="cell__value ff-num">{r.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p
          className="ff-inter"
          style={{
            textAlign: "center",
            fontSize: "var(--text-xs)",
            lineHeight: 1.35,
            color: "var(--gray-600)",
          }}
        >
          {T.footnote}
        </p>
      </div>
      <Bottom absolute />
    </div>
  );
}

export function NotificationBanner() {
  return (
    <div className="notif">
      <img src={NOTIF_APP_ICON} alt="" />
      <div className="notif__body">
        <div className="row" style={{ justifyContent: "space-between", gap: "var(--space-sm)" }}>
          <p style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.35, color: "#1c1c1e" }}>
            {sms.notifTitle}
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.35, color: "#5b5b5f" }}>{sms.time}</p>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.35, color: "#1c1c1e" }}>{sms.notifBody}</p>
      </div>
    </div>
  );
}

export function MessageThread() {
  return (
    <div className="screen screen--white msg">
      <div className="msg__header">
        <img src={MSG_AVATAR} alt="" width="40" height="40" />
        <p style={{ fontSize: 11, lineHeight: 1.2, marginTop: 4 }}>{sms.sender}</p>
      </div>
      <div className="msg__bubble">
        <p style={{ fontSize: "var(--text-md)", lineHeight: 1.4, color: "#000" }}>{sms.body}</p>
        <p style={{ fontSize: "var(--text-md)", lineHeight: 1.4, marginTop: "var(--space-xl)" }}>
          {sms.signature}
        </p>
      </div>
      <div className="msg__composer">
        <div className="msg__bar">
          <Icon name="apps" style={{ fontSize: 24, color: "#8e8e93" }} />
          <Icon name="photo_camera" style={{ fontSize: 24, color: "#8e8e93" }} />
          <div className="msg__field">
            <span style={{ fontSize: "var(--text-md)", color: "#8e8e93" }}>{sms.placeholder}</span>
            <Icon name="mic" style={{ fontSize: 20, color: "#8e8e93" }} />
          </div>
        </div>
        <img src={IOS_KEYBOARD} alt="" className="msg__keys" />
      </div>
    </div>
  );
}

export function Tooltip() {
  return (
    <div className="tooltip">
      <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.55, flex: 1 }}>{tooltip.body}</p>
      <Icon name="close" style={{ fontSize: 18 }} />
    </div>
  );
}
