import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import Amounts from "@components/Amounts";
import Loader from "@components/Loader";
import "@styles/containers/NewShipping.css";

const ShippingEdit = () => {
  const [originEdit, setOriginEdit] = useState("");
  const [remitenteEdit, setRemitenteEdit] = useState("");
  const [rfcRemitenteEdit, setRfcRemitenteEdit] = useState("");
  const [addressRemitenteEdit, setAddressRemitenteEdit] = useState("");
  const [collectedInEdit, setCollectedInEdit] = useState("");
  const [addresseeRecipientEdit, setAddresseeRecipientEdit] = useState("");
  const [destinationEdit, setDestinationEdit] = useState("");
  const [rfcRecipientEdit, setRfcRecipientEdit] = useState("");
  const [addressRecipientEdit, setAddressRecipientEdit] = useState("");
  const [toBeDeliveredInEdit, setToBeDeliveredInEdit] = useState("");
  const [declaredValueEdit, setDeclaredValueEdit] = useState("");
  const [paymentTermsEdit, setPaymentTermsEdit] = useState("");
  const [bulgeEdit, setBulgeEdit] = useState("");
  const [numEdit, setNumEdit] = useState("");
  const [packagingEdit, setPackagingEdit] = useState("");
  const [claimsToContainEdit, setClaimsToContainEdit] = useState("");
  const [weightEdit, setWeightEdit] = useState("");
  const [m3Edit, setM3Edit] = useState("");
  const [estimatedWeightEdit, setEstimatedWeightEdit] = useState("");
  const [reshipmentEdit, setReshipmentEdit] = useState("");
  const [reembarkWithEdit, setReembarkWithEdit] = useState("");
  const [droveEdit, setDroveEdit] = useState("");
  const [droveFromEdit, setDroveFromEdit] = useState("");
  const [droveToEdit, setDroveToEdit] = useState("");
  const [heWillDriveEdit, setHeWillDriveEdit] = useState("");
  const [heWillDriveFromEdit, setHeWillDriveFromEdit] = useState("");
  const [heWillDriveToEdit, setHeWillDriveToEdit] = useState("");
  const [remarksEdit, setRemarksEdit] = useState("");
  const [totalInLettersEdit, setTotalInLettersEdit] = useState("");

  const { registeredUser, query, shipping, updateShipping } = useContext(
    AppContext
  );
  const [ready, setReady] = useState(false);
  const location = useLocation().pathname;
  const details = query.envio;

  const form = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (registeredUser === null) {
      history.push("/admin");
    }
  }, [registeredUser]);

  useEffect(() => {
    shipping("envios", "envio.trackingNumber", location.slice(20));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formShipping = new FormData(form.current);
    const shipping = {
      trackingNumber: formShipping.get("trackingNumber"),
      folioNumber: formShipping.get("folioNumber"),

      origin: formShipping.get("origin"),
      remitente: formShipping.get("remitente"),
      rfcRemitente: formShipping.get("rfcRemitente"),
      addressRemitente: formShipping.get("addressRemitente"),
      collectedIn: formShipping.get("collectedIn"),

      destination: formShipping.get("destination"),
      addresseeRecipient: formShipping.get("addresseeRecipient"),
      rfcRecipient: formShipping.get("rfcRecipient"),
      addressRecipient: formShipping.get("addressRecipient"),
      toBeDeliveredIn: formShipping.get("toBeDeliveredIn"),

      declaredValue: formShipping.get("declaredValue"),
      paymentTerms: formShipping.get("paymentTerms"),

      bulge: formShipping.get("bulge"),
      num: formShipping.get("num"),
      packaging: formShipping.get("packaging"),

      claimsToContain: formShipping.get("claimsToContain"),

      weight: formShipping.get("weight"),
      m3: formShipping.get("m3"),
      estimatedWeight: formShipping.get("estimatedWeight"),

      reshipment: formShipping.get("reshipment"),
      reembarkWith: formShipping.get("reembarkWith"),

      drove: formShipping.get("drove"),
      droveFrom: formShipping.get("droveFrom"),
      droveTo: formShipping.get("droveTo"),

      heWillDrive: formShipping.get("heWillDrive"),
      heWillDriveFrom: formShipping.get("heWillDriveFrom"),
      heWillDriveTo: formShipping.get("heWillDriveTo"),

      remarks: formShipping.get("remarks"),
      totalInLetters: formShipping.get("totalInLetters"),

      freight: formShipping.get("freight"),
      insurance: formShipping.get("insurance"),
      shunting: formShipping.get("shunting"),
      others: formShipping.get("others"),
      subtotal: formShipping.get("subtotal"),
      ivaTransfer: formShipping.get("ivaTransfer"),
      ivaRetained: formShipping.get("ivaRetained"),
      total: formShipping.get("total"),
    };
    updateShipping(shipping, shipping.trackingNumber);
    setReady(true);
    setTimeout(() => {
      history.push(`/admin/detalles-envio/${shipping.trackingNumber}`);
    }, 1500);
  };

  return (
    <>
      <main className="NewShipping">
        {!details ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <form ref={form} onSubmit={handleSubmit}>
            {ready && (
              <div className="loader-container">
                <Loader />
              </div>
            )}
            <section className="NewShipping-numbers">
              <h3>Numero de rastreo: {details.trackingNumber}</h3>
              <input
                style={{
                  display: "none",
                }}
                type="text"
                name="trackingNumber"
                readOnly
                value={details.trackingNumber}
              />
              <h3>Nº{details.folioNumber}</h3>
              <input
                style={{
                  display: "none",
                }}
                type="text"
                name="folioNumber"
                readOnly
                value={details.folioNumber}
              />
            </section>
            <section className="NewShipping-origin">
              <input
                type="text"
                className="input-form"
                name="origin"
                value={originEdit ? originEdit : details.origin}
                onChange={(e) =>
                  handleChange(e.target.value, setOriginEdit, details.origin)
                }
              />
              <input
                type="text"
                className="input-form"
                name="remitente"
                value={remitenteEdit ? remitenteEdit : details.remitente}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setRemitenteEdit,
                    details.remitente
                  )
                }
              />
              <input
                type="text"
                className="input-form"
                name="rfcRemitente"
                value={
                  rfcRemitenteEdit ? rfcRemitenteEdit : details.rfcRemitente
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setRfcRemitenteEdit,
                    details.rfcRemitente
                  )
                }
              />
              <input
                type="text"
                className="input-form"
                name="addressRemitente"
                value={
                  addressRemitenteEdit
                    ? addressRemitenteEdit
                    : details.addressRemitente
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setAddressRemitenteEdit,
                    details.addressRemitente
                  )
                }
              />
              <input
                type="text"
                className="input-form"
                name="collectedIn"
                value={collectedInEdit ? collectedInEdit : details.collectedIn}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setCollectedInEdit,
                    details.collectedIn
                  )
                }
              />
            </section>
            <section className="NewShipping-destination">
              <input
                type="text"
                className="input-form"
                name="destination"
                value={destinationEdit ? destinationEdit : details.destination}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setDestinationEdit,
                    details.destination
                  )
                }
              />
              <input
                type="text"
                className="input-form"
                name="addresseeRecipient"
                value={
                  addresseeRecipientEdit
                    ? addresseeRecipientEdit
                    : details.addresseeRecipient
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setAddresseeRecipientEdit,
                    details.addresseeRecipient
                  )
                }
              />
              <input
                type="text"
                className="input-form"
                name="rfcRecipient"
                value={
                  rfcRecipientEdit ? rfcRecipientEdit : details.rfcRecipient
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setRfcRecipientEdit,
                    details.rfcRecipient
                  )
                }
              />
              <input
                type="text"
                className="input-form"
                name="addressRecipient"
                value={
                  addressRecipientEdit
                    ? addressRecipientEdit
                    : details.addressRecipient
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setAddressRecipientEdit,
                    details.addressRecipient
                  )
                }
              />
              <input
                type="text"
                className="input-form"
                name="toBeDeliveredIn"
                value={
                  toBeDeliveredInEdit
                    ? toBeDeliveredInEdit
                    : details.toBeDeliveredIn
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setToBeDeliveredInEdit,
                    details.toBeDeliveredIn
                  )
                }
              />
            </section>
            <section className="NewShipping-unit-value">
              <p className="NewShipping-unit-value_description">
                Valor unitario, cuota convenida por tonelada o carga fraccionada
              </p>
              <input
                type="text"
                className="input-unit-value"
                name="declaredValue"
                value={
                  declaredValueEdit ? declaredValueEdit : details.declaredValue
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setDeclaredValueEdit,
                    details.declaredValue
                  )
                }
              />
              <input
                type="text"
                className="input-unit-value"
                name="paymentTerms"
                value={
                  paymentTermsEdit ? paymentTermsEdit : details.paymentTerms
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setPaymentTermsEdit,
                    details.paymentTerms
                  )
                }
              />
            </section>
            <section className="NewShipping-more-information">
              <div className="Agreed-container">
                <input
                  type="text"
                  className="Bultos"
                  name="bulge"
                  value={bulgeEdit ? bulgeEdit : details.bulge}
                  onChange={(e) =>
                    handleChange(e.target.value, setBulgeEdit, details.bulge)
                  }
                />
                <input
                  type="number"
                  className="input-more-information"
                  name="num"
                  value={numEdit ? numEdit : details.num}
                  onChange={(e) =>
                    handleChange(e.target.value, setNumEdit, details.num)
                  }
                />
                <input
                  type="text"
                  className="input-more-information"
                  placeholder="Embalaje"
                  name="packaging"
                  value={packagingEdit ? packagingEdit : details.packaging}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setPackagingEdit,
                      details.packaging
                    )
                  }
                />
              </div>
              <textarea
                name="claimsToContain"
                placeholder="Que el remitende dice contiene"
                value={
                  claimsToContainEdit
                    ? claimsToContainEdit
                    : details.claimsToContain
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setClaimsToContainEdit,
                    details.claimsToContain
                  )
                }
              ></textarea>
              <div className="weightAndVolume-conatiner">
                <input
                  type="number"
                  className="input-peso"
                  placeholder="Peso"
                  name="weight"
                  value={weightEdit ? weightEdit : details.weight}
                  onChange={(e) =>
                    handleChange(e.target.value, setWeightEdit, details.weight)
                  }
                />
                <input
                  type="text"
                  className="input-weightAndVolume"
                  placeholder="M3"
                  name="m3"
                  value={m3Edit ? m3Edit : details.m3}
                  onChange={(e) =>
                    handleChange(e.target.value, setM3Edit, details.m3)
                  }
                />
                <input
                  type="text"
                  className="input-weightAndVolume"
                  placeholder="Peso estimado"
                  name="estimatedWeight"
                  value={
                    estimatedWeightEdit
                      ? estimatedWeightEdit
                      : details.estimatedWeight
                  }
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setEstimatedWeightEdit,
                      details.estimatedWeight
                    )
                  }
                />
              </div>
            </section>
            <section className="shipment">
              <input
                type="text"
                className="input-shipment"
                placeholder="Reembarco"
                name="reshipment"
                value={reshipmentEdit ? reshipmentEdit : details.reshipment}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setReshipmentEdit,
                    details.reshipment
                  )
                }
              />
              <input
                type="text"
                className="input-shipment"
                placeholder="Reembarcarse con"
                name="reembarkWith"
                value={
                  reembarkWithEdit ? reembarkWithEdit : details.reembarkWith
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setReembarkWithEdit,
                    details.reembarkWith
                  )
                }
              />
              <div className="drove-container">
                <input
                  type="text"
                  className="input-drove"
                  placeholder="Condujo"
                  name="drove"
                  value={droveEdit ? droveEdit : details.drove}
                  onChange={(e) =>
                    handleChange(e.target.value, setDroveEdit, details.drove)
                  }
                />
                <input
                  type="text"
                  className="input-drove"
                  placeholder="De"
                  name="droveFrom"
                  value={droveFromEdit ? droveFromEdit : details.droveFrom}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setDroveFromEdit,
                      details.droveFrom
                    )
                  }
                />
                <input
                  type="text"
                  className="input-drove"
                  placeholder="A"
                  name="droveTo"
                  value={droveToEdit ? droveToEdit : details.droveTo}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setDroveToEdit,
                      details.droveTo
                    )
                  }
                />
              </div>
              <div className="drove-container">
                <input
                  type="text"
                  className="input-drove"
                  placeholder="Conducirá"
                  name="heWillDrive"
                  value={
                    heWillDriveEdit ? heWillDriveEdit : details.heWillDrive
                  }
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setHeWillDriveEdit,
                      details.heWillDrive
                    )
                  }
                />
                <input
                  type="text"
                  className="input-drove"
                  placeholder="De"
                  name="heWillDriveFrom"
                  value={
                    heWillDriveFromEdit
                      ? heWillDriveFromEdit
                      : details.heWillDriveFrom
                  }
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setHeWillDriveFromEdit,
                      details.heWillDriveFrom
                    )
                  }
                />
                <input
                  type="text"
                  className="input-drove"
                  placeholder="A"
                  name="heWillDriveTo"
                  value={
                    heWillDriveToEdit
                      ? heWillDriveToEdit
                      : details.heWillDriveTo
                  }
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      setHeWillDriveToEdit,
                      details.heWillDriveTo
                    )
                  }
                />
              </div>
              <textarea
                name="remarks"
                placeholder="Observaciones"
                value={remarksEdit ? remarksEdit : details.remarks}
                onChange={(e) =>
                  handleChange(e.target.value, setRemarksEdit, details.remarks)
                }
              ></textarea>
              <input
                type="text"
                className="input-totalInLetters"
                placeholder="Importe total en letra"
                name="totalInLetters"
                value={
                  totalInLettersEdit
                    ? totalInLettersEdit
                    : details.totalInLetters
                }
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    setTotalInLettersEdit,
                    details.totalInLetters
                  )
                }
              />
            </section>
            <Amounts
              freightEdit={details.freight}
              insuranceEdit={details.insurance}
              shuntingEdit={details.shunting}
              othersEdit={details.others}
              subtotalEdit={details.subtotal}
              ivaTransferEdit={details.ivaTransfer}
              ivaRetainedEdit={details.ivaRetained}
              totalEdit={details.total}
            />
            <button type="submit" className="Botton-guardar">
              Guardar
            </button>
            <Link
              to={`/admin/detalles-envio/${details.trackingNumber}`}
              className="Botton-submit"
            >
              Cancelar
            </Link>
          </form>
        )}
      </main>
    </>
  );
};

export default ShippingEdit;
