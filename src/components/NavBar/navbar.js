import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import authSlice from "../../store/auth";

import NavBarCSS from "./navbar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedPath = location.pathname;

  const logOutHandler = () => {
    const cookies = new Cookies();
    cookies.remove("loggedInUser");
    dispatch(authSlice.actions.logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className={NavBarCSS.navContainer}>
      <h1 className={NavBarCSS.heading}>Book My Bus</h1>
      <div className={NavBarCSS.rightNav}>
        <NavLink
          className={
            selectedPath === "/" ? NavBarCSS.selectedNavLink : NavBarCSS.navLink
          }
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={
            selectedPath === "/booked-tickets"
              ? NavBarCSS.selectedNavLink
              : NavBarCSS.navLink
          }
          to={"/booked-tickets"}
          replace
        >
          Booked Tickets
        </NavLink>
        <button className={NavBarCSS.button} onClick={logOutHandler}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default NavBar;
