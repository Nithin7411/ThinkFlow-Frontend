import Header from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import fetchApi from "../script/fetchApi";
import StoriesButton from "./storiesButton";
import moment from "moment";
import { fromFirestoreTime } from "../dashboard/formatTime";

const PublishedStories = () => {
  const [pubStories, setPubStories] = useState([]);

  const fetchPublishedStories = async () => {
    try {
      const stories = await fetchApi(`${import.meta.env.VITE_API_URL}/user/stories`);
      setPubStories(stories.published);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(pubStories);
  useEffect(() => {
    fetchPublishedStories();
  }, []);

  const truncateContent = (content, length = 100) => {
    if (!content) return '';
    const plainText = content
      .map(block => block.data.text)
      .join(' ');
    const truncateContent = plainText.length > length ? plainText.slice(0, length) + '...' : plainText;
    return truncateContent;
  };

  return (
    <>
      <Header />
      <StoriesButton />
      {pubStories.map((story) => (
        <Link to={{ pathname: `/story/${story.id}` }} key={story.id} className="story-anchor">
          <div className="publishedStory-card">
            <h2>{parse(story.title)}</h2>
            <p>{parse(truncateContent(story.content))}</p>
            <div className="published-on">{fromFirestoreTime(story.publishedAt)}</div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default PublishedStories;
