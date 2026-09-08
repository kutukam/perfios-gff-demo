import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/app.css";

import { NumberOtp, OtpSheet } from "./screens/auth.jsx";
import { EnterPan, EnterAadhaar } from "./screens/kyc.jsx";
import { DetailsScreen } from "./screens/details.jsx";
import { OfferScreen, OfferTopUp, ExistingLoanSheet } from "./screens/offer.jsx";
import {
  ProcessingScreen,
  TermsScreen,
  ReviewApplication,
} from "./screens/review.jsx";
import {
  LocationAccess,
  VideoLiveness,
  ConfirmVideo,
} from "./screens/liveness.jsx";
import { DepositAccount, ENach, ENachLoading } from "./screens/mandate.jsx";
import { NsdlEsign, NsdlSuccess } from "./screens/esign.jsx";
import {
  Congratulations,
  NotificationBanner,
  MessageThread,
  Tooltip,
} from "./screens/outcome.jsx";
import { Scrim } from "./components/index.jsx";
import { loaders } from "./data/journey.js";
import { useDemo } from "./demo/flow.jsx";

/* ============================================================
   FIT — one phone frame, any screen it is shown on.
   ------------------------------------------------------------
   Every frame is authored at exactly 430 x (its own height) and
   its children are absolutely positioned to Figma's coordinates,
   so the layout cannot reflow without giving up the fidelity the
   whole reimplementation exists for. It scales instead: the frame
   keeps its geometry and the browser draws it larger or smaller
   so the WHOLE phone is visible, on a 360px handset and on an
   iPad alike.

   It must be `transform: scale`, NOT `zoom`. Zoom is tidier —
   it scales the layout box, so nothing has to reserve space by
   hand — but it desynchronises the two coordinate systems the
   co-browse overlay bridges: the SDK reads a target with
   getBoundingClientRect (visual pixels) and places its ring in
   document space using scrollY (layout pixels). Under zoom those
   differ by scrollY x (1 - zoom), and the ring was measured
   landing 130px below the field it was pointing at. A transform
   leaves the viewport-to-document mapping alone, so the ring is
   exact; the cost is reserving the scaled box ourselves, which
   is what `.flow__fit` below does.
   ============================================================ */
const FRAME_W = 430;

/* `fitRef` is the WRAPPER, not the scaled frame. Measuring the frame's own
   parent would measure the box this hook sizes — available width would shrink
   with the scale that shrank it, and the whole thing collapsed to the 0.4
   floor on every screen. Measure the container the wrapper sits in. */
