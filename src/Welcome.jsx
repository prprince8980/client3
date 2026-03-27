import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GalaxyScene from "./GalaxyScene";
import "./welcome.css";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // 👉 go to home
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="welcome-page">
      <GalaxyScene />

      <div className="welcome-content">
        <h1 className="title">Welcome to My Galaxy 🌌</h1>
        <p className="subtitle">Loading experience...</p>
      </div>
    </div>
  );
}

export default Welcome;