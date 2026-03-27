import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Loader from "./Loader";

function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
      return;
    }

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "652826869991-eqag5nv5qe64sois5f9mp7digjum6d59.apps.googleusercontent.com",
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "filled_black",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 320,
        }
      );
    }
  }, [navigate]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }

    setLoading(true);

    const url = isSignup
      ? "https://client3-f45z.onrender.com/api/auth/signup"
      : "https://client3-f45z.onrender.com/api/auth/login";

    const bodyData = isSignup
      ? formData
      : {
          phone: formData.phone,
          password: formData.password,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isSignup) {
        alert("Signup successful. Now login.");
        setIsSignup(false);
        setFormData({
          name: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful");
        navigate("/home");
      }
    } catch (error) {
      alert("Server connection error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(response) {
    try {
      setLoading(true);

      const res = await fetch(
        "https://client3-f45z.onrender.com/api/auth/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Google login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.popup) {
        alert(data.popup);
      }

      navigate("/home");
    } catch (error) {
      alert("Google login server error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className={`auth-container ${isSignup ? "active" : ""}`}>
        <div className="panel form-panel">
          <div className="login-box">
            <div className="cube-wrapper">
              <div className="cube">
                <div className="face front"></div>
                <div className="face back"></div>
                <div className="face left"></div>
                <div className="face right"></div>
                <div className="face top"></div>
                <div className="face bottom"></div>
              </div>
            </div>

            <h1 className="login-title">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>

            <p className="login-subtitle">
              {isSignup
                ? "Build your block world account"
                : "Login and enter your galaxy world"}
            </p>

            <form onSubmit={handleSubmit} className="mobile-form">
              {isSignup && (
                <div className="input-group">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="input-group">
                <span className="input-icon">📱</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {isSignup && (
                <div className="input-group">
                  <span className="input-icon">✅</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <button type="submit" className="mobile-btn">
                {isSignup ? "Create Account" : "Login Now"}
              </button>
            </form>

            <div className="divider">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="google-wrap">
              <p className="google-text">Sign in using your Google account</p>
              <div id="googleBtn"></div>
            </div>

            <p className="switch-text">
              {isSignup ? "Already have an account?" : "New here?"}
              <span onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? " Login" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>

        <div className="panel info-panel">
          <div className="info-content">
            <h2>{isSignup ? "Join the Adventure" : "Hello, Explorer!"}</h2>
            <p>
              {isSignup
                ? "Create an account and start building smart, creative, AI-powered experiences."
                : "Login to continue your journey, manage your world, and unlock cool features."}
            </p>

            <button
              className="ghost-btn"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Back to Login" : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loaderContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
  },
};

export default Login;