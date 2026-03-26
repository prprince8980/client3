import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
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
        client_id: "652826869991-eqag5nv5qe64sois5f9mp7digjum6d59.apps.googleusercontent.com",
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
        }
      );
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const url = isSignup
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

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
    }
  }

  async function handleGoogleLogin(response) {
    try {
      const res = await fetch("https://client3-f45z.onrender.com/api/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      });

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
    }
  }

  return (
    <div className="login-page">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

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
          {isSignup ? "Mobile Signup" : "Login Portal"}
        </h1>

        <p className="login-subtitle">
          {isSignup
            ? "Create your block world account"
            : "Enter the galaxy world"}
        </p>

        <form onSubmit={handleSubmit} className="mobile-form">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="text"
            name="phone"
            placeholder="Enter mobile number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button type="submit" className="mobile-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "New here?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>

        <div className="divider">OR</div>

        <div id="googleBtn"></div>
      </div>
    </div>
  );
}

export default Login;