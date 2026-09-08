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

/* A visitor who arrived WITHOUT an assistant's link still gets assistance from the help
   button, so the page opens its own session and puts the reference in the URL before
   init() reads it. `tenant` is not decoration: an unowned session refuses the tenant key
   this journey's assistant authenticates with, so it would be forbidden from reading the
   very session this page just created. Failure is silent — the journey runs fine without
   assistance. */
async function ensureReference() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("cb")) return;
  try {
    const res = await fetch(`${ENDPOINT}/api/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: "perfios-gff-demo", tenant: TENANT }),
    });
    if (!res.ok) return;
    const session = await res.json();
    const code = String(session.key ?? session.sessionId ?? "");
    if (!code) return;
    params.set("cb", code);
    window.history.replaceState(null, "", `${window.location.pathname}?${params}${window.location.hash}`);
  } catch { /* assistance is optional; the journey is not */ }
}

await ensureReference();

CoBrowse.init({
  tenant: TENANT,
  // Passed explicitly: the SDK's own default still names the previous service.
  endpoint: ENDPOINT,
  linkParam: "cb",
});

/* Authoring aid, dev only: CoBrowse.__scanForTest() prints the labels the
   assistant would see for the screen currently rendered, which is what a
   journey flow is written against. Starts nothing. */
if (import.meta.env.DEV) window.CoBrowse = CoBrowse;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
