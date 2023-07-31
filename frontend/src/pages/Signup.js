import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupImg from "../assets/Left Side.png"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const createUser = async () => {
    const resp = await fetch(process.env.REACT_APP_API + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const json = await resp.json();
    
    if (resp.ok) {
      sessionStorage.setItem('token', json[0].token)
      sessionStorage.setItem('username', json[1])
      navigate('/')
  } else {
    setError(json.detail);
  }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="image-container">
          <img src={SignupImg} alt="" />
        </div>
        <div className="login-container">
          <span className="heading">Hello Mate!</span>
          <span className="subtitle">Register yourself by providing your credentials below</span>
          <input
            type="text"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={createUser}>Login</button>
          {/* <span>OR</span> */}
          <p>Don't have an account? <span onClick={() => navigate('/login')}>Login</span></p>
          {error ? <div className="error">{error}</div> : <div className="no-error"></div>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
