import { useState, useRef, useEffect } from "react";
import NavBar from "./components/NavBar";

export default function App() {
  // Usersettings to change font and color theme
  const [userSettings, setUserSettings] = useState(() => {
    const savedUserSettings = localStorage.getItem("userSettings");
    return savedUserSettings
      ? JSON.parse(savedUserSettings)
      : {
          font: "Sans Serif",
          theme: "light",
        };
  });

  // saving user settings to local storage
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  }, [userSettings]);

  // Reference to font selection pop up menu
  let popUpRef = useRef(null);

  // changing theme
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
          reference={popUpRef}
        />
      </div>
    </div>
  );
}
