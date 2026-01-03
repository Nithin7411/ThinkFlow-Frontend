import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchApi from "../script/fetchApi";

const Clap = ({ story }) => {
  const [clapCount, setClapCount] = useState(story?.clapsCount || 0);
  const [isClapped, setIsClapped] = useState(story?.isClapped || false);
  const [note, setNote] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();

  /* 🔐 fetch session user */
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const data = await fetchApi(`${import.meta.env.VITE_API_URL}/isLoggedIn"`);
        setIsLoggedIn(Boolean(data.isLoggedIn));
        setCurrentUser(data.user || null);
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };

    checkLoggedInStatus();
  }, []);

  /* ✅ compute author safely */
  const isAuthor =
    isLoggedIn && currentUser?.id === story.authorId;

  const showNote = (message) => {
    setNote(message);
    setTimeout(() => setNote(""), 3000);
  };

  const handleClap = async () => {
    // 🚫 not logged in
    if (!isLoggedIn) {
      showNote("Login to continue clapping");
      return;
    }

    // 🚫 author restriction
    if (isAuthor) {
      showNote("Authors cannot clap their own stories");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/story/${story.id}/clap`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Clap failed");

      setClapCount((prev) =>
        isClapped ? prev - 1 : prev + 1
      );
      setIsClapped((prev) => !prev);

    } catch (err) {
      console.error("Clap error:", err);
    }
  };

  const formatCount = (count) => {
    if (count < 1000) return count;
    if (count < 1_000_000) return `${Math.floor(count / 1000)}k`;
    return `${Math.floor(count / 1_000_000)}M`;
  };

  return (
    <div className="clap_container">
      <svg
        onClick={
          location.pathname === `/story/${story.id}`
            ? handleClap
            : undefined
        }
        className={isClapped ? "blackButton" : "greyButton"}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-label="clap"
      >
        {/* SVG PATHS — unchanged */}
        <path
          fillRule="evenodd"
          d="M11.37.828 12 3.282l.63-2.454zM15.421 1.84l-1.185-.388-.338 2.5zM9.757 1.452l-1.184.389 1.523 2.112zM20.253 11.84 17.75 7.438c-.238-.353-.57-.584-.93-.643a.96.96 0 0 0-.753.183 1.13 1.13 0 0 0-.443.695c.014.019.03.033.044.053l2.352 4.138c1.614 2.95 1.1 5.771-1.525 8.395a7 7 0 0 1-.454.415c.997-.13 1.927-.61 2.773-1.457 2.705-2.704 2.517-5.585 1.438-7.377"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M14.741 8.309c-.18-.267-.446-.455-.728-.502a.67.67 0 0 0-.533.127c-.146.113-.59.458-.199 1.296l1.184 2.503a.448.448 0 0 1-.236.755.445.445 0 0 1-.483-.248L7.614 6.106A.816.816 0 1 0 6.459 7.26l3.643 3.644a.446.446 0 1 1-.631.63L5.83 7.896l-1.03-1.03a.82.82 0 0 0-1.395.577.81.81 0 0 0 .24.576l1.027 1.028 3.643 3.643a.444.444 0 0 1-.144.728.44.44 0 0 1-.486-.098l-3.64-3.64a.82.82 0 0 0-1.335.263.81.81 0 0 0 .178.89l1.535 1.534 2.287 2.288a.445.445 0 0 1-.63.63l-2.287-2.288a.813.813 0 0 0-1.393.578c0 .216.086.424.238.577l4.403 4.403c2.79 2.79 5.495 4.119 8.681.931 2.269-2.271 2.708-4.588 1.342-7.086z"
          clipRule="evenodd"
        />
      </svg>

      <div className="clapCount">
        {formatCount(clapCount)}
      </div>

      {note && <p className="authorNote">{note}</p>}
    </div>
  );
};

export default Clap;
