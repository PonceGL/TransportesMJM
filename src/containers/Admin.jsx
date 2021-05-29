import React, { useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import Logo from "@images/MJM_logo.svg";
import SEO from "@components/Seo";
import "@styles/containers/AdminLogin.css";

const Admin = () => {
  const { loginUser, registeredUser, error } = useContext(AppContext);
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
      email: newUser.get("email"),
      password: newUser.get("password"),
    };
    loginUser(user);
  };

  return (
    <>
      <SEO page="Log in" />
      <main className="Admin-login">
        <img
          src={Logo}
          alt="Logotipo de Transportes MJM"
          className="Admin-login-logo"
        />
        <form ref={form} onSubmit={handleSubmit}>
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
        {error === "auth/user-not-found" && (
          <p className="errorMessage">El correo no esta registrado</p>
        )}
        {error === "auth/wrong-password" && (
          <p className="errorMessage">Contraseña erronea</p>
        )}
      </main>
    </>
  );
};

export default Admin;
