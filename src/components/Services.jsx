import React from "react";
import PaqueteriaImg from "@images/folio01.jpeg";
import Contenedores from "@images/folio04.jpeg";
import Consolidados from "@images/folio02.jpeg";
import "@styles/components/Services.css";

const Services = () => {
  return (
    <>
      <h2 className="Services-title">Servicios</h2>
      <section className="Services">
        <div className="Service">
          <div className="Service-image-container">
            <img src={PaqueteriaImg} alt="" />
          </div>
          <h3 className="Service-title">Paquetería</h3>
          <p className="Service-description">Desde un sobre hasta palets.</p>
        </div>
        <div className="Service">
          <div className="Service-image-container">
            <img src={Contenedores} alt="" />
          </div>
          <h3 className="Service-title">Paquetería</h3>
          <p className="Service-description">
            Movimiento de contenedor a cualquier parte de la República. Aduanas
            incluidas.
          </p>
        </div>
        <div className="Service">
          <div className="Service-image-container">
            <img src={Consolidados} alt="" />
          </div>
          <h3 className="Service-title">Paquetería</h3>
          <p className="Service-description">
            Servicio para cargas en contenedor para exportaciones o entrega
            nacinal, icluyendo cajas secas.
          </p>
        </div>
      </section>
    </>
  );
};

export default Services;
