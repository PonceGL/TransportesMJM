import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@images/MJM_logo.svg";
import "@styles/components/HeaderAdmin.css";

const HeaderAdmin = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const hour = setInterval(() => {
      setTime(
        new Date(Date.now()).toLocaleTimeString("es-ES", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    }, 1000);
    return () => {
      clearInterval(hour);
    };
  }, []);

  const options = {
    //weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <header className="HeaderAdmin">
      <Link to="/admin/inicio" className="NewShipping-logo">
        <img src={Logo} alt="" />
      </Link>
      <div className="time-container">
        <p className="time">{time}</p>
        <p className="date">
          {new Date(Date.now()).toLocaleDateString("es-ES", options)}
        </p>
      </div>
    </header>
  );
};

export default HeaderAdmin;
