import { Link } from "react-router-dom";
import Clap from "./Clap";
import StoryResponses from "./StoryResponses";
import Views from "./StoryViews";
import { useState } from "react";

const StoryReactions = function ({ story, responseCount, handleClick }) {
  const [showPopup, setShowPopup] = useState(false);
  const handleShare = async () => {
    try {
      setShowPopup(true);
      await navigator.clipboard.writeText(window.location.href);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  return (
    <Link to={`/story/${story.id}`} style={{color: "#6B6B6B"}}><div className="story-reactions">
      <Clap story={story} />
      <StoryResponses responseCount={responseCount} handleClick={handleClick} />
      <Views story={story} />
      <button onClick={location.pathname === `/story/${story.id}` ? () => { handleShare() } : undefined} className="shareButton"><i className="fas fa-share-alt"></i></button>
      {
        showPopup && <div className="shareLinkPopup">URL copied to clipboard!</div>
      }
    </div>
    </Link>
  )
}

export default StoryReactions;