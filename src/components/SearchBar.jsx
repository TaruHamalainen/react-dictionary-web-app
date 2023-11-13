export default function SearchBar({ onFetchData, onQueryChange, query }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onFetchData();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button className="search-btn">
        <img src="icon-search.svg" alt="search icon" />
      </button>
    </form>
  );
}
