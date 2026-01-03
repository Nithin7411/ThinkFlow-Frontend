import { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(inputValue);
    }, 400);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, onSearch]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="searchContainer">
      
      <input type="text" className="searchInput" placeholder="Search" value={inputValue} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
