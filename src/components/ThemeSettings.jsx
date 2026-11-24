import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

import { themeColors } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } =
    useStateContext();

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-secondary-dark-bg w-full sm:w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">ThemeOptions</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light Mode
            </label>
          </div>

          <div className="mt-4">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark Mode
            </label>
          </div>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">ThemeColors</p>
          <div className="flex flex-wrap gap-3 ml-3 mt-3">
            {/* Native title tooltips: a Syncfusion TooltipComponent that is still open
                when this panel closes after a pick crashes the whole app (blank screen) */}
            {themeColors.map((item) => (
              <button
                key={item.name}
                type="button"
                title={item.name}
                aria-label={item.name}
                className="h-10 w-10 mt-2 rounded-full cursor-pointer flex items-center justify-center hover:drop-shadow-xl"
                style={{ backgroundColor: item.color }}
                onClick={() => setColor(item.color)}
              >
                <BsCheck
                  className={`text-2xl text-white ${
                    item.color === currentColor ? "block" : "hidden"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
