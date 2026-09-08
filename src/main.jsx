import React from "react";
import { createRoot } from "react-dom/client";
import CoBrowse from "@creditnirvana/cobrowse";
import App from "./App.jsx";

/* ============================================================
   Co-browse
   ------------------------------------------------------------
   The assistant sees the STRUCTURE of the page — labels, roles,
   which controls are filled — never their contents, and rings
   the control the flow engine says is next.

   Assistance starts either from a link the assistant sent or
   from the help button, and both prompt for consent first —
   nothing happens without it. init() never throws, so a
   co-browse failure cannot take the journey down.

   VITE_COBROWSE_ENDPOINT points at a local worker during flow
   authoring; unset, it uses the managed endpoint.
   ============================================================ */
const TENANT = import.meta.env.VITE_COBROWSE_TENANT ?? "perfios";
const ENDPOINT = import.meta.env.VITE_COBROWSE_ENDPOINT || "https://cobrowse-do.harshkhandelwal8553.workers.dev";

/* Start assistance, and not one moment sooner.
   ------------------------------------------------------------
   NOTHING happens until the customer presses the help button — no session, no
   consent prompt, no page model, no ring. An assistant's ?cb= link changes only
   where the session comes from (the URL rather than a fresh mint), never when
   assistance begins.

   `tenant` is not decoration. An unowned session refuses the tenant key this
   journey's assistant authenticates with, so it would be forbidden from reading
   the very session this page just opened. */
let started = null;
let handle = null;

export function startAssistance() {
  if (started) return started;
  started = (async () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("cb")) {
      const res = await fetch(`${ENDPOINT}/api/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: "perfios-gff-demo", tenant: TENANT }),
      });
      if (!res.ok) throw new Error("Screen assistance could not connect. Please try again.");
      const session = await res.json();
      const code = String(session.key ?? session.sessionId ?? "");
      if (!code) throw new Error("Screen assistance could not connect. Please try again.");
      params.set("cb", code);
      window.history.replaceState(
        null, "", `${window.location.pathname}?${params}${window.location.hash}`,
      );
    }

    /* Resolve when the session is genuinely LIVE, not merely requested.
       ----------------------------------------------------------------
       init() returns as soon as consent has been ASKED for. Starting the voice
       agent on that puts it on the line while the customer is still reading the
       consent dialog: its first look at the screen finds nothing, and it opens
       the call by saying it cannot see them. Waiting for onSessionStart means
       the assistant only ever speaks once there is something to speak about. */
    return await new Promise((resolve, reject) => {
      let settled = false;
      const done = () => { if (!settled) { settled = true; resolve(); } };
      const fail = (message) => {
        if (settled) return;
        settled = true;
        started = null;                      // a second press is a fresh attempt
        reject(new Error(message));
      };
      CoBrowse.init({
        tenant: TENANT,
        // Passed explicitly: the SDK's own default still names the previous service.
        endpoint: ENDPOINT,
        linkParam: "cb",
        onSessionStart: done,
        onError: (e) => fail(
          e?.code === "consent_declined"
            ? "Guided assistance was not started."
            : "Screen assistance could not connect. Please try again.",
        ),
      }).then((h) => {
        handle = h;
        if (h?.status() === "active") done();
      });
    });
  })();
  started.catch(() => {});
  return started;
}

/** The code the assistant needs in order to see this screen. */
export function cobrowseCode() {
  try {
    return (new URLSearchParams(window.location.search).get("cb") ?? "").split("_")[0] || "";
  } catch {
    return "";
  }
}

/* Nothing starts on load, not even on an assistant's ?cb= link. Arriving on a link
   still skips minting a session — startAssistance() binds to the one in the URL — but
   the customer presses the microphone first either way, so a page never watches itself
   being highlighted by something the person on it did not ask for. */

/* Authoring aid, dev only: CoBrowse.__scanForTest() prints the labels the
   assistant would see for the screen currently rendered, which is what a
   journey flow is written against. Starts nothing. */
if (import.meta.env.DEV) window.CoBrowse = CoBrowse;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
