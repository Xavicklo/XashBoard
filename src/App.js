import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar, ThemeSettings } from "./components";
import Ecommerce from "./pages/Ecommerce";
import { useStateContext, MOBILE_BREAKPOINT } from "./contexts/ContextProvider";
import "./App.css";

// Only the dashboard ships in the first download; every other page is fetched the first
// time it is opened. Syncfusion makes the full bundle ~4 MB, far too slow for a phone.
const Orders = lazy(() => import("./pages/Orders"));
const Employees = lazy(() => import("./pages/Employees"));
const Customers = lazy(() => import("./pages/Customers"));
const Kanban = lazy(() => import("./pages/Kanban"));
const Editor = lazy(() => import("./pages/Editor"));
const Calendar = lazy(() => import("./pages/Calendar"));
const ColorPicker = lazy(() => import("./pages/ColorPicker"));
const Line = lazy(() => import("./pages/Charts/Line"));
const Area = lazy(() => import("./pages/Charts/Area"));
const Bar = lazy(() => import("./pages/Charts/Bar"));
const Pie = lazy(() => import("./pages/Charts/Pie"));
const Financial = lazy(() => import("./pages/Charts/Financial"));
const ColorMapping = lazy(() => import("./pages/Charts/ColorMapping"));
const Pyramid = lazy(() => import("./pages/Charts/Pyramid"));
const Stacked = lazy(() => import("./pages/Charts/Stacked"));

const PageLoading = () => (
  <div className="p-10 text-center text-gray-400">Loading…</div>
);

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
    setActiveMenu,
    screenSize,
  } = useStateContext();

  const isMobile = screenSize <= MOBILE_BREAKPOINT;

  // Syncfusion charts only re-measure on window resize, so after the sidebar opens or
  // closes (which changes the content width without resizing the window) nudge them.
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
    return () => clearTimeout(t);
  }, [activeMenu]);

  return (
    <div className={currentMode === "dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {/* On phones/tablets the open sidebar overlays the page: tap the dark backdrop to close it */}
          {activeMenu && isMobile && (
            <div
              className="fixed inset-0 bg-half-transparent"
              style={{ zIndex: 999 }}
              onClick={() => setActiveMenu(false)}
              aria-hidden="true"
            />
          )}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white" style={{ zIndex: 1000 }}>
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            {/* The navbar is fixed on small screens, so push the content below it */}
            <div className="pt-16 md:pt-0">
              {themeSettings && <ThemeSettings />}

              <Suspense fallback={<PageLoading />}>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
