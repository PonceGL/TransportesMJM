import React, { useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import HeaderAdmin from "@components/HeaderAdmin";
import Amounts from "@components/Amounts";
import "@styles/containers/NewShipping.css";

const NewShipping = () => {
  const { newShipping } = useContext(AppContext);
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formShipping = new FormData(form.current);
    const shipping = {
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
    console.log(shipping);

    newShipping(shipping);
  };

  return (
    <>
      <HeaderAdmin title="Nuevo envío" />
      <main className="NewShipping">
        <form ref={form} onSubmit={handleSubmit}>
          <section className="NewShipping-origin">
            <input
              type="text"
              className="input-form"
              placeholder="Origen"
              name="origin"
            />
            <input
              type="text"
              className="input-form"
              placeholder="Remitente"
              name="remitente"
            />
            <input
              type="text"
              className="input-form"
              placeholder="R.F.C."
              name="rfcRemitente"
            />
            <input
              type="text"
              className="input-form"
              placeholder="Domicilio"
              name="addressRemitente"
            />
            <input
              type="text"
              className="input-form"
              placeholder="Se recogera en"
              name="collectedIn"
            />
          </section>
          <section className="NewShipping-destination">
            <input
              type="text"
              className="input-form"
              placeholder="Destino"
              name="destination"
            />
            <input
              type="text"
              className="input-form"
              placeholder="Destinatario"
              name="addresseeRecipient"
            />
            <input
              type="text"
              className="input-form"
              placeholder="R.F.C."
              name="rfcRecipient"
            />
            <input
              type="text"
              className="input-form"
              placeholder="Domicilio"
              name="addressRecipient"
            />
            <input
              type="text"
              className="input-form"
              placeholder="Se entregará en"
              name="toBeDeliveredIn"
            />
          </section>
          <section className="NewShipping-unit-value">
            <p className="NewShipping-unit-value_description">
              Valor unitario, cuota convenida por tonelada o carga fraccionada
            </p>
            <input
              type="text"
              className="input-unit-value"
              placeholder="Valor declarado"
              name="declaredValue"
            />
            <input
              type="text"
              className="input-unit-value"
              placeholder="Condiciones de pago"
              name="paymentTerms"
            />
          </section>
          <section className="NewShipping-more-information">
            <div className="Agreed-container">
              <input
                type="text"
                className="Bultos"
                placeholder="Bultos"
                name="bulge"
              />
              <input
                type="number"
                className="input-more-information"
                placeholder="Numero"
                name="num"
              />
              <input
                type="text"
                className="input-more-information"
                placeholder="Embalaje"
                name="packaging"
              />
            </div>
            <textarea
              name="claimsToContain"
              placeholder="Que el remitende dice contiene"
            ></textarea>
            <div className="weightAndVolume-conatiner">
              <input
                type="number"
                className="input-peso"
                placeholder="Peso"
                name="weight"
              />
              <input
                type="text"
                className="input-weightAndVolume"
                placeholder="M3"
                name="m3"
              />
              <input
                type="text"
                className="input-weightAndVolume"
                placeholder="Peso estimado"
                name="estimatedWeight"
              />
            </div>
          </section>
          <section className="shipment">
            <input
              type="text"
              className="input-shipment"
              placeholder="Reembarco"
              name="reshipment"
            />
            <input
              type="text"
              className="input-shipment"
              placeholder="Reembarcarse con"
              name="reembarkWith"
            />
            <div className="drove-container">
              <input
                type="text"
                className="input-drove"
                placeholder="Condujo"
                name="drove"
              />
              <input
                type="text"
                className="input-drove"
                placeholder="De"
                name="droveFrom"
              />
              <input
                type="text"
                className="input-drove"
                placeholder="A"
                name="droveTo"
              />
            </div>
            <div className="drove-container">
              <input
                type="text"
                className="input-drove"
                placeholder="Conducirá"
                name="heWillDrive"
              />
              <input
                type="text"
                className="input-drove"
                placeholder="De"
                name="heWillDriveFrom"
              />
              <input
                type="text"
                className="input-drove"
                placeholder="A"
                name="heWillDriveTo"
              />
            </div>
            <textarea name="remarks" placeholder="Observaciones"></textarea>
            <input
              type="text"
              className="input-totalInLetters"
              placeholder="Importe total en letra"
              name="totalInLetters"
            />
          </section>
          <Amounts />
          <button type="submit" className="Botton-submit">
            Enviar
          </button>
        </form>
      </main>
    </>
  );
};

export default NewShipping;