function useFit(fitRef) {
  const [box, setBox] = useState({ fit: 1, h: 932 });

  const measure = useCallback(() => {
    const wrap = fitRef.current;
    const frame = wrap?.querySelector(".screen");
    if (!wrap || !frame) return;
    // offsetHeight is the UNTRANSFORMED box, which is what we scale from.
    const frameH = frame.offsetHeight || 932;
    const availW = (wrap.parentElement?.clientWidth ?? window.innerWidth) - 16;
    /* Measure the harness rather than reserving a guess for it: the title bar
       and the step nav both shrink on small screens, and a fixed allowance
       left the frame needlessly small in landscape. */
    const bar = document.querySelector(".app__bar")?.offsetHeight ?? 56;
    const nav = document.querySelector(".flow__nav")?.offsetHeight ?? 56;
    /* 76 = the stage's own top padding plus the gap the floating nav sits in.
       Without it the frame ended 19px under the nav bar. */
    const availH = window.innerHeight - bar - nav - 76;

    /* On a phone, fill the width and let the page scroll — that is what the
       real journey does, and a frame shrunk to fit the height would be a
       postage stamp inside its own device. On a tablet or a laptop, where the
       demo is being shown TO someone, fit the whole phone on screen instead. */
    const phone = window.innerWidth < 640;
    const fitW = availW / FRAME_W;
    const wanted = phone ? fitW : Math.min(fitW, availH / frameH);

    // Never below a legible floor, and never so large it stops reading as a phone.
    const fit = Math.max(0.4, Math.min(wanted, 1.6));
    setBox((b) => (b.fit === fit && b.h === frameH ? b : { fit, h: frameH }));
  }, [fitRef]);

  useLayoutEffect(measure);
  useEffect(() => {
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [measure]);

  return box;
}

function Stage({ children }) {
  const ref = useRef(null);
  const { fit, h } = useFit(ref);
  return (
    /* The wrapper reserves what the scaled frame actually occupies; the frame
       itself is scaled from its top-left so the two stay in register. */
    <div
      className="flow__fit"
      ref={ref}
      style={{ width: FRAME_W * fit, height: h * fit }}
    >
      <div
        className="flow__stage"
        style={{ transform: `scale(${fit})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

/* A sheet renders over the screen it belongs to, matching how the
   frames are stacked on the Figma canvas. */
function WithSheet({ base, sheet }) {
  return (
    <div className="screen" style={{ height: 932 }}>
      <div style={{ position: "absolute", inset: 0 }}>{base}</div>
      <Scrim />
      {sheet}
    </div>
  );
}

/* Floating overlays are not full frames; centre them on a neutral tile. */
function Overlay({ children, h = 200 }) {
  return (
    <div
      className="screen"
      style={{
        height: h,
        background: "#e7ebf1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

const AADHAAR_FILLED = (
  <EnterAadhaar filled />
);

/* ============================================================
   All 45 frames of section 6031:15453, in journey order.
   ============================================================ */
export const SCREENS = [
  { id: "6031:16381", name: "Number + OTP / Default", el: <NumberOtp /> },
  { id: "6031:16358", name: "Number + OTP / Filled", el: <NumberOtp filled /> },
  { id: "6031:16404", name: "Otp / Default", el: <WithSheet base={<NumberOtp filled />} sheet={<OtpSheet />} /> },
  { id: "6031:16432", name: "Otp / Filled", el: <WithSheet base={<NumberOtp filled />} sheet={<OtpSheet filled />} /> },
  { id: "6031:16460", name: "Enter PAN / Default", el: <EnterPan /> },
  { id: "6031:16498", name: "Enter PAN / Filled", el: <EnterPan filled /> },
  { id: "6031:16479", name: "Enter AADHAAR / Default", el: <EnterAadhaar /> },
  { id: "6031:16521", name: "Enter AADHAAR / Filled", el: <EnterAadhaar filled /> },
  { id: "6031:16418", name: "Aadhaar Otp / Default", el: <WithSheet base={AADHAAR_FILLED} sheet={<OtpSheet aadhaar />} /> },
  { id: "6031:16446", name: "Aadhaar Otp / Filled", el: <WithSheet base={AADHAAR_FILLED} sheet={<OtpSheet aadhaar filled />} /> },
  { id: "6031:16558", name: "Details / PAN AADHAAR", el: <DetailsScreen /> },
  { id: "6031:16775", name: "Details / PAN AADHAAR / Address", el: <DetailsScreen address /> },
  { id: "6031:16815", name: "Details / PAN AADHAAR / Address Filled", el: <DetailsScreen address filled /> },
  { id: "6031:16587", name: "Loader", el: <ProcessingScreen {...loaders.processingDots} /> },
  { id: "6031:15454", name: "Offer Screen", el: <OfferScreen /> },
  { id: "6031:17013", name: "Offer Screen / new", el: <OfferTopUp /> },
  { id: "6031:17039", name: "Offer Screen / new (selected)", el: <OfferTopUp selected /> },
  { id: "6280:30863", name: "Charges", el: <WithSheet base={<OfferTopUp selected />} sheet={<ExistingLoanSheet />} /> },
  { id: "6031:15851", name: "Location Access", el: <LocationAccess /> },
  { id: "6031:15829", name: "Video Liveness 31", el: <VideoLiveness stage="start" /> },
  { id: "6031:15881", name: "Video Liveness 32", el: <VideoLiveness stage="reading" progress={0.15} /> },
  { id: "6031:15919", name: "Video Liveness 33", el: <VideoLiveness stage="reading" /> },
  { id: "6031:15957", name: "Video Liveness 34", el: <ConfirmVideo /> },
  { id: "6031:15997", name: "Video Liveness 36", el: <ProcessingScreen {...loaders.bePatient} /> },
  { id: "6031:15983", name: "Retail Credit Card 29", el: <ProcessingScreen {...loaders.processing} /> },
  { id: "6031:16600", name: "Loading", el: <ProcessingScreen {...loaders.verifying} /> },
  { id: "6031:16204", name: "Review Application", el: <ReviewApplication /> },
  { id: "6031:16855", name: "Loading (e-Mandate)", el: <ProcessingScreen {...loaders.eMandate} /> },
  { id: "6031:16323", name: "Deposite Account / Default", el: <DepositAccount /> },
  { id: "6031:16010", name: "Deposite Account / Pre-Filled", el: <DepositAccount filled /> },
  { id: "6031:16075", name: "E-Nach", el: <ENach /> },
  { id: "6031:16168", name: "E-Nach / Loading", el: <ENachLoading /> },
  { id: "6031:16761", name: "redirecting to enach", el: <ProcessingScreen {...loaders.enachRedirect} /> },
  { id: "6031:16173", name: "Terms", el: <TermsScreen /> },
  { id: "6031:16190", name: "redirecting to nsdl", el: <ProcessingScreen {...loaders.nsdl} /> },
  { id: "6031:16869", name: "nsdl esign 61", el: <NsdlEsign page="aadhaar" /> },
  { id: "6031:16894", name: "nsdl esign 62", el: <NsdlEsign page="aadhaarFilled" /> },
  { id: "6031:16921", name: "nsdl esign 63", el: <NsdlEsign page="otp" /> },
  { id: "6031:16946", name: "nsdl esign 64", el: <NsdlEsign page="otpFilled" /> },
  { id: "6031:16973", name: "nsdl esign 65", el: <NsdlSuccess variant="lottie" /> },
  { id: "6031:16992", name: "nsdl esign 66", el: <NsdlSuccess variant="drawn" /> },
  { id: "6031:16697", name: "Congratulations", el: <Congratulations /> },
  { id: "6031:16641", name: "Congratulations 7", el: <Congratulations disbursed /> },
  { id: "6031:16753", name: "Notification - Collapsed", el: <Overlay h={120}><NotificationBanner /></Overlay> },
  { id: "6031:16613", name: "Message 19", el: <MessageThread /> },
  { id: "tooltip", name: "Tooltip", el: <Overlay h={140}><Tooltip /></Overlay> },
];

/* ============================================================
   Demo view — the interactive walkthrough. Screens are the same
   components the Canvas renders; only the callbacks differ.
   ============================================================ */
function DemoView() {
  const { i, step, view, go, jump, reset, total } = useDemo();
  return (
    <div className="flow">
      <Stage>{view}</Stage>
      <div className="flow__nav" data-cobrowse-ignore>
        <button onClick={() => go(-1)} disabled={i === 0}>
          ‹ Back
        </button>
        <span className="flow__label">
          <b>{step.label}</b>
          <span className="flow__sub">
            {i + 1}/{total} · <code>{step.id}</code>
          </span>
        </span>
        <button onClick={() => go(1)} disabled={i === total - 1}>
          Skip ›
        </button>
        <button onClick={reset}>↺</button>
      </div>
      <div className="flow__progress">
        <span style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("demo");
  const [index, setIndex] = useState(0);
  const current = SCREENS[index];

  return (
    <div className="app">
      {/* the view switcher and the step nav below are this harness, not the
          journey — data-cobrowse-ignore keeps them out of the page model */}
      <header className="app__bar" data-cobrowse-ignore>
        <div className="app__title">
          PA/PQ &lt;&gt; Personal Loan Top Up
          <span className="app__meta">
            6031:15453 · {SCREENS.length} frames · 430px
          </span>
        </div>
        <div className="app__tabs">
          {[
            ["demo", "Demo"],
            ["flow", "Frames"],
            ["canvas", "Canvas"],
          ].map(([v, label]) => (
            <button
              key={v}
              className={`app__tab${view === v ? " is-on" : ""}`}
              onClick={() => setView(v)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {view === "demo" ? (
        <DemoView />
      ) : view === "canvas" ? (
        <div className="canvas">
          {SCREENS.map((s, i) => (
            <figure className="canvas__item" key={s.id + i}>
              <div className="canvas__frame">{s.el}</div>
              <figcaption className="canvas__caption">
                <span>{s.name}</span>
                <code>{s.id}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="flow">
          <Stage>{current.el}</Stage>
          <div className="flow__nav" data-cobrowse-ignore>
            <button onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              ‹ Prev
            </button>
            <span className="flow__label">
              {index + 1}/{SCREENS.length} · {current.name} <code>{current.id}</code>
            </span>
            <button
              onClick={() => setIndex((i) => Math.min(SCREENS.length - 1, i + 1))}
              disabled={index === SCREENS.length - 1}
            >
              Next ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
