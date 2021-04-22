import React, { useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import Logo from "@images/MJM_logo.svg";
import Loader from "@components/Loader";
import "@styles/containers/AdminLogin.css";

const RegisteredUser = () => {
  const { registerNewUser, registeredUser } = useContext(AppContext);
  const form = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (registeredUser != null) {
      history.push("/admin/inicio");
    }
  }, [registeredUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = new FormData(form.current);
    const user = {
      name: newUser.get("name"),
      email: newUser.get("email"),
      password: newUser.get("password"),
    };
    registerNewUser(user);
  };

  return (
    <>
      <main className="Admin-login">
        <img
          src={Logo}
          alt="Logotipo de Transportes MJM"
          className="Admin-login-logo"
        />
        <h2>Registro de nuevo usuario</h2>
        <form ref={form} onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-login"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="input-label">
            Nombre
          </label>

          <input
            type="email"
            className="input-login"
            name="email"
            id="email"
            required
          />
          <label htmlFor="email" className="input-label">
            Correo
          </label>

          <input
            type="password"
            className="input-login"
            name="password"
            id="password"
            required
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <button type="submit" className="Botton-submit">
            Entrar
          </button>
        </form>
      </main>
    </>
  );
};

export default RegisteredUser;
