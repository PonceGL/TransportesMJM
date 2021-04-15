import React from "react";
import "@styles/components/Helpline.css";

const Helpline = () => {
  return (
    <section className="Helpline">
      <p>¿Necesitas ayuda?</p>
      <p>Puedes llamarnos</p>
      <a href="tel:+520455528501" className="Helpline-number">
        5 52 85 01
      </a>
    </section>
  );
};

export default Helpline;
