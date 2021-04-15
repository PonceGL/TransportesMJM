import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import HeaderAdmin from "@components/HeaderAdmin";
import "@styles/containers/ShippingDetails.css";

const ShippingDetails = () => {
  const { shipping, query } = useContext(AppContext);
  const location = useLocation().pathname;
  const details = query.envio;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    shipping(location.slice(-20));
  }, []);

  console.log(details);

  return (
    <>
      <HeaderAdmin title="Detalles del envío" />
      {details && (
        <main className="Details">
          <section className="Details-info">
            <div className="Details-remitente">
              <h3>{details.remitente}</h3>
              <p>{details.origin}</p>
              <p>{details.rfcRemitente}</p>
              <p>{details.addressRemitente}</p>
              <p>{details.collectedIn}</p>
            </div>
            <div className="Details-destination">
              <h3>{details.addresseeRecipient}</h3>
              <p>{details.destination}</p>
              <p>{details.rfcRecipient}</p>
              <p>{details.addressRecipient}</p>
              <p>{details.toBeDeliveredIn}</p>
            </div>
            <div className="Details-PaymentTermsAndValue">
              <p>{details.declaredValue}</p>
              <p>{details.paymentTerms}</p>
            </div>
          </section>
          <section className="Details-status">
            <h3>
              Numero de rastreo <span>{location.slice(-20)}</span>
            </h3>
            <div className="Tracking-status-container">
              {query.statusEntregado && (
                <div className="Tracking-status">
                  <h4>Entregado</h4>
                  <p>
                    {query.statusEntregadoHora
                      .toDate()
                      .toLocaleDateString("es-ES", options)}{" "}
                    {query.statusEntregadoHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
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
                    {query.statusEnDomicilioHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
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
                    {query.statusEnRutaHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
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
                    {query.statusRecibidoHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
                  </p>
                  <div className="status-line"></div>
                  <div className="status-dot"></div>
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ShippingDetails;
