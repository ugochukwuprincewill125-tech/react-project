import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ variant = 'default', onSubmitSearch, autoFocus = false }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (onSubmitSearch) {
      onSubmitSearch(trimmed);
      return;
    }
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop');
  }

  return (
    <form className={`searchbar searchbar--${variant}`} onSubmit={handleSubmit} role="search">
      <svg className="searchbar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="searchbar__input"
        placeholder="Search products, categories, brands..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search products"
        autoFocus={autoFocus}
      />
      <button type="submit" className="searchbar__submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
