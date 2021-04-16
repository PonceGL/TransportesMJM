import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import Loader from "@components/Loader";
import "@styles/containers/Newtruck.css";

const Newtruck = () => {
  const { allShippings, allShippingQuery, newTruck, updateTruck } = useContext(
    AppContext
  );
  const [ready, setReady] = useState(false);
  const [shippings, setShippings] = useState([]);
  const form = useRef(null);
  const history = useHistory();

  useEffect(() => {
    allShippingQuery();
  }, []);

  const selecShippingToTruck = (value) => {
    setShippings((shippings) => [...shippings, value]);
  };

  const addShippingToTruck = (carNumber) => {
    console.log("Se ejecuta el forEach");
    shippings.forEach((shipping) => {
      updateTruck(shipping, carNumber);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formTruck = new FormData(form.current);
    const truck = {
      driver: formTruck.get("driver"),
      carNumber: formTruck.get("carNumber"),
      origin: formTruck.get("origin"),
      destiny: formTruck.get("destiny"),
      shippings: formTruck.get("shippings"),
    };
    console.log(truck);
    newTruck(truck, shippings);
    setTimeout(() => {
      history.push("/admin/inicio");
    }, 500);
  };

  console.log(shippings);

  return (
    <>
      <main className="Newtruck">
        {ready ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <section className="list-allShippings">
              <h3>Envíos</h3>
              {allShippings.map((oneShipping) => (
                <button
                  type="text"
                  onClick={(e) => {
                    selecShippingToTruck(oneShipping.envio);
                  }}
                  key={oneShipping.envio.trackingNumber}
                >
                  <p>Folio {oneShipping.envio.folioNumber}</p>
                  <p>Remitente {oneShipping.envio.remitente}</p>
                </button>
              ))}
            </section>
            <form ref={form} onSubmit={handleSubmit}>
              <section className="Newtruck-info-container">
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Conductor"
                  name="driver"
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Carro Nº"
                  name="carNumber"
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Origen"
                  name="origin"
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Destino"
                  name="destiny"
                />
                <input
                  type="text"
                  name="shippings"
                  readOnly
                  value={shippings}
                  style={{
                    display: "none",
                  }}
                />
              </section>
              <section className="Newtruck-shippings">
                {shippings.map((shipping) => (
                  <div
                    className="Newtruck-shipping-info"
                    key={shipping.trackingNumber}
                  >
                    <p>{shipping.folioNumber}</p>
                    <p>{shipping.remitente}</p>
                    <p>{shipping.addresseeRecipient}</p>
                    <p>{shipping.num}</p>
                    <p>{shipping.claimsToContain}</p>
                    <p>{shipping.weight}</p>
                    <p>
                      {shipping.insurance === "0" ? "No" : shipping.insurance}
                    </p>
                    <p>{shipping.declaredValue}</p>
                    <p>{shipping.freight}</p>
                    <p>{shipping.paymentTerms}</p>
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
