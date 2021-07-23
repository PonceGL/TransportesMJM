import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SEO from "@components/Seo";
import AppContext from "../context/AppContext";
import "@styles/containers/AdminInicio.css";

const AdminInicio = () => {
  const {
    registeredUser,
    allShippings,
    currentDate,
    allTrucks,
    allShippingQuery,
  } = useContext(AppContext);

  const [viewAll, setViewAll] = useState(false);
  const [viewAllTrucks, setViewAllTrucks] = useState(false);
  const history = useHistory();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (registeredUser === null) {
      history.push("/admin");
    } else if (
      registeredUser != null &&
      registeredUser.emailVerified === false
    ) {
      history.push("/usuario-no-verificado");
    }
  }, [registeredUser]);

  useEffect(() => {
    allShippingQuery(
      "envios",
      "statusEntregado",
      false,
      "statusRecibidoHora",
      "desc"
    );
    allShippingQuery(
      "trucks",
      "statusEntregado",
      false,
      "truck.folioNumber",
      "desc"
    );
  }, []);

  const handleShippingOfDay = () => {
    allShippingQuery(
      "envios",
      "envio.currentDate",
      currentDate,
      "statusRecibidoHora",
      "desc"
    );
    setViewAll(true);
  };

  const handleAllShippings = () => {
    allShippingQuery(
      "envios",
      "statusEntregado",
      true,
      "statusRecibidoHora",
      "desc"
    );
    setViewAll(true);
  };

  const handleAllTrucks = () => {
    allShippingQuery(
      "trucks",
      "statusEntregado",
      true,
      "truck.folioNumber",
      "desc"
    );
    setViewAllTrucks(true);
  };

  const allCurrentShipments = () => {
    allShippingQuery(
      "envios",
      "statusEntregado",
      false,
      "statusRecibidoHora",
      "desc"
    );
    setViewAll(false);
  };

  const allCurrentTrucks = () => {
    allShippingQuery(
      "trucks",
      "statusEntregado",
      false,
      "truck.folioNumber",
      "desc"
    );
    setViewAllTrucks(false);
  };

  return (
    <>
      <SEO page="Administración" />
      <main className="Admin-Inicio">
        <section
          className={
            viewAll ? "list-allShippings view-list" : "list-allShippings"
          }
        >
          <div className="list-allShippings-titles">
            <h3
              onClick={() => {
                allCurrentShipments();
              }}
            >
              Envíos pendientes
            </h3>
            <h3
              onClick={() => {
                handleAllShippings();
              }}
            >
              Envíos entregados
            </h3>
            <h3
              onClick={() => {
                handleShippingOfDay();
              }}
            >
              Envíos del día
            </h3>
          </div>
          {viewAll && <p className="totalShippings">{allShippings.length}</p>}
          <div className="list-container">
            {allShippings.map((shipping) => (
              <Link
                to={`/admin/detalles-envio/${shipping.envio.trackingNumber}`}
                key={shipping.envio.trackingNumber}
              >
                <p>{shipping.envio.trackingNumber}</p>
                <p>{shipping.envio.remitente}</p>
                <p>
                  {shipping.statusRecibidoHora
                    .toDate()
                    .toLocaleDateString("es-ES", options)}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section
          className={
            viewAllTrucks ? "list-allTrucks view-list" : "list-allTrucks"
          }
        >
          <div className="list-allTrucks-titles">
            <h3
              onClick={() => {
                allCurrentTrucks();
              }}
            >
              Viajes pendientes
            </h3>
            <h3
              className={viewAllTrucks ? "view" : undefined}
              onClick={() => {
                handleAllTrucks();
              }}
            >
              Viajes finalizados
            </h3>
          </div>
          <div className="list-trucks-concep">
            <p>Folio</p>
            <p>Origen</p>
            <p>Destino</p>
            <p>Conductor</p>
            <p>Num</p>
          </div>
          {allTrucks.map((truck) => (
            <Link
              to={`/admin/detalles-camion/${truck.truck.folioNumber}`}
              key={truck.truck.folioNumber}
            >
              <p>{truck.truck.folioNumber}</p>
              <p>{truck.truck.origin}</p>
              <p>{truck.truck.destiny}</p>
              <p>{truck.truck.driver}</p>
              <p>{truck.truck.carNumber}</p>
            </Link>
          ))}
        </section>
        <section className="Admin-Actions">
          <Link to="/admin/nuevo-envio">Crear uevo envío</Link>
          <Link to="/admin/crear-camion/">Crear uevo viaje</Link>
          {registeredUser != null && (
            <>
              {registeredUser.email === "transportesmjm1@gmail.com" ||
              registeredUser.email === "recepcion.transportesmjm@gmail.com" ? (
                <Link to="/admin/administrar-empleados">Empleados</Link>
              ) : undefined}
            </>
          )}
        </section>
      </main>
      <div className="logo-bg"></div>
    </>
  );
};

export default AdminInicio;
