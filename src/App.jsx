import { useState, useRef, useEffect } from "react";
import NavBar from "./components/NavBar";
import Word from "./components/Word";
import SearchBar from "./components/SearchBar";

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

  const [wordData, setWordData] = useState("");
  const [query, setQuery] = useState("cat");

  const fetchWordData = async () => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
    const response = await fetch(URL);
    const data = await response.json();
    setWordData(data);
  };

  useEffect(() => {
    fetchWordData();
  }, []);

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

  // Changing font
  const handleFontChange = (value) => {
    setUserSettings({ ...userSettings, font: value });
  };

  const handleQueryChange = (value) => {
    setQuery(value);
  };

  if (!wordData) return null;

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

        <SearchBar
          onFetchData={fetchWordData}
          onQueryChange={handleQueryChange}
          query={query}
        />

        {wordData.map((data, index) => (
          <Word key={index} wordData={data} allWords={wordData} index={index} />
        ))}
      </div>
    </div>
  );
}
