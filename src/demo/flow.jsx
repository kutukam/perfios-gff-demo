import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { NumberOtp, OtpSheet } from "../screens/auth.jsx";
import { EnterPan, EnterAadhaar } from "../screens/kyc.jsx";
import { DetailsScreen } from "../screens/details.jsx";
import { OfferScreen, OfferTopUp, ExistingLoanSheet } from "../screens/offer.jsx";
import {
  ProcessingScreen,
  TermsScreen,
  ReviewApplication,
} from "../screens/review.jsx";
import { LocationAccess, VideoLiveness, ConfirmVideo } from "../screens/liveness.jsx";
import { DepositAccount, ENach, ENachLoading } from "../screens/mandate.jsx";
import { NsdlEsign, NsdlSuccess } from "../screens/esign.jsx";
import { Congratulations } from "../screens/outcome.jsx";
import { Scrim } from "../components/index.jsx";
import {
  applicant,
  depositFields as D,
  details as detailsData,
  loaders,
  nsdlChrome as N,
} from "../data/journey.js";

/* ============================================================
   The demo script
   ------------------------------------------------------------
   One entry per interactive state, in journey order. Each entry
   gets `go` (advance) and returns the screen with its callbacks
   bound, plus a `hint` naming which control should pulse.

   `wait` marks a step that advances on its own after n ms —
   the loader screens, which have nothing to tap.

   Steps with a form own their typed state through one of the
   Live* wrappers below: tap the field and it fills with the demo
   value, or type your own. Either way the CTA unlocks and the
   step advances — nothing is validated, this is a demo.

   To extend: insert an entry, or point a callback at another
   step's id to branch. Screens themselves stay presentational.
   ============================================================ */

function sheetOver(base, sheet) {
  return (
    <div className="screen" style={{ height: 932 }}>
      <div style={{ position: "absolute", inset: 0 }}>{base}</div>
      <Scrim />
      {sheet}
    </div>
  );
}

/* --- live steps: field state lives here, screens stay dumb ---- */

function LiveMobile({ go }) {
  const [v, setV] = useState("");
  return (
    <NumberOtp
      value={v}
      onChange={setV}
      onFill={() => setV(applicant.mobileEntry)}
      onNext={go}
      hint={v ? "cta" : "field"}
    />
  );
}

function LiveOtp({ go, base, aadhaar = false }) {
  const [v, setV] = useState("");
  return sheetOver(
    base,
    <OtpSheet
      aadhaar={aadhaar}
      value={v}
      onChange={setV}
      onFill={() => setV(applicant.otp)}
      onNext={go}
      hint={v ? "cta" : "field"}
    />
  );
}

function LivePan({ go }) {
  const [v, setV] = useState("");
  return (
    <EnterPan
      value={v}
      onChange={setV}
      onFill={() => setV(applicant.pan)}
      onNext={go}
      hint={v ? "cta" : "field"}
    />
  );
}

function LiveAadhaar({ go }) {
  const [v, setV] = useState("");
  return (
    <EnterAadhaar
      value={v}
      onChange={setV}
      onFill={() => setV(applicant.aadhaarFull)}
      onNext={go}
      hint={v ? "cta" : "field"}
    />
  );
}

function LiveAddress({ go }) {
  const [vals, setVals] = useState({});
  const any = detailsData.form.some((f) => vals[f.label]);
  return (
    <DetailsScreen
      address
      values={vals}
      onChangeField={(k, v) => setVals((p) => ({ ...p, [k]: v }))}
      /* fills the blanks and leaves anything already typed alone */
      onFill={() =>
        setVals((p) =>
          Object.fromEntries(
            detailsData.form.map((f) => [f.label, p[f.label] || f.value])
          )
        )
      }
      onNext={go}
      hint={any ? "cta" : "field"}
    />
  );
}

function LiveDeposit({ go }) {
  const [vals, setVals] = useState({});
  return (
    <DepositAccount
      values={vals}
      onChangeField={(k, v) => setVals((p) => ({ ...p, [k]: v }))}
      onFill={() =>
        setVals((p) => ({
          ifsc: p.ifsc || D.ifsc.value,
          account: p.account || D.confirm.value,
          confirm: p.confirm || D.confirm.value,
        }))
      }
      onNext={go}
      hint={vals.ifsc ? "cta" : "field"}
    />
  );
}

