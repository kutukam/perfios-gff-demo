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

   Assistance only ever starts from a link the assistant sent:
   arriving with ?cb=<code> prompts the customer for consent,
   and nothing happens without it. init() never throws, so a
   co-browse failure cannot take the journey down.

   VITE_COBROWSE_ENDPOINT points at a local worker during flow
   authoring; unset, it uses the managed endpoint.
   ============================================================ */
CoBrowse.init({
  tenant: import.meta.env.VITE_COBROWSE_TENANT ?? "perfios",
  endpoint: import.meta.env.VITE_COBROWSE_ENDPOINT || undefined,
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
