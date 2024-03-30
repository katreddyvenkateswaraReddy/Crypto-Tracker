import React from "react";
import "./style.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Search = ( { search, handleChange }) => {
  return (
    <div className="search-flex">
      <SearchRoundedIcon  />
      <input
        className="search-input"
        placeholder="Search"
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Search;