/* The NSDL page is a raster: the VID/Aadhaar box and the Send OTP
   pill are both overlays. Filling the box and pressing the pill are
   two separate actions on one page — the pill does nothing while the
   box is empty, so it can no longer double as "fill it for me". */
function LiveNsdl({ go, page }) {
  const [v, setV] = useState("");
  return (
    <NsdlEsign
      page={page}
      value={v}
      onChange={setV}
      onFill={() => setV(page === "otp" ? N.otp : applicant.aadhaarFull)}
      onAction={go}
      hint={v ? "cta" : "field"}
    />
  );
}

export const SCRIPT = [
  /* --- mobile + OTP ------------------------------------------ */
  {
    id: "6031:16381",
    label: "Enter your mobile number, then Get OTP",
    render: (go) => <LiveMobile go={go} />,
  },
  {
    id: "6031:16404",
    label: "Enter the OTP, then Submit",
    render: (go) => <LiveOtp go={go} base={<NumberOtp filled />} />,
  },

  /* --- PAN --------------------------------------------------- */
  {
    id: "6031:16460",
    label: "Enter your PAN, then Next",
    render: (go) => <LivePan go={go} />,
  },

  /* --- Aadhaar ----------------------------------------------- */
  {
    id: "6031:16479",
    label: "Enter your Aadhaar, then Next",
    render: (go) => <LiveAadhaar go={go} />,
  },
  {
    id: "6031:16418",
    label: "Enter the Aadhaar OTP, then Submit",
    render: (go) => (
      <LiveOtp go={go} aadhaar base={<EnterAadhaar filled />} />
    ),
  },
  {
    id: "6031:16587",
    label: "Fetching KYC…",
    wait: 1800,
    render: () => <ProcessingScreen {...loaders.processingDots} />,
  },

  /* --- details + address ------------------------------------- */
  {
    id: "6031:16558",
    label: "Details fetched — toggle a different address, or tap Next",
    render: (go, jump) => (
      <DetailsScreen
        onToggle={go}
        onNext={() => jump("6031:15454")}
        hint="toggle"
      />
    ),
  },
  {
    id: "6031:16775",
    label: "Fill in your current address, then Save and Next",
    render: (go) => <LiveAddress go={go} />,
  },
  {
    id: "6031:16600",
    label: "Verifying…",
    wait: 1800,
    render: () => <ProcessingScreen {...loaders.verifying} />,
  },

  /* --- offer ------------------------------------------------- */
  {
    id: "6031:15454",
    label: "Offer received — tap Next",
    render: (go) => <OfferScreen onNext={go} hint="cta" />,
  },
  {
    id: "6031:17013",
    label: "Pick the top-up option",
    render: (go) => <OfferTopUp onSelect={go} hint="option" />,
  },
  {
    id: "6031:17039",
    label: "Tap ⓘ for the existing loan, or Next to continue",
    render: (go, jump) => (
      <OfferTopUp
        selected
        onInfo={go}
        onNext={() => jump("6031:15851")}
        hint="cta"
      />
    ),
  },
  {
    id: "6280:30863",
    label: "Close the sheet",
    render: (go) =>
      sheetOver(
        <OfferTopUp selected />,
        <ExistingLoanSheet onClose={() => go(-1)} />
      ),
  },

  /* --- active liveness --------------------------------------- */
  {
    id: "6031:15851",
    label: "Allow location access",
    render: (go) => <LocationAccess onAllow={go} onDeny={go} hint="allow" />,
  },
  {
    id: "6031:15829",
    label: "Tap Start to record",
    render: (go) => <VideoLiveness stage="start" onStart={go} hint="cta" />,
  },
  {
    id: "6031:15881",
    label: "Read the digits aloud…",
    wait: 1400,
    render: () => <VideoLiveness stage="reading" progress={0.15} />,
  },
  {
    id: "6031:15919",
    label: "Tap Stop when done",
    render: (go) => (
      <VideoLiveness stage="reading" progress={0.85} onStop={go} hint="cta" />
    ),
  },
  {
    id: "6031:15957",
    label: "Confirm the captured video",
    render: (go, jump) => (
      <ConfirmVideo
        onConfirm={go}
        onRetake={() => jump("6031:15829")}
        hint="cta"
      />
    ),
  },
  {
    id: "6031:15997",
    label: "Please be patient…",
    wait: 1800,
    render: () => <ProcessingScreen {...loaders.bePatient} />,
  },

  /* --- key fact statement ------------------------------------ */
  {
    id: "6031:16204",
    label: "Review the Key Fact Statement, then Proceed",
    render: (go) => <ReviewApplication onNext={go} hint="cta" />,
  },
  {
    id: "6031:16855",
    label: "Redirecting to e-Mandate…",
    wait: 1800,
    render: () => <ProcessingScreen {...loaders.eMandate} />,
  },

  /* --- deposit account + mandate ----------------------------- */
  {
    id: "6031:16323",
    label: "Fill in the deposit account, then Submit",
    render: (go) => <LiveDeposit go={go} />,
  },
  {
    id: "6031:16075",
    label: "Submit the mandate",
    render: (go) => <ENach onSubmit={go} hint="cta" />,
  },
  {
    id: "6031:16168",
    label: "Creating the mandate…",
    wait: 1800,
    render: () => <ENachLoading />,
  },
  {
    id: "6031:16761",
    label: "Processing…",
    wait: 1500,
    render: () => <ProcessingScreen {...loaders.enachRedirect} />,
  },

  /* --- terms + e-sign ---------------------------------------- */
  {
    id: "6031:16173",
    label: "Accept the terms",
    render: (go) => <TermsScreen onNext={go} hint="cta" />,
  },
  {
    id: "6031:16190",
    label: "Connecting to NSDL…",
    wait: 1800,
    render: () => <ProcessingScreen {...loaders.nsdl} />,
  },
  {
    id: "6031:16869",
    label: "Fill the VID/Aadhaar box, then Send OTP",
    render: (go) => <LiveNsdl go={go} page="aadhaar" />,
  },
  {
    id: "6031:16921",
    label: "Fill the OTP box, then Verify OTP",
    render: (go) => <LiveNsdl go={go} page="otp" />,
  },
  {
    id: "6031:16973",
    label: "Signed — tap Go Back",
    render: (go) => <NsdlSuccess variant="lottie" onBack={go} hint="cta" />,
  },

  /* --- outcome ----------------------------------------------- */
  {
    id: "6031:16697",
    label: "Application in process",
    wait: 2600,
    render: () => <Congratulations />,
  },
  {
    id: "6031:16641",
    label: "Disbursed — end of journey",
    render: () => <Congratulations disbursed />,
  },
];

