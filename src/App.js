import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/login/login";
import Register from "./components/Register/register";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import "./setupLocalStorage";
import Home from "./components/Home/home";

function App() {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.isLoggedIn);
  console.log(auth);

  useEffect(() => {
    const cookies = new Cookies();

    const loggedInUser = cookies.get("loggedInUser");

    if (loggedInUser !== undefined) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
