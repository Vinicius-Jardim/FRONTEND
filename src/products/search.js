import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ setQuery }) => {
  const [localQuery, setLocalQuery] = useState("");

  const search = (event) => {
    event.preventDefault();
    setQuery(localQuery);
  };

  return (
    <form onSubmit={search}>
      <input
        style={{
          height: "35px",
          width: "250px",
          marginTop: "10px",
          borderStyle: "solid",
          borderRadius: "5px",
        }}
        type="search"
        placeholder="O que procura?"
        value={localQuery}
        onChange={(event) => setLocalQuery(event.target.value)}
        className="search-input"
      />
      <button
        style={{
          height: "35px",
          marginTop: "10px",
          backgroundColor: "transparent",
          border: "none",
        }}
        type="submit"
      >
        <SearchOutlined style={{ fontSize: "1.5rem"}} />
      </button>
    </form>
  );
};

export default SearchBar;
