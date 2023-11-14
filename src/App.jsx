import { useState, useRef, useEffect } from "react";
import NavBar from "./components/NavBar";
import Word from "./components/Word";
import SearchBar from "./components/SearchBar";

export default function App() {
  // Usersettings to change font and color theme. If localstorage has settings saved
  // Get settings from localstorage. else use default settings
  const [userSettings, setUserSettings] = useState(() => {
    const savedUserSettings = localStorage.getItem("userSettings");
    return savedUserSettings
      ? JSON.parse(savedUserSettings)
      : {
          font: "Sans Serif",
          theme: "light",
        };
  });

  // array of word objects, fetching from dictionary API
  const [wordData, setWordData] = useState(null);

  // Users input, used as parameter in API to fetch word objects
  const [query, setQuery] = useState("keyboard");

  const [error, setError] = useState(false);

  // Fetching data from API
  const fetchWordData = async (data) => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (response.ok) {
        setWordData(data);
        setError(false);
      } else {
        setWordData(null);
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  // On first load, fetching data for word 'keyboard'
  // to show on page
  useEffect(() => {
    fetchWordData(query);
  }, []);

  // saving user settings to local storage when usersettings is changed
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

  // Changing query pased on user input
  const handleQueryChange = (value) => {
    setQuery(value);
  };

  // if (!wordData) return null;

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

        {error && (
          <div className="error-element">
            <p className="heading-l">😔</p>
            <h2 className="error-heading heading-m">No Definitions Found</h2>
            <p className="text-m error-text">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </p>
          </div>
        )}

        {!error &&
          wordData &&
          wordData.map((data, index) => (
            <Word
              key={index}
              wordData={data}
              allWords={wordData}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}
