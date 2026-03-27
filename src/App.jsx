import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Welcome from "./Welcome";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={<Home />}
      />
    </Routes>
  );
}

export default App;