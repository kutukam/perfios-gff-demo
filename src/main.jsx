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
   On a link from the assistant (?cb=<code>) this runs at load: the customer was
   sent here to be guided and expects it. Otherwise NOTHING happens until they
   press the help button — a visitor who never asks for help is never asked for
   consent, never publishes a page model, and never sees a control ring itself
   unprompted.

   `tenant` is not decoration. An unowned session refuses the tenant key this
   journey's assistant authenticates with, so it would be forbidden from reading
   the very session this page just opened. */
let started = null;

export function startAssistance() {
  if (started) return started;
  started = (async () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("cb")) {
      try {
        const res = await fetch(`${ENDPOINT}/api/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ site: "perfios-gff-demo", tenant: TENANT }),
        });
        if (res.ok) {
          const session = await res.json();
          const code = String(session.key ?? session.sessionId ?? "");
          if (code) {
            params.set("cb", code);
            window.history.replaceState(
              null, "", `${window.location.pathname}?${params}${window.location.hash}`,
            );
          }
        }
      } catch { /* assistance is optional; the journey is not */ }
    }
    // init() never throws, so a co-browse failure cannot take the journey down.
    return CoBrowse.init({
      tenant: TENANT,
      // Passed explicitly: the SDK's own default still names the previous service.
      endpoint: ENDPOINT,
      linkParam: "cb",
    });
  })();
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

if (cobrowseCode()) void startAssistance();

/* Authoring aid, dev only: CoBrowse.__scanForTest() prints the labels the
   assistant would see for the screen currently rendered, which is what a
   journey flow is written against. Starts nothing. */
if (import.meta.env.DEV) window.CoBrowse = CoBrowse;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
