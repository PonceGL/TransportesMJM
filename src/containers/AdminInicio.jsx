import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import HeaderAdmin from "@components/HeaderAdmin";
import "@styles/containers/AdminInicio.css";

const AdminInicio = () => {
  const { allShippingsNumbers, allShipping } = useContext(AppContext);

  useEffect(() => {
    allShipping();
  }, []);

  return (
    <>
      <HeaderAdmin title="Admin Inicio" />
      <main className="Admin-Inicio">
        <section className="list-allShippingsNumbers">
          {allShippingsNumbers.map((shipping) => (
            <Link to={`/admin/detalles-envio/${shipping}`} key={shipping}>
              {shipping}
            </Link>
          ))}
        </section>
        <section>
          <Link to="/admin/nuevo-envio">Crear uevo envío</Link>
        </section>
      </main>
    </>
  );
};

export default AdminInicio;
