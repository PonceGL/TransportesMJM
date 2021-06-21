import React from "react";
import "@styles/components/Helpline.css";

const Helpline = () => {
  return (
    <section className="Helpline">
      <p>¿Necesitas ayuda?</p>
      <p>Puedes llamarnos</p>
      <a href="tel:5555528511" className="call-number">
        555 552 85 11
      </a>
    </section>
  );
};

export default Helpline;
