import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import AddStory from "./components/draft/AddStory";
import "./App.css";

const Header = function () {
  const location = useLocation();

  if (location.pathname === "/add-story") {
    return null;
  }

  return (
    <>
      <h1>ThinkFlow</h1>
      <Link to="/add-story">
        <button>Write</button>
      </Link>
    </>
  );
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/add-story" element={<AddStory />} />
      </Routes>
    </Router>
  );
}

export default App;
