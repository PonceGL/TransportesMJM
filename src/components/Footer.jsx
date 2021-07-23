import React from "react";
import "@styles/components/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="Footer-info-office">
        <h4>OFICINAS DE MEXICO</h4>
        <p>Central de carga oriente transportistas no. 15</p>
        <p>Nave "f" bodegas 1 y 2 COL. Alvaro Obregón</p>
        <p>C.P. 09230 Alc. Iztapalapa MEXICO, CDMX</p>
        <a href="tel:0455528501">TEL./FAX. 55 55 52 85 11</a>
      </div>
      <div className="Footer-info-office office-xalapa">
        <h4>OFICINAS DE XALAPA</h4>
        <p>Calle Cirilo Celis Pastrana</p>
        <p>No. 4 COL. Rafael Lucio C.P. 91110</p>
        <p>
          XALAPA, VER. <a href="tel:2281338418">TEL.: 228 1338 418</a>
        </p>
        <p>
          <a href="tel:2284880786">TEL.: 228 4880 786</a>
        </p>
        <p>
          <a
            href="https://api.whatsapp.com/send?phone=5212281402833&text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20env%C3%ADos.%20"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: 228 1402 833
          </a>
        </p>
        <p>
          <a
            href="https://api.whatsapp.com/send?phone=+5212281338418&text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20env%C3%ADos.%20"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: 228 1338 418
          </a>
        </p>
      </div>
      <p className="restrictions">
        *Depende el domicilio de entrega y vigencia de la cotización
      </p>
    </footer>
  );
};

export default Footer;
