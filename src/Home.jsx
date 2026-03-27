import { useState } from "react";
import "./index.css";
import Card3D from "./Card3D";
import GalaxyScene from "./GalaxyScene";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const token = localStorage.getItem("token");

  function add() {
    setCount(count + 1);
  }

  function mins() {
    if (count !== 0) {
      setCount(count - 1);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "200vh",
        color: "white",
        position: "relative",
        textAlign: "center",
      }}
    >
      <GalaxyScene />

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 2,
          display: "flex",
          gap: "10px",
        }}
      >
        {!token ? (
          <button className="btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <>
            <button className="btn" onClick={() => navigate("/home")}>
              Dashboard
            </button>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div style={{ padding: "100px 40px", position: "relative", zIndex: 1 }}>
        <h1>My 3D Galaxy Website</h1>
        <p>This is a real 3D star background using Three.js.</p>
      </div>

      <div className="container">
        <div className="counter-box">
          <h1 className="count">{count}</h1>
        </div>

        <button className="btn" onClick={add}>Increment</button>
        <button className="btn" onClick={mins}>Decrement</button>
      </div>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card3D
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
          title="Tech Card"
          description="This card data is coming from Home.jsx using props."
          buttonText="Read More"
        />

        <Card3D
          image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          title="Nature Card"
          description="Reusable component example."
          buttonText="Explore"
        />

        <Card3D
          image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
          title="Coding Card"
          description="Reusable 3D card."
          buttonText="Start"
        />
      </div>
    </div>
  );
}

export default Home;