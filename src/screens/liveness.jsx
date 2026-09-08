import { useEffect, useRef, useState } from "react";
import { TopSection, Bottom, Button, Icon } from "../components/index.jsx";
import { livenessCopy as C } from "../data/journey.js";
import { CameraView } from "../demo/camera.jsx";
import { FACE_PLACEHOLDER, SCREEN_BACKDROP } from "../demo/placeholder.js";

function PoweredBy() {
  return <Bottom />;
}

export function LocationAccess({ onAllow, onDeny, hint }) {
  return (
    <div className="screen">
      <img src={SCREEN_BACKDROP} alt="" className="location-blur" />
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
        fallback={FACE_PLACEHOLDER}
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
      role="button"
      tabIndex={0}
      aria-label="Stop"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); }
      }}
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

/**
 * The video that was actually recorded — not a picture of one.
 *
 * The play button here used to be decoration: a round icon painted over a still, above
 * a clip that was recorded and then never shown to anybody. It plays the real thing
 * now, and only falls back to the frozen frame (and then to a drawn placeholder) when
 * there is no clip to play, which means there was no camera to record it with.
 */
function Preview({ clip, capture }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const sync = () => setPlaying(!el.paused && !el.ended);
    ["play", "pause", "ended"].forEach((e) => el.addEventListener(e, sync));
    return () => ["play", "pause", "ended"].forEach((e) => el.removeEventListener(e, sync));
  }, [clip]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused || el.ended) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <div className="preview">
      {clip ? (
        <video ref={ref} src={clip} playsInline preload="metadata" aria-label="The video you just recorded" />
      ) : (
        <img
          src={capture || FACE_PLACEHOLDER}
          alt={capture ? "The frame just captured from your camera" : ""}
        />
      )}
      {/* Only offer to play something there is something to play. A play button over a
          still frame is the decoration this screen used to ship. */}
      {clip && (
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause the video" : "Play the video"}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 40,
          height: 40,
          padding: 0,
          border: "none",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: playing ? 0 : 1,
          transition: "opacity .15s",
        }}
      >
        <Icon name="play_arrow" filled style={{ fontSize: 22, color: "#212121" }} />
      </button>
      )}
    </div>
  );
}

export function ConfirmVideo({ onRetake, onConfirm, hint, capture, clip }) {
  return (
    <div className="screen screen--white">
      <TopSection />
      <div className="screen__body">
        <div className="liveness__copy">
          <h2>{C.confirmTitle}</h2>
          <p>{C.confirmSub}</p>
        </div>
        <Preview clip={clip} capture={capture} />
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
