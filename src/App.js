import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./components/login/login";
import Register from "./components/Register/register";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import "./setupLocalStorage";
import Home from "./components/Home/home";
import busesDataSlice from "./store/busesData";
import authSlice from "./store/auth";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const busesData = localStorage.getItem("busesData");
    dispatch(busesDataSlice.actions.setInitialData(busesData));
  }, [dispatch]);

  useEffect(() => {
    const cookies = new Cookies();
    const loggedInUser = cookies.get("loggedInUser");

    if (loggedInUser !== undefined) {
      dispatch(authSlice.actions.login());
      dispatch(authSlice.actions.setAuthToken(loggedInUser));
      navigate("/");
    }
  }, [navigate, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
