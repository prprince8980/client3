import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Loader from "./Loader"; // Assuming you have this component

function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refs for Google Button to ensure script finds the element
  const googleBtnRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Google Initialization
  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem("token")) {
      navigate("/home");
      return;
    }

    // Initialize Google Script
    const initializeGoogle = () => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id:
            "652826869991-eqag5nv5qe64sois5f9mp7digjum6d59.apps.googleusercontent.com",
          callback: handleGoogleLogin,
        });

        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "filled_black",
          size: "large",
          text: "continue_with",
          shape: "pill",
          width: 280,
        });
      }
    };

    // Small timeout to ensure DOM is ready
    const timer = setTimeout(initializeGoogle, 100);
    
    // Fallback for demo if script fails to load (e.g. AdBlocker)
    if (!window.google) {
        console.warn("Google script not loaded");
    }

    return () => clearTimeout(timer);
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

      {/* Main Container with Sliding Logic */}
      <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
        
        {/* Loading Overlay inside container */}
        {loading && (
             <div className="loader-overlay">
                <div className="spinner"></div>
             </div>
        )}

        {/* SIGN UP FORM (Right) */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            
            <div className="input-group">
                <i className="fas fa-user input-icon"></i>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <i className="fas fa-mobile-alt input-icon"></i>
                <input type="text" name="phone" placeholder="Mobile" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <i className="fas fa-check-circle input-icon"></i>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            
            <button>Sign Up</button>
          </form>
        </div>

        {/* SIGN IN FORM (Left) */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            
            <div className="input-group">
                <i className="fas fa-mobile-alt input-icon"></i>
                <input type="text" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
            
            <div className="google-divider">OR CONTINUE WITH</div>
            <div className="google-btn-wrapper" ref={googleBtnRef}></div>
          </form>
        </div>

        {/* OVERLAY CONTAINER (The Sliding Part) */}
        <div className="overlay-container">
          <div className="overlay">
            
            {/* Left Overlay (Visible when Signing Up) */}
            <div className="overlay-panel overlay-left">
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
              <h1>Welcome Back!</h1>
              <p>To keep connected with your galaxy world please login with your personal info</p>
              <button className="ghost" onClick={() => setIsSignup(false)}>
                Sign In
              </button>
            </div>

            {/* Right Overlay (Visible when Logging In) - IMPROVED DESIGN */}
            <div className="overlay-panel overlay-right">
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
              
              {/* IMPROVED "HELLO EXPLORER" SECTION */}
              <h1 className="hero-title">
                Hello, <br/><span>Explorer!</span>
              </h1>
              <p className="hero-subtitle">
                Enter your personal details and start your journey with the Galaxy World
              </p>
              <button className="ghost" onClick={() => setIsSignup(true)}>
                Sign Up
              </button>
            </div>

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