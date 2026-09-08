import { TopSection, Bottom, Button, Icon } from "../components/index.jsx";
import {
  LIVENESS_CAMERA,
  LIVENESS_CAPTURE,
  LIVENESS_LOCATION_BLUR,
} from "../assets/figmaAssets.js";
import { livenessCopy as C } from "../data/journey.js";
import { CameraView } from "../demo/camera.jsx";

function PoweredBy() {
  return <Bottom />;
}

export function LocationAccess({ onAllow, onDeny, hint }) {
  return (
    <div className="screen">
      <img src={LIVENESS_LOCATION_BLUR} alt="" className="location-blur" />
      <TopSection />
      <div className="screen__body screen__body--center">
        <div className="dialog">
          <div className="dialog__body">
            <Icon name="location_on" style={{ fontSize: 20, color: "var(--gray-700)" }} />
            <p style={{ fontSize: 15, lineHeight: 1.35, color: "var(--gray-900)" }}>
              {C.locationTitle}
            </p>
          </div>
          {[C.allow, C.deny].map((l) => (
            <button
              type="button"
              key={l}
              className={`dialog__action${hint === "allow" && l === C.allow ? " hint" : ""}${
                onAllow ? " is-tappable" : ""
              }`}
              onClick={l === C.allow ? onAllow : onDeny}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VideoLiveness({
  stage = "start",
  progress = 0,
  onStart,
  onStop,
  hint,
  stream,
  videoRef,
}) {
  const reading = stage !== "start";
  return (
    <div className="screen screen--white liveness">
      <TopSection />
      <CameraView
        stream={stream}
        videoRef={videoRef}
        fallback={LIVENESS_CAMERA}
        className="liveness__camera"
      />
      <div className="liveness__panel">
        <div className="stack" style={{ width: "100%" }}>
          <div className="liveness__copy">
            {reading ? (
              <>
                <p className="digits">{C.digits}</p>
                <p>{C.stopHint}</p>
              </>
            ) : (
              <>
                <h2>{C.verifyTitle}</h2>
                <p>
                  {C.verifySubA}
                  <span style={{ color: "#d8552f", fontWeight: 600 }}>
                    {C.verifySubHighlight}
                  </span>
                </p>
              </>
            )}
          </div>
          {reading ? (
            <StopButton progress={progress} onClick={onStop} hint={hint === "cta"} />
          ) : (
            <Button label={C.start} onClick={onStart} hint={hint === "cta"} />
          )}
        </div>
        <PoweredBy />
      </div>
    </div>
  );
}

function StopButton({ progress, onClick, hint }) {
  return (
    <div
      className={`stop-btn${hint ? " hint" : ""}${onClick ? " is-tappable" : ""}`}
      onClick={onClick}
      style={{ background: progress ? "rgba(0,80,170,0.45)" : undefined }}
    >
      {progress > 0 && (
        <div className="stop-btn__fill" style={{ width: `${progress * 100}%` }} />
      )}
      <div className="stop-btn__label">
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
        <span>{C.stop}</span>
      </div>
    </div>
  );
}

export function ConfirmVideo({ onRetake, onConfirm, hint, capture }) {
  return (
    <div className="screen screen--white">
      <TopSection />
      <div className="screen__body">
        <div className="liveness__copy">
          <h2>{C.confirmTitle}</h2>
          <p>{C.confirmSub}</p>
        </div>
        <div className="preview">
          <img
            src={capture || LIVENESS_CAPTURE}
            alt={capture ? "The frame just captured from your camera" : ""}
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
        </div>
      </div>
      <div className="liveness__panel">
        <div className="split">
          <Button
            label={C.retake}
            variant="secondary"
            chevron={false}
            onClick={onRetake}
          />
          <Button label={C.confirm} onClick={onConfirm} hint={hint === "cta"} />
        </div>
        <PoweredBy />
      </div>
    </div>
  );
}
