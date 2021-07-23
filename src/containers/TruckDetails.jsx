import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import SEO from "@components/Seo";
import AppContext from "../context/AppContext";
import Logo from "@images/MJM_logo.svg";
import Loader from "@components/Loader";
import "@styles/containers/TruckDetails.css";

const TruckDetails = () => {
  const { registeredUser, shipping, query, updateStatus, updateStatusTruck } =
    useContext(AppContext);
  const location = useLocation().pathname;
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const details = query.truck;
  const shippings = query.shippings;
  let bultos = 0;
  let seguro = 0;
  let flete = 0;
  let total = 0;

  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (registeredUser === null) {
      history.push("/admin");
    }
  }, [registeredUser]);

  useEffect(() => {
    shipping("trucks", "truck.folioNumber", location.slice(23));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const mainShipmentStatus = (status) => {
    shippings.forEach((shipping) => {
      updateStatus(shipping.trackingNumber, status);
    });
    updateStatusTruck(location.slice(23), status);
    setReady(true);
    setTimeout(() => {
      setReady(false);
    }, 2000);
  };

  return (
    <>
      <SEO page="Detalles de viaje" />
      {ready && <Loader />}
      {details && (
        <main className="TruckDetails">
          <section className="TruckDetails-actions">
            {query.statusEnDomicilio && (
              <>
                {query.statusEntregado ? (
                  <h4 className="finished-truck">Terminado</h4>
                ) : (
                  <button
                    type="button"
                    className="Details-buttons button-finish"
                    onClick={() => {
                      updateStatusTruck(location.slice(23), "terminado");
                    }}
                  >
                    Terminar viaje
                  </button>
                )}
              </>
            )}
            {query.statusEnRuta ? (
              <>
                {query.statusEnDomicilio ? (
                  <div className="Details-Domicilio">
                    <h4>En domicilio desde</h4>
                    <p>
                      {query.statusEnDomicilioHora
                        .toDate()
                        .toLocaleDateString("es-ES", options)}{" "}
                      {query.statusEnDomicilioHora
                        .toDate()
                        .toLocaleTimeString("es-ES")}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="Details-buttons Details-buttons-Domicilio"
                    onClick={() => {
                      mainShipmentStatus("domicilio");
                    }}
                  >
                    Actualizar status de envios: En Domicilio
                  </button>
                )}
                <div className="Details-statusShippings-ruta">
                  <h4>En ruta desde</h4>
                  <p>
                    {query.statusEnRutaHora
                      .toDate()
                      .toLocaleDateString("es-ES", options)}{" "}
                    {query.statusEnRutaHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
                  </p>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="Details-buttons Details-buttons-ruta"
                  onClick={() => {
                    mainShipmentStatus("rute");
                  }}
                >
                  Actualizar status de envios: En Ruta
                </button>
                <Link
                  to={`/admin/editar-camion/${details.folioNumber}`}
                  className="Details-buttons Button-edit"
                >
                  Editar
                </Link>
              </>
            )}
            <button
              type="button"
              className="Details-buttons button-print"
              onClick={handlePrint}
            >
              Imprimir
            </button>
          </section>
          <section className="TruckDetails-header">
            <img
              src={Logo}
              alt="Logotipo de Transportes MJM"
              className="logo"
            />
            <h4>Transportes MJM</h4>
            <h2>Folio Nº {details.folioNumber}</h2>
            <h3>
              Camión con origen en {details.origin} y destino en{" "}
              {details.destiny}
            </h3>
            <h3>
              Conduce {details.driver} la unidad numero {details.carNumber}
            </h3>
            <h4>{new Date(Date.now()).toLocaleDateString("es-ES", options)}</h4>
          </section>
          <section className="TruckDetails-body">
            <div className="TruckDetails-shipping-names">
              <p>Talon Nº</p>
              <p>Remitente</p>
              <p>Consignatario</p>
              <p>Numero de bultos</p>
              <p>Tipo de mercancia</p>
              <p>Peso</p>
              <p>Seguro</p>
              <p>Valor</p>
              <p>Flete</p>
              <p>Costo total</p>
              <p>Cobrar o Pagado</p>
            </div>
            {shippings.map((shipping) => {
              if (shipping.num) {
                bultos = bultos + parseInt(shipping.num);
              }

              if (shipping.insurance) {
                seguro = seguro + parseInt(shipping.insurance);
              }

              if (shipping.freight) {
                flete = flete + parseInt(shipping.freight);
              }

              if (shipping.total) {
                let currentTotal = shipping.total.slice(1).replace(",", "");
                total = total + parseInt(currentTotal);
              }

              return (
                <div
                  className="TruckDetails-shipping-container"
                  key={shipping.trackingNumber}
                >
                  <Link to={`/admin/detalles-envio/${shipping.trackingNumber}`}>
                    <p>{shipping.folioNumber}</p>
                  </Link>
                  <p>{shipping.remitente}</p>
                  <p>{shipping.addresseeRecipient}</p>
                  <p>{shipping.num ? shipping.num : 0}</p>
                  <p>{shipping.claimsToContain}</p>
                  <p>{shipping.weight}</p>
                  <p>
                    {shipping.insurance === "$" || shipping.insurance === ""
                      ? 0
                      : shipping.insurance}
                  </p>
                  <p>
                    {shipping.declaredValue != "NO DECLARADO"
                      ? formatter.format(shipping.declaredValue)
                      : "NO DECLARADO"}
                  </p>
                  <p>
                    {shipping.freight === "$" || shipping.freight === ""
                      ? 0
                      : shipping.freight}
                  </p>
                  <p>{shipping.total}</p>
                  <p>{shipping.paymentTerms}</p>
                </div>
              );
            })}
            <div className="TruckDetails-shipping-totals">
              <p className="totals-talones">{shippings.length}</p>
              <p className="totals-bultos">{bultos}</p>
              <p className="totals-seguro">{formatter.format(seguro)}</p>
              <p className="totals-flete">{formatter.format(flete)}</p>
              <p className="totals-total">{formatter.format(total)}</p>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default TruckDetails;
