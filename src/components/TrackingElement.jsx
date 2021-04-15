import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "@styles/components/TrackingElement.css";

const TrackingElement = () => {
  const [number, setNumber] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/tracking/${number}`);
  };

  return (
    <form className="package-tracking-container" onSubmit={handleSubmit}>
      <input
        className="package-tracking-input"
        type="text"
        placeholder="Numero de rastreo"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <button className="package-tracking-button" type="submit">
        <Link to={`/tracking/${number}`}>Buscar</Link>
      </button>
    </form>
  );
};

export default TrackingElement;
