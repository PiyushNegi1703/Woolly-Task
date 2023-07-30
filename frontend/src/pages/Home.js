import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
          <h1>Hello {sessionStorage.getItem('username')}</h1>
          <button onClick={() => {
            sessionStorage.clear()
            window.location.reload()
            navigate('/login')
          }}>Login</button>
          <button onClick={() => {
            sessionStorage.clear()
            navigate('/Signup')
          }}>Signup</button>
    </div>
  );
};

export default Home;
