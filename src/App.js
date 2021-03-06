import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./components/login/login";
import Register from "./components/Register/register";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import "./setupLocalStorage";
import Home from "./components/Home/home";
import busesDataSlice from "./store/busesData";
import authSlice from "./store/auth";
import BookedTickets from "./components/BookedTickets/bookedTickets";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/");
      }
    }
  }, [location.pathname, navigate, dispatch]);

  return (
    <Routes>
      {auth && <Route path="/booked-tickets" element={<BookedTickets />} />}
      {auth && <Route path="/" element={<Home />} />}
      {auth && <Route path="*" element={<Navigate to="/" replace />} />}
      {!auth && <Route path="/register" element={<Register />} />}
      {!auth && <Route path="/login" element={<Login />} />}
      {!auth && <Route path="*" element={<Navigate to="/login" replace />} />}
    </Routes>
  );
}

export default App;
