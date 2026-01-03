import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import WelcomeContent from "./WelcomeContent";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.isLoggedIn) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="WelcomePage">
      <NavBar />
      <WelcomeContent />
    </div>
  );
};

export default WelcomePage;
