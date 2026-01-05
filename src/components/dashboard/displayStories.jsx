import { useEffect, useState } from "react";
import useFetchData from "./fetchDashboard";
import StoryContainer from "./StoryContainer";
import Loader from "./Loader";
import "./displayStories.css";

const GetStories = () => {
  const { data, error, loading } = useFetchData();
  const [stories, setStories] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (data?.[0]?.stories) {
      setStories(data[0].stories);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        setShowLoader(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  if (error) return <p>{error}</p>;

  return (
    <div className="storiesContainer">
      <h1 className="StoryTitle">Stories</h1>
      {showLoader && <Loader />}

      {!showLoader &&
        stories.map((element, index) => (
          <StoryContainer
            key={element.id || element._id || index}
            element={element}
          />
        ))}
    </div>
  );
};

export default GetStories;
