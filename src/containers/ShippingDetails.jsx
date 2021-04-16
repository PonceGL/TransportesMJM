import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import Logo from "@images/MJM_logo.svg";
import "@styles/containers/ShippingDetails.css";

const ShippingDetails = () => {
  const { shipping, query } = useContext(AppContext);
  const location = useLocation().pathname;
  const details = query.envio;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    shipping(location.slice(22));
  }, []);

  const handlePrint = () => {
    console.log("Imprimir");
    window.print();
  };

  console.log(details);

  return (
    <>
      {details && (
        <main className="Details">
          <section className="Details-Print-header">
            <img
              src={Logo}
              alt="Logotipo de Transportes MJM"
              className="Details-Print-logo"
            />
            <div className="Details-Print-centerarea">
              <h1 className="Details-Print-title">Juan Carlos Gomez Suarez</h1>
              <p className="Details-Print-subtitle">
                Servicio de autotransporte público federal de carga
              </p>
              <div className="Details-Print-data">
                <p>R.F.C GOSJ-791012-217</p>
                <p>CURP. GOSJ791012HVZMRN06</p>
                <p>AUTOTRANSPORTE FORANEO DE CARGA ESPECIALIZADA</p>
              </div>
              <div className="Details-Print-addresses">
                <div className="Details-Print-office mexicoOffice">
                  <h4>OFICINAS DE MEXICO</h4>
                  <p>CENTRAL DE CARGA ORIENTE TRANSPORTISTAS No. 15</p>
                  <p>NAVE "F" BODEGAS 1 Y 2 COL. ALVARO OBREGON</p>
                  <p>C.P. 09230 ALC. IZTAPALAPA MEXICO, CDMX</p>
                  <p>TEL./FAX. 55 55 52 85 11</p>
                </div>
                <div className="Details-Print-office veracruzOffice">
                  <h4>OFICINAS DE VERACRUZ</h4>
                  <p>BLVD FIDEL VELAZQUEZ No. 110</p>
                  <p>COL. PLAYA LINDA C.P. 91810</p>
                  <p>TEL. 22 92 17 81 51</p>
                </div>
              </div>
            </div>
            <div className="Details-Print-folio">
              <h4>CARTA PORTE</h4>
              <h3 className="Details-Print-folio-number">
                Nº {details.folioNumber}
              </h3>
            </div>
          </section>

          <section className="Details-info">
            <div className="Details-remitente">
              <h3>Remitente {details.remitente}</h3>
              <p>Origen: {details.origin}</p>
              <p>R.F.C.: {details.rfcRemitente}</p>
              <p>Domicilio: {details.addressRemitente}</p>
              <p>Se recogerá en: {details.collectedIn}</p>
            </div>
            <div className="Details-destination">
              <h3>Destinatario {details.addresseeRecipient}</h3>
              <p>Origen: {details.destination}</p>
              <p>R.F.C.: {details.rfcRecipient}</p>
              <p>Domicilio: {details.addressRecipient}</p>
              <p>Se entregarán en: {details.toBeDeliveredIn}</p>
            </div>
            <div className="Details-more-info">
              <div className="Details-PaymentTermsAndValue">
                <p>
                  valor unitario, cuota convenida por <br /> tonelada o carga
                  fraccionada
                </p>
                <p>Valor declarado: {details.declaredValue}</p>
                <p>Condiciones de pago: {details.paymentTerms}</p>
              </div>
              <div className="Details-bulge-num-packaging">
                <p>{details.bulge}</p>
                <p>Numero: {details.num}</p>
                <p>Embalaje: {details.packaging}</p>
              </div>
              <p className="Details-description-for-client">
                Que el remitente dice contienen: {details.claimsToContain}
              </p>
              <div className="Details-weight-m3-estimatedWeight">
                <p>Peso: {details.weight}</p>
                <p>Volumen m3: {details.m3}</p>
                <p>Peso estimado: {details.estimatedWeight}</p>
              </div>
              <div className="Details-reshipment-reembarkWith">
                <p>Reembarco: {details.reshipment}</p>
                <p>Reembarcarse con: {details.reembarkWith}</p>
              </div>
              <div className="Details-drive">
                <div>
                  <p>Condujo: {details.drove}</p>
                  <p>De: {details.droveFrom}</p>
                  <p>A: {details.droveTo}</p>
                </div>
                <div>
                  <p>Conducirá: {details.heWillDrive}</p>
                  <p>De: {details.heWillDriveFrom}</p>
                  <p>A: {details.heWillDriveTo}</p>
                </div>
              </div>
              <p className="Details-totalInLetters">
                Importe con letra: {details.totalInLetters}
              </p>
            </div>
            <div className="Details-freight">
              <div className="details-freight-concept">
                <p>Flete:</p>
                <p>Seguro:</p>
                <p>Maniobras:</p>
                <p>Otros:</p>
                <p>Subtotal:</p>
                <p>+16% IVA Traslado:</p>
                <p>-4% IVA Retenido:</p>
                <p>Total:</p>
              </div>
              <div className="details-freight-amount">
                <p>${details.freight}</p>
                <p>${details.insurance}</p>
                <p>${details.shunting}</p>
                <p>${details.others}</p>
                <p>{details.subtotal}</p>
                <p>{details.ivaTransfer}</p>
                <p>{details.ivaRetained}</p>
                <p>{details.total}</p>
              </div>
            </div>
            <div className="Details-last-information">
              <div className="Details-trackingNumber">
                <span>Numero de rastreo</span>
                <p>{details.trackingNumber}</p>
              </div>
              <div className="Details-document">
                <span>Documento</span>
                <p>{details.document}</p>
              </div>
              <div className="Details-accordance">
                <span>Conformidad</span>
                <i className="line"></i>
              </div>
              <div className="Details-observations">
                <span>Observaciones</span>
                <p>{details.remarks}</p>
              </div>
            </div>
          </section>
          <section className="Details-status">
            <h3>
              Numero de rastreo <span>{details.trackingNumber}</span>
            </h3>
            <div className="Tracking-status-container">
              {query.statusEntregado && (
                <div className="Tracking-status">
                  <h4>Entregado</h4>
                  <p>
                    {query.statusEntregadoHora
                      .toDate()
                      .toLocaleDateString("es-ES", options)}{" "}
                    {query.statusEntregadoHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
                  </p>
                  <div className="status-line"></div>
                  <div className="status-dot"></div>
                </div>
              )}
              {query.statusEnDomicilio && (
                <div className="Tracking-status">
                  <h4>En Domicilio</h4>
                  <p>
                    {query.statusEnDomicilioHora
                      .toDate()
                      .toLocaleDateString("es-ES", options)}{" "}
                    {query.statusEnDomicilioHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
                  </p>
                  <div className="status-line"></div>
                  <div className="status-dot"></div>
                </div>
              )}
              {query.statusEnRuta && (
                <div className="Tracking-status">
                  <h4>En ruta</h4>
                  <p>
                    {query.statusEnRutaHora
                      .toDate()
                      .toLocaleDateString("es-ES", options)}{" "}
                    {query.statusEnRutaHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
                  </p>
                  <div className="status-line"></div>
                  <div className="status-dot"></div>
                </div>
              )}
              {query.statusRecibido && (
                <div className="Tracking-status">
                  <h4>Se recibió en base CDMX</h4>
                  <p>
                    {query.statusRecibidoHora
                      .toDate()
                      .toLocaleDateString("es-ES", options)}{" "}
                    {query.statusRecibidoHora
                      .toDate()
                      .toLocaleTimeString("es-ES")}
                  </p>
                  <div className="status-line"></div>
                  <div className="status-dot"></div>
                </div>
              )}
            </div>
            <button
              className="Button-print"
              onClick={() => {
                handlePrint();
              }}
            >
              Imprimir
            </button>
          </section>
        </main>
      )}
    </>
  );
};

export default ShippingDetails;
