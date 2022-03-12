import React, { useState } from "react";
import "./Search.css";

const Search = (props) => {
  const [queryValue, setQueryValue] = useState("");
  const onChangeHandler = (e) => {
    setQueryValue(e.target.value);
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    props.onSearch(queryValue)
  }
  return (
    <React.Fragment>
      <form onSubmit={submitHandler} className="div-search">
        <h2>Search for a movie</h2>        
        <input
          className="input-search"
          type="text"
          value={queryValue}
          onChange={onChangeHandler}                   
        />
        <button type="submit" className="btn-search">Search</button>
      </form>
    </React.Fragment>
  );
};

export default Search;