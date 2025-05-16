import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for: ", query);
    // Implement search logic here
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}> 
        <input
          type="text"
          placeholder="Search records..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;