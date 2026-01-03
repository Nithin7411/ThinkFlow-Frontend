import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import moment from "moment";
import { fromFirestoreTime } from "./formatTime";
import { useEffect, useState } from "react";
import AuthorInfo from "./AuthorInfo";
import StoryReactions from "./StoryReactions";
import TagsContainer from "./TagsContainer";
import fetchApi from "../script/fetchApi";

const StoryContainer = ({ element, username, userProfile }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { title, id: storyId, content, publishedAt } = element || {};
     

  const [story, setStory] = useState(null);
  const [responsesCount, setResponsesCount] = useState(0);

  useEffect(() => {
    const loadResponsesCount = async () => {
      if (!storyId) return;

      const res = await fetchApi(
        `${import.meta.env.VITE_API_URL}/story/${storyId}/responses`
      );

      setResponsesCount(res.responses?.length || 0);
    };

    loadResponsesCount();
  }, [storyId]);

  /* ===== Story click ===== */
  const handleTitleClick = async () => {
    const res = await fetchApi(
      `${import.meta.env.VITE_API_URL}/story/${storyId}`
    );

    setStory(res.story);
    navigate(`/story/${storyId}`, { state: { story: res.story } });
  };

  const truncateText = (text, length = 120) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="story">
      <AuthorInfo
        AuthorId={id}
        story={element}
        username={username}
        userProfile={userProfile}
      />

      <h1 onClick={handleTitleClick}>{title}</h1>

      <div className="introText">
        {content?.[0]
          ? parse(truncateText(content[0].data.text))
          : null}
      </div>

      <TagsContainer story={story || element} />

      <StoryReactions
        story={story || element}
        responseCount={responsesCount}
      />

      <div className="published-on">
        {fromFirestoreTime(publishedAt)}
      </div>
    </div>
  );
};

export default StoryContainer;
