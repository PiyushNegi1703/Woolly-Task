import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email_or_username, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

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
        sessionStorage.setItem('token', json[0].token)
        sessionStorage.setItem('username', json[1])
        navigate('/')
    } else {
      setError(json.detail);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={loginUser}>Submit</button>
      {error ? <div>{error}</div> : <div></div>}
    </div>
  );
};

export default Login;
