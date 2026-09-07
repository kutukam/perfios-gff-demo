import { TopSection, Bottom, Icon, Footnote } from "../components/index.jsx";
import {
  MARK_RUPEE,
  MARK_SUCCESS,
  IOS_KEYBOARD,
  MSG_AVATAR,
  NOTIF_APP_ICON,
} from "../assets/figmaAssets.js";
import { outcome, outcomeTable as T, sms, tooltip } from "../data/journey.js";

/* ============================================================
   Congratulations      6031:16697  — application in process
   Congratulations 7    6031:16641  — disbursed
   ------------------------------------------------------------
   Mark at (131,170) in a 382-wide block, headline beneath, then a
   two-group table: Status / Disbursed Amount above a dashed rule,
   then the five account rows. Footnote is centred, 12/16 gray.
   ============================================================ */
export function Congratulations({ disbursed = false }) {
  return (
    <div className="screen" style={{ height: 932 }}>
      <div style={{ position: "absolute", left: 24, top: 170, width: 382 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {disbursed ? (
            <img src={MARK_SUCCESS} alt="" style={{ width: 106, height: 106 }} />
          ) : (
            <img src={MARK_RUPEE} alt="" style={{ width: 52, height: 52 }} />
          )}
        </div>

        <p
          className="ff-inter"
          style={{
            marginTop: disbursed ? 42 : 96,
            width: disbursed ? 382 : 358,
            marginLeft: disbursed ? 0 : 12,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 16,
            lineHeight: "24px",
            color: "var(--gray-900)",
          }}
        >
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

        <div style={{ marginTop: disbursed ? 64 : 64 }}>
          <div className="table-card">
            <div className="table-group table-group--divided">
              <div className="table-row">
                <div className="cell">
                  <p className="cell__label">{T.statusLabel}</p>
                </div>
                <div className="cell cell--value">
                  <p
                    className="cell__value cell__value--strong"
                    style={{
                      color: disbursed ? "#2e9e5b" : "#e07a1f",
                    }}
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
                  <p className="cell__value ff-num cell__value--strong">
                    {T.amount}
                  </p>
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
              marginTop: 8,
              width: 366,
              marginLeft: 8,
              textAlign: "center",
              fontSize: 12,
              lineHeight: "16px",
              color: "var(--gray-600)",
            }}
          >
            {T.footnote}
          </p>
        </div>
      </div>

      <TopSection />
      <Bottom absolute />
    </div>
  );
}

/* ============================================================
   Notification - Collapsed   6031:16753   (407x68)
   ============================================================ */
export function NotificationBanner() {
  return (
    <div
      style={{
        position: "relative",
        width: 407,
        height: 68,
        borderRadius: 14,
        background: "rgba(160,160,160,0.92)",
        display: "flex",
        alignItems: "center",
        padding: 14,
        gap: 10,
      }}
    >
      <img src={NOTIF_APP_ICON} alt="" style={{ width: 38, height: 38 }} />
      <div style={{ width: 331 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p
            style={{
              fontWeight: 600,
              fontSize: 15,
              lineHeight: "20px",
              color: "#1c1c1e",
            }}
          >
            {sms.notifTitle}
          </p>
          <p style={{ fontSize: 13, lineHeight: "20px", color: "#5b5b5f" }}>
            {sms.time}
          </p>
        </div>
        <p style={{ fontSize: 15, lineHeight: "20px", color: "#1c1c1e" }}>
          {sms.notifBody}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Message 19   6031:16613
   ------------------------------------------------------------
   iOS Messages thread: header with avatar at (195,57), the SMS
   bubble at (14,150), then the message bar and keyboard from
   y=579. Keyboard is the exported 430x291 asset.
   ============================================================ */
export function MessageThread() {
  return (
    <div className="screen screen--white" style={{ height: 932 }}>
      {/* header */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 430,
          height: 126,
          background: "#f7f7f7",
          borderBottom: "0.5px solid #d1d1d6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px 0",
          }}
        >
          <p style={{ fontWeight: 600, fontSize: 16 }}>{sms.statusTime}</p>
          <p style={{ fontSize: 13, letterSpacing: 1 }}>▮▮▮ ᯤ ▰</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <img src={MSG_AVATAR} alt="" style={{ width: 40, height: 40 }} />
          <p style={{ fontSize: 11, lineHeight: "13px", marginTop: 4 }}>
            {sms.sender}
          </p>
        </div>
      </div>

      {/* incoming bubble */}
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 150,
          width: 252,
          background: "#e9e9eb",
          borderRadius: 18,
          padding: 16,
        }}
      >
        <p style={{ fontSize: 16, lineHeight: "22px", color: "#000" }}>
          {sms.body}
        </p>
        <p style={{ fontSize: 16, lineHeight: "22px", marginTop: 22 }}>
          {sms.signature}
        </p>
      </div>

      {/* message bar + keyboard */}
      <div style={{ position: "absolute", left: 0, top: 579, width: 430 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 16px",
          }}
        >
          <Icon name="apps" style={{ fontSize: 24, color: "#8e8e93" }} />
          <Icon name="photo_camera" style={{ fontSize: 24, color: "#8e8e93" }} />
          <div
            style={{
              flex: 1,
              height: 40,
              border: "1px solid #d1d1d6",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 12px",
            }}
          >
            <span style={{ fontSize: 16, color: "#8e8e93" }}>
              {sms.placeholder}
            </span>
            <Icon name="mic" style={{ fontSize: 20, color: "#8e8e93" }} />
          </div>
        </div>
        <img src={IOS_KEYBOARD} alt="" style={{ width: 430, height: 291 }} />
      </div>
    </div>
  );
}

/* ============================================================
   Tooltip — 326x72 floating overlay
   ============================================================ */
export function Tooltip() {
  return (
    <div
      style={{
        position: "relative",
        width: 326,
        height: 72,
        borderRadius: 8,
        background: "var(--chrome-bg)",
        color: "var(--white-000)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        gap: 12,
      }}
    >
      <p style={{ fontSize: 14, lineHeight: "22px", width: 254 }}>
        {tooltip.body}
      </p>
      <Icon name="close" style={{ fontSize: 18 }} />
    </div>
  );
}
