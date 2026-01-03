import { useState } from "react";
import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Loader from "../dashboard/Loader";

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const login = async (provider) => {
    try {
      setIsLoggingIn(true);

      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      await fetch("`${import.meta.env.VITE_API_URL}/firebase-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      setIsLoggingIn(false);
      setShowWelcome(true);
      setTimeout(() => {
        window.location.reload();
      }, 1800);

    } catch (err) {
      console.error(err);
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      {isLoggingIn && (
        <div className="auth-overlay">
          <Loader />
        </div>
      )}
      {showWelcome && (
        <div className="welcome-overlay">
          <h2>Welcome back 👋</h2>
        </div>
      )}

      <div className="loginContainer">
        {!open ? (
          <button className="loginButton" onClick={() => setOpen(true)}>
            Login
          </button>
        ) : (
          <div className="loginSplit">
            <button
              className="iconButton google"
              onClick={() => login(new GoogleAuthProvider())}
            />
            <button
              className="iconButton github"
              onClick={() => login(new GithubAuthProvider())}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LoginButton;
