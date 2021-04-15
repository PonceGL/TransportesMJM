import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import Helpline from "@components/Helpline";
import "@styles/containers/Tracking.css";

//kRLdzpltxqxT1t4quzE5
//IU5YwojLBs473zofTnlr

const Tracking = () => {
  const { shipping, query } = useContext(AppContext);
  const track = useLocation().pathname.slice(10);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    shipping(track);
  }, []);

  return (
    <main className="Tracking">
      <h2 className="Tracking-title">
        {query ? "Detalles del envío" : "Buscando..."}
      </h2>
      <section className="Tracking-status-container">
        {query.statusEntregado && (
          <div className="Tracking-status">
            <h4>Entregado</h4>
            <p>
              {query.statusEntregadoHora
                .toDate()
                .toLocaleDateString("es-ES", options)}{" "}
              {query.statusEntregadoHora.toDate().toLocaleTimeString("es-ES")}
            </p>
            <div className="status-line"></div>
            <div className="status-dot"></div>
          </div>
        )}
        {query.statusEnDomicilio && (
          <div className="Tracking-status">
            <h4>En Domicilio</h4>
            <p>
              {query.statusEnDomicilioHora
                .toDate()
                .toLocaleDateString("es-ES", options)}{" "}
              {query.statusEnDomicilioHora.toDate().toLocaleTimeString("es-ES")}
            </p>
            <div className="status-line"></div>
            <div className="status-dot"></div>
          </div>
        )}
        {query.statusEnRuta && (
          <div className="Tracking-status">
            <h4>En ruta</h4>
            <p>
              {query.statusEnRutaHora
                .toDate()
                .toLocaleDateString("es-ES", options)}{" "}
              {query.statusEnRutaHora.toDate().toLocaleTimeString("es-ES")}
            </p>
            <div className="status-line"></div>
            <div className="status-dot"></div>
          </div>
        )}
        {query.statusRecibido && (
          <div className="Tracking-status">
            <h4>Se recibió en base CDMX</h4>
            <p>
              {query.statusRecibidoHora
                .toDate()
                .toLocaleDateString("es-ES", options)}{" "}
              {query.statusRecibidoHora.toDate().toLocaleTimeString("es-ES")}
            </p>
            <div className="status-line"></div>
            <div className="status-dot"></div>
          </div>
        )}
      </section>
      <section className="Tracking-info">
        {query.remitente && <p>Remitente {query.remitente}</p>}
        {query.destinatario && <p>Destinatario {query.destinatario}</p>}
      </section>
      <Helpline />
    </main>
  );
};

export default Tracking;
