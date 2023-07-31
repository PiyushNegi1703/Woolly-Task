import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/Right Side.png";

const Login = () => {
  const [email_or_username, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const resp = await fetch(process.env.REACT_APP_API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_or_username,
        password,
      }),
    });

    const json = await resp.json();

    if (resp.ok) {
      sessionStorage.setItem("token", json[0].token);
      sessionStorage.setItem("username", json[1]);
      navigate("/");
    } else {
      setError(json.detail);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-container">
          <span className="heading">Welcome Back</span>
          <span className="subtitle">Please Log into your account with your credentials</span>
          <input
            type="text"
            placeholder="Enter your username or email..."
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginUser}>Login</button>
          {/* <span>OR</span> */}
          <p>Don't have an account? <span onClick={() => navigate('/signup')}>Signup</span></p>
          {error ? <div className="error">{error}</div> : <div className="no-error"></div>}
        </div>
        <div className="image-container">
          <img src={LoginImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
