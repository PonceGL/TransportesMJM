import React from "react";
import { Link } from "react-router-dom";
import Logo from "@components/Logo";
import "@styles/components/Header.css";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/" className="Header-logo">
        <Logo />
      </Link>
      <nav className="Header-menu-nav">
        <li>
          <a href="#">Servicios</a>
        </li>
        <li>
          <a href="#">Nosotros</a>
        </li>
      </nav>
    </header>
  );
};

export default Header;
