import { useState } from "react";

export default function SearchBar({ onFetchData }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      setError(true);
      return;
    }

    setError(false);

    onFetchData(input);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className={`search-bar-input${error ? " error" : ""}`}
        type="text"
        placeholder="Search for any word..."
        onChange={(e) => setInput(e.target.value)}
      />
      {error && (
        <p className="search-error-text text-m">Whoops, can’t be empty…</p>
      )}

      <button className="search-btn">
        <img src="icon-search.svg" alt="search icon" />
      </button>
    </form>
  );
}
