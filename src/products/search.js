import React, { useState } from 'react';

const SearchBar = ({ setQuery }) => {
  const [localQuery, setLocalQuery] = useState('');

  const search = (event) => {
    event.preventDefault();
    setQuery(localQuery); // Atualizar a consulta no componente ProductTable
  };

  return (
    <form onSubmit={search}>
      <input
        type="search"
        placeholder="Search"
        value={localQuery}
        onChange={event => setLocalQuery(event.target.value)}
        className="search-input" //  para css
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;