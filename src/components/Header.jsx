import React from "react";
import { Link } from "react-router-dom";
import "@styles/components/Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1 className="Header-logo">
          M<span className="Header-logo-J">J</span>M
        </h1>
      </Link>
    </header>
  );
};

export default Header;
