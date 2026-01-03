import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthorInfo =  ({story, username, userProfile, AuthorId}) => {
  const location = useLocation();
   console.log("Story" ,story);
  return (
    <>
      {
        location.pathname ==='/user-profile/' + AuthorId ? null :
        <Link  to={{pathname: `/user-profile/${story?.authorId || story?.author_id || story?.id}`}}>
          <div className="AuthorInfo">
            <img src={userProfile || story?.author?.avatar_url || story?.author_avatar_url} alt="avatar" className="storyAvatar" />
            <div className="authorName"> <strong>{story?.author?.name}</strong></div>
          </div>
        </Link>
      }
    </>
    
  );
};

export default AuthorInfo;
