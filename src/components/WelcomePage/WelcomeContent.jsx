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
          src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
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
        <p>Text to Speech</p>
        <p>Teams</p>
      </div>
    </>
  );
};

export default WelcomeContent;
