import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    const authorise = async() => {
      const resp = await fetch(process.env.REACT_APP_API, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })

      if(resp.ok) {
        setAuthorised(true)
      } else {
        setAuthorised(false)
      }
    }

    authorise()
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={authorised ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={<Login />}
        default
      />
      <Route
        path="/signup"
        element={<Signup />}
      />
    </Routes>
  );
}

export default App;
