// Regression tests: changing the theme colour or mode used to blank the whole app,
// because Syncfusion's Sparkline crashed when its colour props updated in place.

// jsdom lacks a few browser APIs that Syncfusion charts call
Object.defineProperty(window, "crypto", { value: require("crypto").webcrypto });
const svgProto = window.SVGElement.prototype;
svgProto.getTotalLength = () => 0;
svgProto.getPointAtLength = () => ({ x: 0, y: 0 });
svgProto.getBBox = () => ({ x: 0, y: 0, width: 10, height: 10 });
svgProto.getComputedTextLength = () => 10;

/* eslint-disable import/first, testing-library/no-unnecessary-act, testing-library/no-render-in-setup */
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";

jest.useFakeTimers();

let root;
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // jsdom "not implemented" noise
  localStorage.clear();
  root = document.createElement("div");
  document.body.appendChild(root);
  act(() => {
    ReactDOM.render(<ContextProvider><App /></ContextProvider>, root);
  });
  // open the settings panel with the gear button in the bottom-right corner
  act(() => { root.querySelector(".fixed.right-4 button").click(); });
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
  root.remove();
  console.error.mockRestore();
});

const hoverThenClick = (el) => {
  act(() => {
    ["mouseenter", "mouseover", "mousemove"].forEach((t) =>
      el.dispatchEvent(new MouseEvent(t, { bubbles: true, clientX: 5, clientY: 5 })));
    jest.advanceTimersByTime(1000);
  });
  act(() => { el.click(); });
  act(() => { jest.advanceTimersByTime(2000); });
};

test("picking a theme colour keeps the dashboard on screen", () => {
  const swatch = root.querySelector('button[aria-label="Red"]');
  expect(swatch).toBeTruthy();
  hoverThenClick(swatch);
  expect(root.textContent).toContain("Revenue Updates");
  expect(localStorage.getItem("colorMode")).toBe("#FF1517");
});

test("switching to light mode keeps the dashboard on screen", () => {
  hoverThenClick(root.querySelector("#light"));
  expect(root.textContent).toContain("Revenue Updates");
  expect(localStorage.getItem("themeMode")).toBe("light");
});
