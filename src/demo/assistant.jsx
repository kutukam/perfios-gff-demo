import { useCallback, useRef, useState } from "react";
import { cobrowseCode, startAssistance } from "../main.jsx";
import {
  BrowserAudioInterface,
  ConversationAgent,
  InteractionType,
} from "sarvam-conv-ai-sdk/browser";

/* ============================================================
   The help button
   ------------------------------------------------------------
   A small control on the page: press it and the Perfios voice
   assistant joins, sees the screen through the co-browse session
   this page already holds, and guides the rest of the journey.

   The Sarvam API key NEVER reaches this bundle. The page asks the
   worker for a short-lived session token and sends every runtime
   call through /api/sarvam/*, which injects the key server-side —
   the same path the Chrome extension uses. A key in a public
   page's JavaScript is a key anyone can spend.
   ============================================================ */

const WORKER = "https://cobrowse-do.harshkhandelwal8553.workers.dev";

/* Values from the agent's Deploy-with-code panel. `version` is pinned on
   purpose: Samvaad serves the older committed default when it is unset, which
   presents as a 404 "App not found for the interaction type" or, worse, as a
   different agent answering. Re-pin after every commit. */
const AGENT = {
  orgId: "019ec301-92a0-7a28-846c-b1afafcdf30d",
  workspaceId: "019ec301-92a7-7f33-81f2-14326ae2265e",
  appId: "Personal-Lo-f35cc29d-0234",
  version: 5,
};

/* Committing on the dashboard mints a NEW version, and a pin left behind keeps
   serving the old one — the tools you just fixed sit in v4 while the page still
   calls v3, and it fails in exactly the way it did before, which reads as "the
   fix did nothing". `?v=4` overrides the pin so a commit can be tested without
   a redeploy; the constant above is still what a plain visit gets. */
function agentVersion() {
  try {
    const v = Number(new URLSearchParams(window.location.search).get("v"));
    return Number.isInteger(v) && v > 0 ? v : AGENT.version;
  } catch {
    return AGENT.version;
  }
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* Marks the page as being guided. It does NOT draw anything: the ring is
   co-browse's, so that there is exactly one highlight and the agent narrates
   the control it is actually on. This is here for styling that depends on a
   live session — and so the state is inspectable. */
function setGuided(on) {
  try {
    document.documentElement.classList.toggle("is-guided", on);
  } catch { /* nothing to do if the document is gone */ }
}

/** The co-browse code this page was opened with, so the agent can see the screen. */
export function AssistantButton() {
  const [state, setState] = useState("idle"); // idle | connecting | live | error
  const [error, setError] = useState("");
  const agentRef = useRef(null);

  const stop = useCallback(async () => {
    const agent = agentRef.current;
    agentRef.current = null;
    setGuided(false);
    setState("idle");
    if (agent) {
      // Never let a stalled teardown freeze the button.
      try { await Promise.race([agent.stop(), wait(4000)]); } catch { /* already gone */ }
    }
  }, []);

  const start = useCallback(async () => {
    setError("");
    setState("connecting");
    try {
      // Open the screen session FIRST. Starting the voice agent before there is a
      // session puts it on the line with no idea what the customer is looking at,
      // which reads to them as a broken assistant rather than a missing session.
      await startAssistance();

      const res = await fetch(`${WORKER}/api/extension/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `scope` picks which Sarvam org's key the worker injects; this agent
        // lives in its own org and the default key would 404 against it.
        body: JSON.stringify({ scope: "perfios" }),
      });
      if (!res.ok) throw new Error(`session ${res.status}`);
      const s = await res.json();

      const agent = new ConversationAgent({
        apiKey: "",
        /* Required for a CALL interaction — without it the SDK refuses to
           start with "audioInterface is required for CALL interactions". It
           owns the microphone and the playback path. */
        audioInterface: new BrowserAudioInterface(),
        baseUrl: `${WORKER}/api/sarvam/`,
        platform: "browser",
        customHeaders: {
          Authorization: `Bearer ${s.token}`,
          "X-User-Id": s.user_id,
          "X-Session-Id": s.session_id,
        },
        config: {
          org_id: AGENT.orgId,
          workspace_id: AGENT.workspaceId,
          app_id: AGENT.appId,
          version: agentVersion(),
          user_identifier: s.session_id,
          user_identifier_type: "custom",
          interaction_type: InteractionType.CALL,
          input_sample_rate: 16000,
          output_sample_rate: 16000,
          /* Language, voice and pace belong to the published agent version —
             overriding them here made extension calls behave unlike dashboard
             calls, so nothing is forced. */
          agent_variables: {
            // What lets the agent SEE this screen. Without it every screen tool
            // answers session_unavailable and it guides blind.
            cobrowse_code: cobrowseCode(),
          },
        },
      });
      agentRef.current = agent;

      // A blocked or undecided mic permission would otherwise sit on
      // "Connecting…" forever.
      await Promise.race([
        agent.start(),
        wait(12000).then(() => { throw new Error("__mic_timeout__"); }),
      ]);
      const live = await agent.waitForConnect(8);
      if (!live) throw new Error("The assistant did not answer. Try again.");
      setGuided(true);
      setState("live");
    } catch (e) {
      const raw = String(e?.message ?? e);
      setError(
        raw === "__mic_timeout__"
          ? "Allow microphone access, then tap again."
          : /failed to fetch/i.test(raw)
            ? "Could not reach the assistant service."
            : raw
      );
      setState("error");
      await stop();
      setState("error");
    }
  }, [stop]);

  const live = state === "live";
  const busy = state === "connecting";

  return (
    <div className="assist" data-cobrowse-ignore>
      {error && <p className="assist__error">{error}</p>}
      <button
        type="button"
        className={`assist__btn${live ? " is-live" : ""}${busy ? " is-busy" : ""}`}
        onClick={live ? stop : busy ? undefined : start}
        aria-label={live ? "End assistance" : "Talk to an assistant"}
        title={live ? "End assistance" : "Talk to an assistant"}
      >
        {live ? (
          <span className="assist__bars" aria-hidden="true">
            <i /><i /><i />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
