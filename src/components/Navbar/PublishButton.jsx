import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TagsPopUp from "./TagsPopUp";


const PublishButton = ({handleClick, id, setTags, data}) => {
  
  const navigate = useNavigate();
  const [loader , setLoader] = useState(false);
  const [tagsPopup , setTagsPopup] = useState(false);
  const [isDisabled , setIsDisabled] = useState(true)

const publishStory = ({ tags, coverImageUrl } ) => {
  setTags(tags);       
  setTagsPopup(false); 
  setLoader(true);
  handleClick(tags,coverImageUrl);  

  setTimeout(() => {
    setLoader(false);
    navigate(`/story/${id}`, { state: { isPublished: true } });
  }, 2000);
};


  useEffect(() => {
    setIsDisabled(data.content.length === 0 && data.title.length === 0);
  }, [data]);

const toggleTagsPopup = () => {
  setTagsPopup(tagsPopup => !tagsPopup);
};
console.log(data)

  return (
    <>
    <button className="publish-button" onClick={toggleTagsPopup} disabled={isDisabled}>
      Publish
    </button>
    {tagsPopup && <TagsPopUp handlePublish={publishStory} toggleTagsPopup={toggleTagsPopup} setTags={setTags} />}
    {loader && <div className="backgroundBlur" ><div className="publish-popup">Publishing...</div></div>}
    </>
  );
};

export default PublishButton;