/* ============================================================
   useDemo — drives the script. `go()` advances one step, `go(-1)`
   steps back (used by the sheet close), `jump(id)` branches to a
   named step. Ids rather than indices, so inserting a step can't
   silently redirect a branch.
   ============================================================ */
export function useDemo() {
  const [i, setI] = useState(0);

  const jump = useCallback((id) => {
    const n = SCRIPT.findIndex((s) => s.id === id);
    if (n >= 0) setI(n);
  }, []);
  const go = useCallback(
    (delta) =>
      setI((n) =>
        Math.max(
          0,
          Math.min(
            SCRIPT.length - 1,
            n + (typeof delta === "number" ? delta : 1)
          )
        )
      ),
    []
  );

  const step = SCRIPT[i];

  /* loader steps advance themselves */
  useEffect(() => {
    if (!step.wait) return;
    const t = setTimeout(() => go(1), step.wait);
    return () => clearTimeout(t);
  }, [i, step.wait, go]);

  /* keyed on the step, so a step's typed state is discarded when the
     journey moves on — and Back gives you an empty form again. */
  const view = useMemo(
    () => <Fragment key={step.id}>{step.render(go, jump)}</Fragment>,
    [step, go, jump]
  );

  return { i, step, view, go, jump, reset: () => setI(0), total: SCRIPT.length };
}
