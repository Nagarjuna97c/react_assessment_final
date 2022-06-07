import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/login/login";
import Register from "./components/Register/register";
import "./setupLocalStorage";
import { useEffect } from "react";
import Cookies from "universal-cookie";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();

    const loggedInUser = cookies.get("loggedInUser");

    if (loggedInUser !== undefined) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
