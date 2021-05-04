import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "@components/Seo";
import AppContext from "../context/AppContext";
import Helpline from "@components/Helpline";
import Loader from "@components/Loader";
import "@styles/containers/Tracking.css";

const Tracking = () => {
  const { shipping, query } = useContext(AppContext);
  const track = useLocation().pathname.slice(10);
  const details = query.envio;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    shipping("envios", "envio.trackingNumber", track);
  }, []);

  return (
    <>
      <SEO
        page="Rastreo"
        url={`https://mjmpaqueteria.com${useLocation().pathname}`}
      />
      <main className="Tracking">
        <h2 className="Tracking-title">
          {query === "" && (
            <div className="loader-container">
              <Loader />
            </div>
          )}
          {query != "" && query === "No existe"
            ? "No se encontro ningun envío"
            : "Detalles del envío"}
        </h2>
        <section className="Tracking-status-container">
          {query === "DoesNotExist" && (
            <>
              <p className="DoesNotExist">
                Verifica que el numero de rastreo este escrito correctamente
              </p>
              <p className="DoesNotExist">
                El numero distingue entre minúsculas y mayúsculas
              </p>
              <p className="DoesNotExist">
                Si acaba de realizar su envío, esperere unos minutos aún no se
                ve en el sistema
              </p>
              <Link to="/" className="DoesNotExist-link">
                Regresar
              </Link>
            </>
          )}
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
          {details && (
            <p>
              Remitente <span>{details.remitente}</span>
            </p>
          )}
          {details && (
            <p>
              Destinatario <span>{details.addresseeRecipient}</span>
            </p>
          )}
        </section>
        <Helpline />
      </main>
    </>
  );
};

export default Tracking;
