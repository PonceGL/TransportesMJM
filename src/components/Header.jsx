import React from "react";
import { Link } from "react-router-dom";
import Logo from "@images/MJM_logo.svg";
import "@styles/components/Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/" className="Header-logo">
        <img src={Logo} alt="" />
      </Link>
    </header>
  );
};

export default Header;
