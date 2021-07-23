import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import SEO from "@components/Seo";
import AppContext from "../context/AppContext";
import Loader from "@components/Loader";
import "@styles/containers/TruckEdit.css";

const TruckEdit = () => {
  const {
    registeredUser,
    shipping,
    query,
    allShippings,
    allShippingQuery,
    updateTruck,
  } = useContext(AppContext);
  //__________

  const [driverEdit, setDriverEdit] = useState("");
  const [carNumberEdit, setCarNumberEdit] = useState("");
  const [originEdit, setOriginEdit] = useState("");
  const [destinyEdit, setDestinyEdit] = useState("");

  //__________
  const location = useLocation().pathname;
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const [details, setDetails] = useState({});
  const form = useRef(null);
  const [shippings, setShippings] = useState([]);

  useEffect(() => {
    if (registeredUser === null) {
      history.push("/admin");
    }
  }, [registeredUser]);

  useEffect(() => {
    if (query) {
      setDetails(query.truck);
      setShippings(query.shippings);
      setReady(false);
    } else {
      setReady(true);
    }
  }, [query]);

  useEffect(() => {
    allShippingQuery(
      "envios",
      "statusEnRuta",
      false,
      "statusRecibidoHora",
      "desc"
    );
  }, []);

  useEffect(() => {
    shipping("trucks", "truck.folioNumber", location.slice(21));
  }, []);

  const handleChange = (value, func, lengthy) => {
    if (value.length <= lengthy.length) {
      func(value);
      if (value === "") {
        func(" ");
      }
    } else {
      func(value);
    }
  };

  const handleDelete = (e) => {
    const name = e.target.getAttribute("name");
    setShippings(shippings.filter((item) => item.trackingNumber !== name));
  };

  const selecShippingToTruck = (value) => {
    if (!shippings.includes(value)) {
      setShippings((shippings) => [...shippings, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formTruck = new FormData(form.current);
    const truck = {
      folioNumber: details.folioNumber,
      driver: formTruck.get("driver"),
      carNumber: formTruck.get("carNumber"),
      origin: formTruck.get("origin"),
      destiny: formTruck.get("destiny"),
    };
    updateTruck(details.folioNumber, truck, shippings);
    setReady(true);
    setTimeout(() => {
      history.push(`/admin/detalles-camion/${details.folioNumber}`);
    }, 500);
  };

  return (
    <>
      <SEO page="Nuevo viaje" />
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
              <h3>Nº{details.folioNumber}</h3>
              <section className="Newtruck-info-container">
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Conductor"
                  name="driver"
                  required
                  value={driverEdit ? driverEdit : details.driver}
                  onChange={(e) =>
                    handleChange(e.target.value, setDriverEdit, details.driver)
                  }
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Carro Nº"
                  name="carNumber"
                  required
                  value={carNumberEdit ? carNumberEdit : details.carNumber}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setCarNumberEdit,
                      details.carNumber
                    )
                  }
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Origen"
                  name="origin"
                  required
                  value={originEdit ? originEdit : details.origin}
                  onChange={(e) =>
                    handleChange(e.target.value, setOriginEdit, details.origin)
                  }
                />
                <input
                  type="text"
                  className="Newtruck-input"
                  placeholder="Destino"
                  name="destiny"
                  required
                  value={destinyEdit ? destinyEdit : details.destiny}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setDestinyEdit,
                      details.destiny
                    )
                  }
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
              <div className="Buttons-Container">
                <button type="submit" className="Save-Button">
                  Guardar
                </button>
                <Link
                  to={`/admin/detalles-camion/${details.folioNumber}`}
                  className="Botton-Cancel"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </>
        )}
      </main>
    </>
  );
};

export default TruckEdit;
