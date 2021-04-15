import React from "react";
import "@styles/components/Argument.css";

const Argument = ({ text }) => {
  return (
    <div className="argument">
      <div className="argument-icon-container"></div>
      <p className="argument-text">{text}</p>
    </div>
  );
};

export default Argument;
