// Renders the whole app the way an iPhone would: narrow window + iOS user agent.
Object.defineProperty(window, "crypto", { value: require("crypto").webcrypto });
const svgProto = window.SVGElement.prototype;
svgProto.getTotalLength = () => 0;
svgProto.getPointAtLength = () => ({ x: 0, y: 0 });
svgProto.getBBox = () => ({ x: 0, y: 0, width: 10, height: 10 });
svgProto.getComputedTextLength = () => 10;
Object.defineProperty(window.navigator, "userAgent", {
  value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  configurable: true,
});
window.innerWidth = 390;
window.innerHeight = 844;
window.ontouchstart = null;

/* eslint-disable import/first, testing-library/no-unnecessary-act, global-require */
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

test("dashboard renders on a phone", () => {
  const errors = [];
  jest.spyOn(console, "error").mockImplementation((...a) => {
    const m = a.map((x) => (x && x.stack) || String(x)).join(" ");
    if (!m.includes("Not implemented")) errors.push(m);
  });
  const App = require("./App").default;
  const { ContextProvider } = require("./contexts/ContextProvider");
  const root = document.createElement("div");
  document.body.appendChild(root);
  try {
    act(() => { ReactDOM.render(<ContextProvider><App /></ContextProvider>, root); });
  } finally {
    if (errors.length) console.log("ERRORS:\n" + errors.join("\n---\n").slice(0, 3000));
  }
  expect(root.textContent).toContain("Revenue Updates");
});
