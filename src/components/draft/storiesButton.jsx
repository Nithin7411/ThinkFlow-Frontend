import { Link, useLocation } from "react-router-dom";

const StoriesButton = () => {
  const location = useLocation();

  const isDrafts = location.pathname === "/stories/drafts";
  const isPublished = location.pathname === "/stories/published-stories";

  return (
    <>
      <h1 className="userStoriesHeading">Your Stories</h1>

      <div className="stories-buttons">
        <Link to="/stories/drafts">
          <button className={isDrafts ? "black-btn" : "drafts-story-button"}>
            Drafts
          </button>
        </Link>

        <Link to="/stories/published-stories">
          <button className={isPublished ? "black-btn" : "published-story-button"}>
            Published
          </button>
        </Link>
      </div>
    </>
  );
};

export default StoriesButton;
