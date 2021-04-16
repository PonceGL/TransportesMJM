import React from "react";
import { Link } from "react-router-dom";

import TrackingElement from "@components/TrackingElement";
import Argument from "@components/Argument";
import Services from "@components/Services";
import Footer from "@components/Footer";
import Helpline from "@components/Helpline";
import Logo from "@images/MJM_logo.svg";
import "@styles/containers/Home.css";

const Home = () => {
  return (
    <>
      <div className="Home-header">
        <Link to="/" className="Homw-logo">
          <img src={Logo} alt="Logotipo de Transportes MJM" />
        </Link>
        <TrackingElement />
      </div>
      <main>
        <section className="Who-we-are-and-what-we-do">
          <h2>Seguridad en cada uno de tus envíos.</h2>
          <p>
            En Paqueteria somos una empresa 100% mexicana, dedicada a ofrecer
            enlaces terrestres a más de 1500 poblaciones en toda la República
            Mexicana.
          </p>
        </section>
        <section className="Arguments">
          <Argument text="Envíos urgentes o programados" />
          <Argument text="Diferentes formas de pago. Facturación disponible con todas las opciones" />
          <Argument text="Envíos de todos los tamaños" />
          <Argument text="Sigue tu envío facilmente desde la página web" />
        </section>
        <Services />
        <section className="We-container-button">
          <Link to="#">Conoce más de nosotros</Link>
        </section>
        <Helpline />
      </main>
      <Footer />
    </>
  );
};

export default Home;
