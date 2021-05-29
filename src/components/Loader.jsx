import React from "react";
import "@styles/components/Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
