import { Link } from "react-router-dom";

const WriteButton = () => {
  return (
    <Link to="/add-story">
      <button className='write-button'>Write</button>
    </Link> 
  );
};

export default WriteButton;
