import React from "react";
import { Link } from "react-router-dom";
import SEO from "@components/Seo";

import TrackingElement from "@components/TrackingElement";
import Services from "@components/Services";

import Box from "@components/Box";
import Container from "@components/Container";
import CreditCard from "@components/CreditCard";
import Location from "@components/Location";
import IconWhatsapp from "@components/IconWhatsapp";
import "@styles/containers/Home.css";

const Home = () => {
  return (
    <>
      <SEO page="Inicio" url="https://mjmpaqueteria.com/" />
      <main className="Home">
        <section className="Tracking-secction">
          <div className="Tracking-container">
            <h2>Conoce el estado de tu pedido</h2>
            <p>Introduce tu numero de rastreo a continuación</p>
            <TrackingElement />
          </div>
          <div className="orange-filter"></div>
        </section>
        <section className="Who-we-are-and-what-we-do">
          <h4>
            Somos el <span>motor de soluciones logísticas</span> a través de la
            creación de relaciones de alto valor con nuestros socios.
          </h4>
          <p>
            <span>+150</span> Unidades propias de ATT.
          </p>
          <p>
            <span>+1000</span> Transportistas aliados.
          </p>
          <p>
            <span>+20</span> Puntos logísticos.
          </p>
        </section>
        <section className="Arguments">
          <div className="argument">
            <div className="argument-icon-container">
              <Box />
            </div>
            <p className="argument-text">Envíos urgentes o programados</p>
          </div>
          <div className="argument">
            <div className="argument-icon-container">
              <CreditCard />
            </div>
            <p className="argument-text">Diferentes formas de pago</p>
          </div>
          <div className="argument">
            <div className="argument-icon-container">
              <Container />
            </div>
            <p className="argument-text">Envíos de todos los tamaños</p>
          </div>
          <div className="argument">
            <div className="argument-icon-container">
              <Location />
            </div>
            <p className="argument-text">
              Sigue tu envío facilmente desde la página web
            </p>
          </div>
        </section>
        <Services />
        <section className="We-container-button">
          <Link to="#">Conoce más de nosotros</Link>
        </section>
        <section className="call-or-message">
          <div className="call">
            <p>Puedes llamarnos</p>
            <a href="tel:+520455528501" className="call-number">
              5 52 85 01
            </a>
          </div>

          <div className="message">
            <p>O mandar mensaje</p>
            <a href="#" className="whatsapp-number">
              <IconWhatsapp />
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
