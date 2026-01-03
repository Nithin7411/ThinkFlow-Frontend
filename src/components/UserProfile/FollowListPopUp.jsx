import AuthorInfo from "../dashboard/AuthorInfo";

const FollowListPopUp = ({data, togglePopUp}) => {
  console.log(data);
  return (
    <div className="backgroundBlur">

      <div className="followListContainer">
      <button onClick={togglePopUp} >&times;</button>
      <div className="followList">
        {
          data.map((element, index) => {
            return (
            <div onClick={togglePopUp} key={index} className="authorContainer" >
              <AuthorInfo story={element} />
            </div>)
          })
        }
        </div>
      </div>
    </div>
  );
};

export default FollowListPopUp;
