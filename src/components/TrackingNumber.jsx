import React, { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import "@styles/components/TrackingNumber.css";

const TrackingNumber = () => {
  const { checkIfUnique, unique } = useContext(AppContext);
  const [trackingNumber, setTrackingNumber] = useState("");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setTrackingNumber((trackingNumber) => [
        ...trackingNumber,
        characters.charAt(Math.floor(Math.random() * characters.length)),
      ]);
    }
  }, [unique]);

  useEffect(() => {
    checkIfUnique(trackingNumber);
  }, [trackingNumber]);

  return (
    <input
      type="text"
      name="trackingNumber"
      className="trackingNumber-input"
      readOnly
      value={trackingNumber.toString().replaceAll(",", "")}
    />
  );
};

export default TrackingNumber;
