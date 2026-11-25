import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

// Below this width the sidebar overlays the page and starts closed.
export const MOBILE_BREAKPOINT = 900;

// localStorage can throw (e.g. private mode), so read it defensively.
const readSetting = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (e) {
    return fallback;
  }
};

export const ContextProvider = ({ children }) => {
  // Sidebar starts open on desktop and closed on phones/tablets
  const [activeMenu, setActiveMenu] = useState(() => window.innerWidth > MOBILE_BREAKPOINT);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(() => window.innerWidth);
  // Theme choices are saved by setMode/setColor below; read them back on load
  const [currentColor, setCurrentColor] = useState(() => readSetting("colorMode", "#0497cc"));
  const [currentMode, setCurrentMode] = useState(() => readSetting("themeMode", "dark"));
  const [themeSettings, setThemeSettings] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
