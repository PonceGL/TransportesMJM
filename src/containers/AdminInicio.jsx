import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import "@styles/containers/AdminInicio.css";

const AdminInicio = () => {
  const {
    registeredUser,
    allShippings,
    allShippinsAllTime,
    allTrucks,
    allShippingQuery,
  } = useContext(AppContext);

  const [viewAll, setViewAll] = useState(false);
  const [viewAllTrucks, setViewAllTrucks] = useState(false);
  const history = useHistory();

  useEffect(() => {
    allShippingQuery("envios", "statusRecibidoHora", "desc");
    allShippingQuery("trucks", "truck.folioNumber", "desc");
  }, []);

  useEffect(() => {
    if (registeredUser === null) {
      history.push("/admin");
    }
  }, [registeredUser]);

  const handleAllShippings = () => {
    allShippinsAllTime("envios", "statusRecibidoHora", "desc");
    setViewAll(true);
  };

  const handleAllTrucks = () => {
    allShippinsAllTime("trucks", "truck.folioNumber", "desc");
    setViewAllTrucks(true);
  };

  const allCurrentShipments = () => {
    allShippingQuery("envios", "statusRecibidoHora", "desc");
    setViewAll(false);
  };

  const allCurrentTrucks = () => {
    allShippingQuery("trucks", "truck.folioNumber", "desc");
    setViewAllTrucks(false);
  };

  return (
    <>
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
              className={viewAll ? "view" : undefined}
              onClick={() => {
                handleAllShippings();
              }}
            >
              Todos los envíos
            </h3>
          </div>
          <div className="list-container">
            {allShippings.map((shipping) => (
              <Link
                to={`/admin/detalles-envio/${shipping.envio.trackingNumber}`}
                key={shipping.envio.trackingNumber}
              >
                <p>{shipping.envio.trackingNumber}</p>
                <p>{shipping.envio.remitente}</p>
              </Link>
            ))}
          </div>
        </section>
        <section
          className={
            viewAllTrucks ? "list-allTrucks view-list" : "list-allTrucks"
          }
        >
          <div className="list-allShippings-titles">
            <h3
              onClick={() => {
                allCurrentTrucks();
              }}
            >
              Camiones pendientes
            </h3>
            <h3
              className={viewAllTrucks ? "view" : undefined}
              onClick={() => {
                handleAllTrucks();
              }}
            >
              Todos los camiones
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
          <Link to="/admin/crear-camion/">Crear uevo camión</Link>
        </section>
      </main>
    </>
  );
};

export default AdminInicio;
