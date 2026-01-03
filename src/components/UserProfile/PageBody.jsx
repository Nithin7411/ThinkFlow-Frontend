import StoryContainer from '../dashboard/StoryContainer.jsx';
import UserProfile from './UserProfile.jsx';

const PageBody = ({AuthorData}) => {
  console.log(AuthorData);
  return (
    <div className="pageBody">
      <div className='userStories'>
        {
          AuthorData?.stories?.length > 0 ? (
            AuthorData?.stories?.map((element, index) => (
              <StoryContainer element={element} key={index} username={AuthorData.username} userProfile={AuthorData.avatar_url} />
            ))
          ) : (
            <div>Follow to see stories</div>
          )
        }
      </div>
      <UserProfile userData={AuthorData} /> 
    </div>
  );
};

export default PageBody;
