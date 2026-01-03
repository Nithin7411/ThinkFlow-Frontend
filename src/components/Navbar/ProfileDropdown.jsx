import { Link } from "react-router-dom";
import ConfirmationPopUp from "./ConfirmationPopUp";
import { useState } from "react";
import './style.css'

const ProfileDropDown = () => {
  const [popupState, setPopupState] = useState(false);
  const togglePopup = () => {
    setPopupState((popupState) => !popupState);
  };

  return (
    <div className="modal">
      <ul className="dropdown">
        <Link to="/stories/drafts">
          <li>Stories</li>
        </Link>
        <Link to="/my-profile">
          <li>Profile</li>
        </Link>
        <li onClick={togglePopup}>Log Out</li>
      </ul>
      {
        popupState && <ConfirmationPopUp togglePopup={togglePopup}/>
      }
    </div>
  );
};

export default ProfileDropDown;
