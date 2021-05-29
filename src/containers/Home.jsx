import React, { useCallback } from "react";
import SEO from "@components/Seo";

import TrackingElement from "@components/TrackingElement";
import Services from "@components/Services";

import Box from "@components/Box";
import Container from "@components/Container";
import CreditCard from "@components/CreditCard";
import Location from "@components/Location";
import IconWhatsapp from "@components/IconWhatsapp";
import Email from "@components/Email";
import Smartphone from "@components/Smartphone";
import "@styles/containers/Home.css";

const Home = () => {
  return (
    <>
      <SEO page="Inicio" />
      <main
        className="Home"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        <h1 itemProp="name">Transportes MJM</h1>
        <span itemProp="description" className="schema">
          <em>Empresa de paquetería y transporte.</em>
        </span>
        <section className="Tracking-secction">
          <h2 className="Tracking-secction-best_price">
            <em>Te garantizamos el mejor precio</em>, hasta un{" "}
            <samp className="percent">20%</samp> menos con tu cotización
            anterior.<span className="asterisk">*</span>
          </h2>
          <div className="Tracking-container">
            <h2>Conoce el estado de tu pedido</h2>
            <p>Introduce tu número de rastreo a continuación</p>
            <TrackingElement />
          </div>
          <div className="orange-filter"></div>
        </section>
        <section className="routes">
          <h3>Servicio de paquetería de Ciudad de México a:</h3>
          <ul>
            <li>
              <em>Xalapa</em>
            </li>
            <li>
              <em>Coatepec</em>
            </li>
            <li>
              <em>Banderilla</em>
            </li>
            <li>
              <em>Naolinco</em>
            </li>
          </ul>
        </section>
        <section className="Who-we-are-and-what-we-do">
          <h4>
            <em>Transportes MJM</em> tiene el propósito de lograr
            la satisfacción de sus clientes, proporcionándoles servicios
            especializados de <em>Transporte</em> terrestre y{" "}
            <em>Logística de mercancías, productos y maquinaria</em>, con altos
            niveles de calidad y seguridad.
          </h4>
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
              Sigue tu envío fácilmente desde la página web
            </p>
          </div>
        </section>
        <Services />
        <section className="call-or-message">
          <div className="phone">
            <p>Teléfono</p>
            <a href="tel:5555528511" className="call-number">
              <Smartphone />
            </a>
          </div>

          <div className="mail">
            <p>Correo</p>
            <a
              href="mailto:transportesmjm1@gmail.com?subject=Quiero%20una%20Cotizaci%C3%B3n&body=Vi%20su%20p%C3%A1gina%20web%20y%20quiero%20una%20cotizaci%C3%B3n.%0D%0A%C2%BFMe%20podr%C3%ADan%20contactar%3F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Email />
            </a>
          </div>

          <div className="message">
            <p>WhatsApp</p>
            <a
              href="https://api.whatsapp.com/send?phone=5212281402833&text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20env%C3%ADos.%20"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-number"
            >
              <IconWhatsapp />
            </a>
          </div>
        </section>
        <div
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
          className="schema"
        >
          <span itemProp="streetAddress">
            CENTRAL DE CARGA ORIENTE TRANSPORTISTAS No. 15
          </span>
          <span itemProp="addressLocality">ALVARO OBREGON</span>,
          <span itemProp="addressRegion">IZTAPALAPA MEXICO, CDMX</span>{" "}
          <span itemProp="postalCode">09230</span>
        </div>
        <span itemProp="telephone" className="schema">
          5555528511
        </span>
        <span itemProp="telephone" className="schema">
          2281338418
        </span>
        <span itemProp="telephone" className="schema">
          2281402833
        </span>
        <meta
          itemProp="openingHours"
          content="Mo-Sa 08:00-14:00"
          className="schema"
        />
        <meta
          itemProp="openingHours"
          content="Mo-Fr 16:00-18:00"
          className="schema"
        />
      </main>
    </>
  );
};

export default Home;
