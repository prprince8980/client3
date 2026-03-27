import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // simulate checking token (can be API call later)
    setTimeout(() => {
      const token = localStorage.getItem("token");

      if (token) {
        setIsAuth(true);
      }

      setLoading(false);
    }, 800); // small delay for smooth UX
  }, []);

  // 🔥 Show loader while checking auth
  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  // 🔐 If not logged in
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
}

const styles = {
  loaderContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111", // optional dark background
  },
};

export default ProtectedRoute;