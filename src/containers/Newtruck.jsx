import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import Loader from "@components/Loader";
import FolioNumber from "@components/FolioNumber";
import "@styles/containers/Newtruck.css";

const Newtruck = () => {
  const {
    registeredUser,
    allShippings,
    allShippingQuery,
    newTruck,
    updateFolio,
    currentFolioCount,
  } = useContext(AppContext);
  const [ready, setReady] = useState(false);
  const [shippings, setShippings] = useState([]);
  const form = useRef(null);
  const history = useHistory();

  // useEffect(() => {
  //   if (registeredUser === null) {
  //     history.push("/admin");
  //   }
  // }, [registeredUser]);

  useEffect(() => {
    allShippingQuery("envios", "envio.folioNumber", "asc");
  }, []);

  const selecShippingToTruck = (value) => {
    setShippings((shippings) => [...shippings, value]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formTruck = new FormData(form.current);
    const truck = {
      folioNumber: formTruck.get("folioNumber"),
      driver: formTruck.get("driver"),
      carNumber: formTruck.get("carNumber"),
      origin: formTruck.get("origin"),
      destiny: formTruck.get("destiny"),
    };
    newTruck(truck, shippings);
    setReady(true);
    updateFolio("trucksFolios", currentFolioCount.account + 1);
    setTimeout(() => {
      history.push("/admin/inicio");
    }, 500);
  };

  const handleDelete = (e) => {
    const name = e.target.getAttribute("name");
    setShippings(shippings.filter((item) => item.trackingNumber !== name));
  };

  return (
    <>
      <main className="Newtruck">
        {ready ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <section className="list-allShippings-for-truck column-tp-left">
              <h3>Envíos disponibles</h3>
              <div className="Newtruck-list-folio-remitente-titles">
                <p>Folio</p>
                <p>Remitente</p>
              </div>
              {allShippings.map((oneShipping) => (
                <button
                  type="text"
                  onClick={(e) => {
                    selecShippingToTruck(oneShipping.envio);
                  }}
                  key={oneShipping.envio.trackingNumber}
                >
                  <p>{oneShipping.envio.folioNumber}</p>
                  <p>{oneShipping.envio.remitente}</p>
                </button>
              ))}
            </section>
            <form ref={form} onSubmit={handleSubmit}>
              <h3>Nº{<FolioNumber folioType="trucksFolios" />}</h3>
              <section className="Newtruck-info-container">
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Conductor"
                  name="driver"
                  required
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Carro Nº"
                  name="carNumber"
                  required
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Origen"
                  name="origin"
                  required
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Destino"
                  name="destiny"
                  required
                />
                <input
                  type="text"
                  name="shippings"
                  readOnly
                  required
                  value={shippings}
                  style={{
                    display: "none",
                  }}
                />
              </section>
              <section className="Newtruck-shippings column-tp-left">
                {shippings.map((shipping) => (
                  <div
                    className="Newtruck-shipping-info"
                    key={shipping.trackingNumber}
                  >
                    <p className="Newtruck-shipping-folio">
                      {shipping.folioNumber}
                    </p>
                    <p className="Newtruck-shipping-remitente">
                      {shipping.remitente}
                    </p>
                    <p className="Newtruck-shipping-addresseeRecipient">
                      {shipping.addresseeRecipient}
                    </p>
                    <p className="Newtruck-shipping-num">{shipping.num}</p>
                    <p className="Newtruck-shipping-claimsToContain">
                      {shipping.claimsToContain}
                    </p>
                    <p className="Newtruck-shipping-weight">
                      {shipping.weight}
                    </p>
                    <p className="Newtruck-shipping-insurance">
                      {shipping.insurance === "0" ? "No" : shipping.insurance}
                    </p>
                    <p className="Newtruck-shipping-declaredValue">
                      {shipping.declaredValue}
                    </p>
                    <p className="Newtruck-shipping-freight">
                      ${shipping.freight}
                    </p>
                    <p className="Newtruck-shipping-paymentTerms">
                      {shipping.paymentTerms}
                    </p>
                    <button
                      onClick={(e) => {
                        handleDelete(e);
                      }}
                      name={shipping.trackingNumber}
                      type="button"
                      className="Newtruck-shipping-delete"
                    >
                      X
                    </button>
                  </div>
                ))}
              </section>
              <button type="submit" className="Botton-submit">
                Guardar
              </button>
            </form>
          </>
        )}
      </main>
    </>
  );
};

export default Newtruck;
