import { useState } from "react";
import NavBar from "./components/NavBar";

export default function App() {
  const [userSettings, setUserSettings] = useState({
    font: "Sans Serif",
    theme: "light",
  });

  const handleThemeChange = () => {
    setUserSettings({
      ...userSettings,
      theme: userSettings.theme === "light" ? "dark" : "light",
    });
  };

  const handleFontChange = (value) => {
    setUserSettings({ ...userSettings, font: value });
  };
  return (
    <div
      className="app"
      data-font={userSettings.font}
      data-theme={userSettings.theme}
    >
      <div className="wrapper">
        <NavBar
          userSettings={userSettings}
          onThemeChange={handleThemeChange}
          onFontChange={handleFontChange}
        />
      </div>
    </div>
  );
}