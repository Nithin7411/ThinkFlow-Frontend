import { useEffect, useState } from "react";
import NavBar from "./Navbar";
import fetchApi from "../script/fetchApi";
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchDetails = async () => {
      if (searchValue) {
        const data = await fetchApi(`http://localhost:8000/search?keyword=${searchValue}`);
        setSearchResults(data.contentBased || []);
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchDetails();
  }, [searchValue]);

  return (
    <div className="searchPage">
      <NavBar />
      <SearchBar onSearch={setSearchValue} />
      <SearchResults data={searchResults} />
    </div>
  );
};

export default SearchPage;
