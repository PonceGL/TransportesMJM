import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import "@styles/containers/AdminInicio.css";

const AdminInicio = () => {
  const { allShippings, allShippingQuery } = useContext(AppContext);

  useEffect(() => {
    allShippingQuery();
  }, []);

  return (
    <>
      <main className="Admin-Inicio">
        <section className="list-allShippings">
          <h3>Envíos</h3>
          {allShippings.map((shipping) => (
            <Link
              to={`/admin/detalles-envio/${shipping.envio.trackingNumber}`}
              key={shipping.envio.trackingNumber}
            >
              <p>{shipping.envio.trackingNumber}</p>
              <p>{shipping.envio.remitente}</p>
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
