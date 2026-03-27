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
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 300,
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
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>

      <div className={`auth-card ${isSignup ? "signup-mode" : ""}`}>
        <div className="slider-tabs">
          <button
            className={!isSignup ? "active" : ""}
            onClick={() => setIsSignup(false)}
            type="button"
          >
            Login
          </button>
          <button
            className={isSignup ? "active" : ""}
            onClick={() => setIsSignup(true)}
            type="button"
          >
            Sign Up
          </button>
          <div className={`tab-indicator ${isSignup ? "right" : ""}`}></div>
        </div>

        <div className="form-window">
          <div className={`form-slider ${isSignup ? "slide-left" : ""}`}>
            <form onSubmit={handleSubmit} className="form-panel">
              <h2>Welcome Back</h2>
              <p>Login to continue</p>

              <div className="input-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="main-btn">
                Login
              </button>

              <div className="divider">or continue with</div>
              <div className="google-box">
                <div id="googleBtn"></div>
              </div>
            </form>

            <form onSubmit={handleSubmit} className="form-panel">
              <h2>Create Account</h2>
              <p>Sign up and start your journey</p>

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="main-btn">
                Sign Up
              </button>
            </form>
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
    background: "#f8fafc",
  },
};

export default Login;