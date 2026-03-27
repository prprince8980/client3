import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Welcome from "./Welcome";

function App() {
  const hasVisited = localStorage.getItem("visited");

  return (
    <Routes>
      {/* 👇 Condition here */}
      <Route
        path="/"
        element={
          hasVisited ? <Navigate to="/home" /> : <Welcome />
        }
      />

      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;