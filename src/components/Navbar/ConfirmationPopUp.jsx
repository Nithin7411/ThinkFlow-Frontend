import { useNavigate } from "react-router-dom";
import fetchApi from "../script/fetchApi";

const ConfirmationPopUP = ({togglePopup}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const data = await fetchApi(`${import.meta.env.VITE_API_URL}/user/logout`, 'POST');
    if(data.status) {
      navigate("/");
    }
  };

  return (
    <div className="backgroundBlur">
      <div className="confirmationPopUp">
        <h2>Confirm to Logout?</h2>
        <div className="buttonsContainer">
          <button onClick={togglePopup} className="cancelButton">Cancel</button>
          <button onClick={handleLogout} className="confirmButton">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUP;
