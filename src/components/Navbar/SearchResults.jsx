import StoryContainer from "../dashboard/StoryContainer";

const SearchResults = ({data}) => {
  return (
    <div className="searchResults">
      {
        data.length > 0 ? data.map((element, index) => (<StoryContainer element={element} key={index}/>)
         ) : <div className="searchError"> No results found! </div>
      }
    </div>
  );
};

export default SearchResults;
