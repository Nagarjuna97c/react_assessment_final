import { NavLink } from "react-router-dom";

import NavBarCSS from "./navbar.module.css";

const NavBar = () => {
  return (
    <div className={NavBarCSS.navContainer}>
      <div>Book My Bus</div>
      <NavLink to={"/"}>Booked Tickets</NavLink>
    </div>
  );
};

export default NavBar;
