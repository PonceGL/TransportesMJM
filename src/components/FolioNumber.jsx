import React, { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";

const FolioNumber = ({ folioType }) => {
  const { folio, currentFolioCount } = useContext(AppContext);
  const [folioNumber, setFolioNumber] = useState(0);

  const cerosLeft = (value) => {
    return value.toString().length < 4 ? cerosLeft("0" + value, 4) : value;
  };

  useEffect(() => {
    folio(folioType);
  }, []);

  useEffect(() => {
    if (currentFolioCount.account != undefined) {
      setFolioNumber(currentFolioCount.account + 1);
    }
  }, [currentFolioCount]);

  return (
    <input
      type="text"
      name="folioNumber"
      className="trackingNumber-input"
      readOnly
      value={cerosLeft(folioNumber)}
    />
  );
};

export default FolioNumber;
