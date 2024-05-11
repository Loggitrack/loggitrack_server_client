"use client";

import { useState, useEffect } from "react";
import { Switch } from "@components/ui/switch";
import { capitalizeString } from "@utils/capitaliseString";

function ThemeSwitch() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mode, setMode] = useState("Light");

  useEffect(() => {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setIsDarkTheme(preferredTheme === "dark");
    setMode(capitalizeString(preferredTheme as string));
    document.body.className = preferredTheme;
  }, []);

  function handleToggleTheme() {
    setIsDarkTheme(!isDarkTheme);
    document.body.className = isDarkTheme ? "light" : "dark";
    setMode(capitalizeString(isDarkTheme ? "light" : ("dark" as string)));
  }

  return (
    <div>
      <span className="mx-2">{mode}</span>
      <Switch
        checked={isDarkTheme}
        onCheckedChange={handleToggleTheme}
        className="mr-4"
      />
    </div>
  );
}

export default ThemeSwitch;
