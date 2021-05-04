import React, { useContext, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import Logo from "@images/MJM_logo.svg";
import IconWhatsapp from "@components/IconWhatsapp";
import "@styles/containers/ShippingDetails.css";

const ShippingDetails = () => {
  const { registeredUser, shipping, query, updateStatus } = useContext(
    AppContext
  );
  const location = useLocation().pathname;
  const details = query.envio;
  const history = useHistory();
  const options = {
    weekday: "long",
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
    shipping("envios", "envio.trackingNumber", location.slice(22));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const maintainShipmentStatus = (status) => {
    updateStatus(details.trackingNumber, status);
  };

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
              <h1 className="Details-Print-title">Transportes MJM</h1>
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
                  <h4>OFICINAS DE XALAPA</h4>
                  <p>CALLE CIRILO CELIS PASTRANA</p>
                  <p>No. 4 COL. RAFAEL LUCIO C.P. 91110</p>
                  <p>XALAPA, VER. TEL.: 228 1338 418</p>
                  <p className="Details-Print-WhatsApp">
                    <span>
                      <IconWhatsapp />
                    </span>{" "}
                    WhatsApp: 228 1402 833
                  </p>
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
            <div className="Details-date-origin space-between-center">
              <p>{details.origin}</p>
              <p>
                {query.statusRecibidoHora
                  .toDate()
                  .toLocaleDateString("es-ES", options)}{" "}
              </p>
            </div>
            <div className="Details-remitente">
              <h3>Remitente: {details.remitente}</h3>
              <p>Origen: {details.origin}</p>
              <p>R.F.C.: {details.rfcRemitente}</p>
              <p>Domicilio: {details.addressRemitente}</p>
              <p>Se recogerá en: {details.collectedIn}</p>
            </div>
            <div className="Details-destination">
              <h3>Destinatario: {details.addresseeRecipient}</h3>
              <p>Destino: {details.destination}</p>
              <p>R.F.C.: {details.rfcRecipient}</p>
              <p>Domicilio: {details.addressRecipient}</p>
              <p>Se entregarán en: {details.toBeDeliveredIn}</p>
            </div>
            <div className="Details-more-info">
              <div className="Details-PaymentTermsAndValue space-between-center">
                <p>
                  valor unitario, cuota convenida por <br /> tonelada o carga
                  fraccionada
                </p>
                <p>
                  Valor: <span>{details.declaredValue}</span>
                </p>
                <p>
                  <span>{details.paymentTerms}</span>
                </p>
              </div>
              <div className="Details-bulge-claims-weight-container">
                <div className="Details-bulge-num-packaging">
                  <p className="bolt">{details.bulge}</p>
                  <p>
                    Numero: <span className="bolt">{details.num}</span>
                  </p>
                  <p>
                    Embalaje: <span className="bolt">{details.packaging}</span>
                  </p>
                </div>
                <div className="Details-description-for-client">
                  <p>Que el remitente dice contienen:</p>
                  <p>{details.claimsToContain}</p>
                </div>
                <div className="Details-weight-m3-estimatedWeight">
                  <p>
                    Peso: <span className="bolt">{details.weight}</span>
                  </p>
                  <p>
                    Volumen m3: <span className="bolt">{details.m3}</span>
                  </p>
                  <p>
                    Peso estimado:{" "}
                    <span className="bolt">{details.estimatedWeight}</span>
                  </p>
                </div>
              </div>
              <div className="Details-reshipment-reembarkWith">
                <p>
                  Reembarco: <span className="bolt">{details.reshipment}</span>
                </p>
                <p>
                  Reembarcarse con:{" "}
                  <span className="bolt">{details.reembarkWith}</span>
                </p>
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
                <p className="bolt">${details.freight}</p>
                <p className="bolt">${details.insurance}</p>
                <p className="bolt">${details.shunting}</p>
                <p className="bolt">${details.others}</p>
                <p className="bolt">{details.subtotal}</p>
                <p className="bolt">{details.ivaTransfer}</p>
                <p className="bolt">{details.ivaRetained}</p>
                <p className="bolt">{details.total}</p>
              </div>
            </div>
            <div className="Details-last-information">
              <div className="Details-trackingNumber">
                <span>Numero de rastreo</span>
                <p>{details.trackingNumber}</p>
              </div>
              <div className="Details-document">
                <span>Documentó</span>
                <p>{details.document}</p>
              </div>
              <div className="Details-accordance">
                <span>Recibí de Conformidad</span>
                <i className="line"></i>
              </div>
              <div className="Details-observations">
                <span>Observaciones</span>
                <p className="bolt">{details.remarks}</p>
              </div>
            </div>
            <p className="Details-thanks">
              GRACIAS POR HABERNOS BRINDADO LA PÒRTUNIDAD DE SERVIRLE
            </p>
          </section>
          <section className="Details-status">
            <h3 className="Details-status-trackingNumber">
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
            <div className="Details-buttons-container space-between-center">
              <Link
                to={`/admin/editar-envio/${details.trackingNumber}`}
                className="Details-buttons Button-edit"
              >
                Editar
              </Link>
              <button
                className="Details-buttons Button-print"
                onClick={() => {
                  handlePrint();
                }}
              >
                Imprimir
              </button>
            </div>
            {query.statusEnDomicilio && (
              <button
                type="button"
                className="Button-delivered"
                onClick={() => {
                  maintainShipmentStatus("entregado");
                }}
              >
                Actualizar status de envio: Entregado
              </button>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default ShippingDetails;
