import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createUser}>Submit</button>
      {error ? <div>{error}</div> : <div></div>}
    </div>
  );
};

export default Signup;
