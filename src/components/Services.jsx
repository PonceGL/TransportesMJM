import React from "react";
import paqueteria from "@images/paqueteria-ilustration.jpg";
import contenedores from "@images/containers-iulstrations.jpg";
import consolidados from "@images/consolidados-iulstrations.jpg";
import "@styles/components/Services.css";

const Services = () => {
  return (
    <>
      <h2 className="Services-title">Servicios</h2>
      <section className="Services">
        <div className="Service">
          <img src={paqueteria} alt="" />
          <h3 className="Service-title">Paquetería</h3>
          <p className="Service-description">Desde un sobre hasta palets.</p>
        </div>
        <div className="Service">
          <img src={contenedores} alt="" />
          <h3 className="Service-title">Contenedores</h3>
          <p className="Service-description">
            Movimiento de contenedor a cualquier parte de la República.
          </p>
        </div>
        <div className="Service">
          <img src={consolidados} alt="" />
          <h3 className="Service-title">Consolidados</h3>
          <p className="Service-description">
            Servicio para cargas en contenedor, icluyendo cajas secas.
          </p>
        </div>
      </section>
    </>
  );
};

export default Services;
