import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import Logo from "@images/MJM_logo.svg";
import "@styles/components/HeaderAdmin.css";

const HeaderAdmin = () => {
  const { logaut, registeredUser } = useContext(AppContext);
  const [time, setTime] = useState("");

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    setTime(strTime);
  };

  useEffect(() => {
    const hour = setInterval(() => {
      formatAMPM(new Date());
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

  const handleClick = (e) => {
    logaut(e);
  };

  return (
    <header className="HeaderAdmin">
      <Link to="/admin/inicio" className="HeaderAdmin-logo">
        <img src={Logo} alt="Logotipo de Transportes MJM" />
      </Link>
      <div className="time-container">
        <p className="time">{time}</p>
        <p className="date">
          {new Date(Date.now()).toLocaleDateString("es-ES", options)}
        </p>
      </div>
      {registeredUser && (
        <div className="name-and-button-user">
          <p className="name">{registeredUser.name}</p>
          <button
            type="button"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Salir
          </button>
        </div>
      )}
      <Link
        to="/"
        target="_blank"
        rel="noopener noreferrer"
        className="button-website"
      >
        Ir al sitio web
      </Link>
    </header>
  );
};

export default HeaderAdmin;
