import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../script/fetchApi";
import Header from "../Navbar/Navbar";
import "./storyContent.css";
import parse from "html-react-parser";
import moment from "moment";

import ResponsesList from "./ResponsesList";
import StoryReactions from "./StoryReactions";
import ResponseEditor from "./ResponseEditor";
import AuthorInfo from "./AuthorInfo";
import TagsContainer from "./TagsContainer";
import Loader from "./Loader";
import { fromFirestoreTime } from "./formatTime";

const Storycontent = () => {
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [responseCount, setResponseCount] = useState(0);
  const [storyComments, setStoryComments] = useState([]);
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const toggleModal = () => setModal(prev => !prev);

  const updateResponseCount = (newComment) => {
    setResponseCount(prev => prev + 1);
    setStoryComments(prev => [newComment, ...prev]);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [storyRes, responsesRes] = await Promise.all([
          fetchApi(`${import.meta.env.VITE_API_URL}/story/${id}`),
          fetchApi(`${import.meta.env.VITE_API_URL}/story/${id}/responses`)
        ]);

        setStory(storyRes.story);
        setStoryComments(responsesRes.responses);
        setResponseCount(responsesRes.responses.length);

      } catch (err) {
        console.error("Failed to load story", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (error || !story) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No content available.
        </p>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="story">
         <h1>{parse(story.title || "")}</h1>

        <div className="story-cover-wrapper">
          <img
            src={story.coverImageUrl || "/default-cover.jpg"}
            alt="Story cover"
            className="story-cover-image"
          />
        </div>
       

        <AuthorInfo story={story} />

        <TagsContainer story={story} />

        <StoryReactions
          story={story}
          responseCount={responseCount}
          handleClick={toggleModal}
        />


        {modal && (
          <div className="responses-modal">
            <div className="close-responses">
              Responses ({responseCount})
              <button onClick={toggleModal}>&times;</button>
            </div>

            <ResponseEditor onNewResponse={updateResponseCount} />
            <ResponsesList comments={storyComments} />
          </div>
        )}

        {story.content?.map((element, index) => {
          const HeaderTag = `h${element.data?.level || 2}`;

          switch (element.type) {
            case "paragraph":
              return (
                <p key={index}>
                  {parse(element.data.text || "")}
                </p>
              );

            case "header":
              return (
                <HeaderTag key={index}>
                  {parse(element.data.text || "")}
                </HeaderTag>
              );

            case "delimiter":
              return <hr key={index} />;

            default:
              return null;
          }
        })}

        <div className="published-on">
          {fromFirestoreTime(story.publishedAt)}
        </div>
      </div>
    </>
  );
};

export default Storycontent;
