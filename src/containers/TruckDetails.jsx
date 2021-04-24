import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import Logo from "@images/MJM_logo.svg";
import "@styles/containers/TruckDetails.css";

const TruckDetails = () => {
  const {
    registeredUser,
    shipping,
    query,
    updateStatus,
    updateStatusTruck,
  } = useContext(AppContext);
  const location = useLocation().pathname;
  const history = useHistory();
  const details = query.truck;
  const shippings = query.shippings;
  let bultos = 0;
  let seguro = 0;
  let flete = 0;

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

  // useEffect(() => {
  //   if (registeredUser === null) {
  //     history.push("/admin");
  //   }
  // }, [registeredUser]);

  useEffect(() => {
    shipping("trucks", "truck.folioNumber", location.slice(23));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const maintainShipmentStatus = (status) => {
    shippings.forEach((shipping) => {
      updateStatus(shipping.trackingNumber, status);
    });
    updateStatusTruck(location.slice(23), status);
  };

  return (
    <>
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
                    Terminar
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
                    className="Details-buttons-Domicilio"
                    onClick={() => {
                      maintainShipmentStatus("domicilio");
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
              <button
                type="button"
                className="Details-buttons-ruta"
                onClick={() => {
                  maintainShipmentStatus("rute");
                }}
              >
                Actualizar status de envios: En Ruta
              </button>
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
              <p>Cobrar o Pagado</p>
            </div>
            {shippings.map((shipping) => {
              if (shipping.num != "") {
                bultos = bultos + parseInt(shipping.num);
              }

              if (shipping.insurance != "") {
                seguro = seguro + parseInt(shipping.insurance);
              }

              if (shipping.freight != "") {
                flete = flete + parseInt(shipping.freight);
              }
              return (
                <div
                  className="TruckDetails-shipping-container"
                  key={shipping.trackingNumber}
                >
                  <p>{shipping.folioNumber}</p>
                  <p>{shipping.remitente}</p>
                  <p>{shipping.addresseeRecipient}</p>
                  <p>{shipping.num}</p>
                  <p>{shipping.claimsToContain}</p>
                  <p>{shipping.weight}</p>
                  <p>{formatter.format(shipping.insurance)}</p>
                  <p>
                    {shipping.declaredValue != "NO DECLARADO"
                      ? formatter.format(shipping.declaredValue)
                      : "NO DECLARADO"}
                  </p>
                  <p>{formatter.format(shipping.freight)}</p>
                  <p>{shipping.paymentTerms}</p>
                </div>
              );
            })}
            <div className="TruckDetails-shipping-totals">
              <p className="totals-talones">{shippings.length}</p>
              <p className="totals-bultos">{bultos}</p>
              <p className="totals-seguro">{formatter.format(seguro)}</p>
              <p className="totals-flete">{formatter.format(flete)}</p>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default TruckDetails;
