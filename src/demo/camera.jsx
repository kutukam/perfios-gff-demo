import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/* ============================================================
   The camera, for the liveness step
   ------------------------------------------------------------
   The liveness check is the one screen a demo cannot fake and
   still feel real: the customer has to see themselves. So this
   opens the actual camera, shows the live feed in the frame the
   design drew for it, and freezes a real frame when they stop —
   which is what the confirm screen then shows back to them.

   It lives above the step components because the journey crosses
   four separate steps (start, reading, stop, confirm) and each
   step remounts; the stream and the captured frame have to
   outlive them.

   Nothing leaves the browser. The frame is drawn to a canvas and
   held as a data URL in memory, and the tracks are stopped the
   moment the liveness section is done — the recording light going
   out is part of the demo being honest.
   ============================================================ */

const Ctx = createContext(null);

export function useCamera() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCamera outside CameraProvider");
  return ctx;
}

export function CameraProvider({ children }) {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [capture, setCapture] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  const start = useCallback(async () => {
    if (streamRef.current) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("unsupported");
      return;
    }
    try {
      const got = await navigator.mediaDevices.getUserMedia({
        // Front camera, portrait-ish: the design's window is 430x569.
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = got;
      setStream(got);
      setError(null);
    } catch (e) {
      // Denied, no device, or already in use — the screen falls back to the
      // design's own still, so the journey is never blocked by a camera.
      setError(e?.name || "denied");
    }
  }, []);

  /** Freeze the current frame. Returns a data URL, or null if there is no feed. */
  const snap = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx2d = canvas.getContext("2d");
    // The preview is mirrored, as a selfie view should be. Mirror the capture
    // too, or the still comes back flipped from what they were just looking at.
    ctx2d.translate(canvas.width, 0);
    ctx2d.scale(-1, 1);
    ctx2d.drawImage(video, 0, 0);
    const url = canvas.toDataURL("image/jpeg", 0.9);
    setCapture(url);
    return url;
  }, []);

  const reset = useCallback(() => setCapture(null), []);

  /* Never leave the camera on because a demo was abandoned. */
  useEffect(() => stop, [stop]);

  return (
    <Ctx.Provider value={{ stream, error, capture, videoRef, start, stop, snap, reset }}>
      {children}
    </Ctx.Provider>
  );
}

/* The live feed, sized and positioned exactly where the design puts its
   camera still. Falls back to `fallback` when there is no stream. */
export function CameraView({ stream, videoRef, fallback, style, className }) {
  const ref = videoRef;
  useEffect(() => {
    const el = ref?.current;
    if (el && stream && el.srcObject !== stream) el.srcObject = stream;
  }, [ref, stream]);

  if (!stream) {
    return <img src={fallback} alt="" className={className} style={{ ...style, objectFit: "cover" }} />;
  }
  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted
      aria-label="Camera preview"
      className={className}
      style={{ ...style, objectFit: "cover", transform: "scaleX(-1)", background: "#000" }}
    />
  );
}
