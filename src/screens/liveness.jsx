import { TopSection, Bottom, Button, Icon } from "../components/index.jsx";
import {
  LIVENESS_CAMERA,
  LIVENESS_CAPTURE,
  LIVENESS_LOCATION_BLUR,
} from "../assets/figmaAssets.js";
import { livenessCopy as C } from "../data/journey.js";

/* Shared white panel that sits over the camera feed. */
function Panel({ height, children }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 430,
        height,
        background: "var(--white-000)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 3,
      }}
    >
      {children}
    </div>
  );
}

function PoweredBy() {
  return (
    <div style={{ width: 382 }}>
      <Bottom width={382} />
    </div>
  );
}

/* ============================================================
   Location Access   6031:15851
   ------------------------------------------------------------
   The underlying liveness screen is blurred behind a scrim, with
   an iOS-style alert centred at (55,358), 320x216.
   ============================================================ */
export function LocationAccess({ onAllow, onDeny, hint }) {
  return (
    <div className="screen" style={{ height: 932 }}>
      <img
        src={LIVENESS_LOCATION_BLUR}
        alt=""
        style={{ position: "absolute", left: 0, top: 122, width: 430, height: 810 }}
      />
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 358,
          width: 320,
          background: "var(--white-000)",
          borderRadius: 14,
          overflow: "hidden",
          zIndex: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "20px 24px 16px",
          }}
        >
          <Icon
            name="location_on"
            style={{ fontSize: 20, color: "var(--gray-700)" }}
          />
          <p
            style={{
              fontSize: 15,
              lineHeight: "20px",
              textAlign: "center",
              color: "var(--gray-900)",
            }}
          >
            {C.locationTitle}
          </p>
        </div>
        {[C.allow, C.deny].map((l) => (
          <div
            key={l}
            className={`${hint === "allow" && l === C.allow ? "hint " : ""}${
              onAllow ? "is-tappable" : ""
            }`}
            onClick={l === C.allow ? onAllow : onDeny}
            style={{
              borderTop: "0.5px solid var(--gray-300)",
              padding: "12px 0",
              textAlign: "center",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.5px",
              color: "#0b7d6b",
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <TopSection />
    </div>
  );
}

/* ============================================================
   Video Liveness 31   6031:15829   — instructions + Start
   Video Liveness 32   6031:15881   — reading digits, Stop (in progress)
   Video Liveness 33   6031:15919   — reading digits, Stop
   ------------------------------------------------------------
   Camera still fills 430x569 from y=122. Panel is 266 tall on the
   instruction screen, 276 once the digits appear.
   ============================================================ */
export function VideoLiveness({ stage = "start", progress = 0, onStart, onStop, hint }) {
  const reading = stage !== "start";
  return (
    <div className="screen screen--white" style={{ height: 932 }}>
      <img
        src={LIVENESS_CAMERA}
        alt=""
        style={{ position: "absolute", left: 0, top: 122, width: 430, height: 569 }}
      />

      <Panel height={reading ? 276 : 266}>
        <div style={{ width: 382, padding: "16px 0 0" }}>
          {reading ? (
            <>
              <p
                style={{
                  width: 320,
                  margin: "0 auto",
                  fontWeight: 700,
                  fontSize: 32,
                  lineHeight: "48px",
                  textAlign: "center",
                  color: "var(--gray-900)",
                }}
              >
                {C.digits}
              </p>
              <p
                style={{
                  width: 320,
                  margin: "8px auto 0",
                  fontSize: 12,
                  lineHeight: "18px",
                  textAlign: "center",
                  color: "var(--gray-600)",
                }}
              >
                {C.stopHint}
              </p>
            </>
          ) : (
            <>
              <p
                style={{
                  width: 320,
                  margin: "0 auto",
                  fontWeight: 600,
                  fontSize: 20,
                  lineHeight: "30px",
                  textAlign: "center",
                  color: "var(--gray-900)",
                }}
              >
                {C.verifyTitle}
              </p>
              <p
                style={{
                  width: 320,
                  margin: "8px auto 0",
                  fontSize: 12,
                  lineHeight: "18px",
                  textAlign: "center",
                  color: "var(--gray-600)",
                }}
              >
                {C.verifySubA}
                <span style={{ color: "#d8552f", fontWeight: 600 }}>
                  {C.verifySubHighlight}
                </span>
              </p>
            </>
          )}

          <div style={{ marginTop: 20 }}>
            {reading ? (
              <StopButton progress={progress} onClick={onStop} hint={hint === "cta"} />
            ) : (
              <Button label={C.start} onClick={onStart} hint={hint === "cta"} />
            )}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <PoweredBy />
        </div>
      </Panel>

      <TopSection />
    </div>
  );
}

/* The Stop button doubles as a recording progress bar: a solid
   perfios-blue fill grows left to right over a 50% tint. */
function StopButton({ progress, onClick, hint }) {
  return (
    <div
      className={`${hint ? "hint " : ""}${onClick ? "is-tappable" : ""}`}
      onClick={onClick}
      style={{
        position: "relative",
        width: 382,
        height: 56,
        borderRadius: 8,
        overflow: "hidden",
        background: progress ? "rgba(0,80,170,0.45)" : "var(--perfios-blue)",
      }}
    >
      {progress > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress * 100}%`,
            background: "var(--perfios-blue)",
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          color: "var(--white-000)",
        }}
      >
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#fff",
            }}
          />
        </span>
        <span
          style={{
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "1px",
          }}
        >
          {C.stop}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   Video Liveness 34   6031:15957   — confirm captured video
   ------------------------------------------------------------
   Heading block at (55,154); the 320x440 still at (55,254) with a
   play affordance and scrubber; Retake / Confirm pair at the base.
   ============================================================ */
export function ConfirmVideo({ onRetake, onConfirm, hint }) {
  return (
    <div className="screen screen--white" style={{ height: 932 }}>
      <div style={{ position: "absolute", left: 55, top: 154, width: 320 }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "30px",
            textAlign: "center",
            color: "var(--gray-900)",
          }}
        >
          {C.confirmTitle}
        </p>
        <p
          style={{
            marginTop: 2,
            fontSize: 12,
            lineHeight: "18px",
            textAlign: "center",
            color: "var(--gray-600)",
          }}
        >
          {C.confirmSub}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: 55,
          top: 254,
          width: 320,
          height: 440,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <img
          src={LIVENESS_CAPTURE}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="play_arrow" filled style={{ fontSize: 22, color: "#212121" }} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 12px 10px",
            color: "#fff",
            fontSize: 11,
          }}
        >
          <span>{C.elapsed}</span>
          <span style={{ flex: 1, height: 2, background: "rgba(255,255,255,.5)" }}>
            <span
              style={{
                display: "block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fff",
                transform: "translateY(-3px)",
              }}
            />
          </span>
          <span>{C.duration}</span>
        </div>
        <div style={{ position: "absolute", right: 10, top: 10, color: "#fff" }}>
          <Icon name="volume_up" filled style={{ fontSize: 18 }} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 430,
          height: 168,
          background: "var(--white-000)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        <div style={{ display: "flex", gap: 16, width: 382 }}>
          <div style={{ width: 183 }}>
            <Button
              label={C.retake}
              variant="secondary"
              chevron={false}
              onClick={onRetake}
            />
          </div>
          <div style={{ width: 183 }}>
            <Button label={C.confirm} onClick={onConfirm} hint={hint === "cta"} />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <PoweredBy />
        </div>
      </div>

      <TopSection />
    </div>
  );
}
