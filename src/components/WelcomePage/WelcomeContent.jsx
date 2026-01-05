import { Link } from "react-router-dom";

const WelcomeContent = () => {
  return (
    <>
      <div className="WelcomePageContent">
        <div>
          <h1>Write. Learn. Connect.</h1>
          <h2>Turn ideas into impact</h2>
          <p>Explore meaningful stories, write with purpose, and grow together</p>

          <Link to="/dashboard">
            <button className="toDashboard">Get Started</button>
          </Link>
          
        </div>

        <img
          src="./src/components/WelcomePage/test1.png"
          alt="Writing and learning illustration"
        />
      </div>

      <div className="Footer">
        <p>Help</p>
        <p>Status</p>
        <p>About</p>
        <p>Careers</p>
        <p>Press</p>
        <p>Blog</p>
        <p>Privacy</p>
        <p>Terms</p>
        <p>Teams</p>
      </div>
    </>
  );
};

export default WelcomeContent;
