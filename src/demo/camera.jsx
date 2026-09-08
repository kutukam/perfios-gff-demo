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

/* Ordered best-first; Safari only takes the last one. */
const CLIP_TYPES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
  "video/mp4",
];

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
  const [clip, setClip] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const clipRef = useRef(null);

  const dropClip = useCallback(() => {
    if (clipRef.current) {
      try { URL.revokeObjectURL(clipRef.current); } catch { /* already gone */ }
    }
    clipRef.current = null;
    setClip(null);
  }, []);

  /**
   * Record, and RESOLVE ONLY ONCE THE CLIP EXISTS.
   *
   * `MediaRecorder.stop()` returns straight away; the blob is assembled in `onstop`, a
   * task later. Anything that navigates in the same tick as the stop sees no clip at
   * all — which is exactly how the sibling KYC journey ended up showing a stand-in
   * picture on its "confirm your video" screen for every customer who ever used it.
   */
  const record = useCallback(() => {
    const live = streamRef.current;
    if (!live || typeof MediaRecorder === "undefined") return;
    const type = CLIP_TYPES.find((c) => MediaRecorder.isTypeSupported?.(c));
    let recorder;
    try {
      recorder = new MediaRecorder(live, type ? { mimeType: type } : undefined);
    } catch {
      return;                       // no recorder: the still is still captured on stop
    }
    chunksRef.current = [];
    recorder.ondataavailable = (e) => { if (e.data?.size) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      try {
        dropClip();
        if (chunksRef.current.length) {
          const url = URL.createObjectURL(
            new Blob(chunksRef.current, { type: recorder.mimeType || "video/webm" }),
          );
          clipRef.current = url;
          setClip(url);
        }
      } catch { /* the confirm screen falls back to the still frame */ }
      chunksRef.current = [];
    };
    recorderRef.current = recorder;
    try { recorder.start(); } catch { recorderRef.current = null; }
  }, [dropClip]);

  const stopRecording = useCallback(() => {
    const recorder = recorderRef.current;
    recorderRef.current = null;
    if (!recorder || recorder.state !== "recording") return Promise.resolve();
    return new Promise((resolve) => {
      let settled = false;
      const done = () => { if (!settled) { settled = true; resolve(); } };
      // `onstop` above was assigned first, so it runs first and the clip is ready here.
      recorder.addEventListener("stop", done, { once: true });
      // A recorder that never reports back must not strand the customer on this screen.
      const guard = setTimeout(done, 1500);
      try { recorder.stop(); } catch { clearTimeout(guard); done(); }
    });
  }, []);

  const stop = useCallback(() => {
    stopRecording();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStream(null);
  }, [stopRecording]);

  const start = useCallback(async () => {
    if (streamRef.current) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("unsupported");
      return;
    }
    try {
      // Front camera, portrait-ish: the design's window is 430x569. Audio matters here
      // — the customer is asked to read four digits ALOUD, so a liveness clip without
      // sound proves half of what the step exists to prove. A machine with no
      // microphone still works: it falls back to video only rather than failing shut.
      const video = { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } };
      const got = await navigator.mediaDevices
        .getUserMedia({ video, audio: true })
        .catch(() => navigator.mediaDevices.getUserMedia({ video, audio: false }));
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

  const reset = useCallback(() => { setCapture(null); dropClip(); }, [dropClip]);

  /* Never leave the camera on because a demo was abandoned. */
  useEffect(() => stop, [stop]);

  return (
    <Ctx.Provider
      value={{ stream, error, capture, clip, videoRef, start, stop, snap, reset, record, stopRecording }}
    >
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
