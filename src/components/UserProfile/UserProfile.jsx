import FollowListPopUp from "./FollowListPopUp";
import { useState } from "react";

const UserProfile = ({userData}) => {
  const [popUpState, setPopUp] = useState();
  const [type, setType] = useState();

  const togglePopUp = () => {
    setPopUp(popUpState => !popUpState);
  }

  const displayFollowDetails = (data) => {
    if(data.length > 0) {
    setPopUp(popUpState => !popUpState);
    setType(data);
    }
  };

  return (
    <div className="userProfile">
      <img src={userData?.avatar_url} alt="profile-picture" />
        <h2>{userData?.username}</h2>
        <div className="followDetails">
          <h3 onClick={() => displayFollowDetails(userData?.followers)}> Followers: 0 </h3>
          <h3 onClick={() => displayFollowDetails(userData?.following)}> Following: 0 </h3>
      </div>
      {
        popUpState ? <FollowListPopUp data={type} togglePopUp={togglePopUp} /> : null
      }
    </div>
  );
};

export default UserProfile;
