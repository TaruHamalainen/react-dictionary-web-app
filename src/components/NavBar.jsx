import { useState } from "react";

export default function NavBar({ userSettings, onThemeChange, onFontChange }) {
  const fonts = ["Sans Serif", "Serif", "Mono"];
  const { font, theme } = userSettings;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <header>
      <nav className="navbar">
        <img className="logo" src="logo.svg" alt="logo" />
        <div className="user-settings">
          {/* FONT SELECTION */}
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="user-settings-font"
          >
            <p className="text-s">{font}</p>
            <img src="icon-arrow-down.svg" alt="arrow down icon" />
            {isOpen && (
              <div className="user-setting-font-pop-up">
                <ul className="user-setting-font-pop-up-list">
                  {fonts.map((font, index) => (
                    <li
                      onClick={(e) => onFontChange(e.target.innerHTML)}
                      className="text-s user-setting-font-pop-up-list-item"
                      key={index}
                      data-font={font}
                    >
                      {font}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="user-setting-divider"></div>
          {/* THEME  SELECTION */}
          <div className="user-settings-theme">
            <input
              className="user-settings-theme-input"
              type="checkbox"
              id="theme-toggle"
              onChange={onThemeChange}
            />
            <label
              className="user-settings-theme-label"
              htmlFor="theme-toggle"
            ></label>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                fill="none"
                stroke={theme === "light" ? "#838383" : "#a445ed"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
              />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
}
