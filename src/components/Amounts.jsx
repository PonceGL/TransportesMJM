import React, { useState, useEffect } from "react";
import "@styles/components/Amounts.css";

const Amounts = ({
  freightEdit = "",
  insuranceEdit = "",
  shuntingEdit = "",
  othersEdit = "",
  subtotalEdit = "",
  ivaTransferEdit = "",
  ivaRetainedEdit = "",
  totalEdit = "",
}) => {
  const [freight, setFreight] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [shunting, setShunting] = useState(0);
  const [others, setOthers] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [ivaTransfer, setIvaTransfer] = useState(0);
  const [ivaRetained, setIvaRetained] = useState(0);
  const [total, setTotal] = useState(0);

  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });

  const onlyNumbers = (e, func) => {
    if (
      e.includes("1") ||
      e.includes("2") ||
      e.includes("3") ||
      e.includes("4") ||
      e.includes("5") ||
      e.includes("6") ||
      e.includes("7") ||
      e.includes("8") ||
      e.includes("9") ||
      e.includes("0")
    ) {
      func(e);
    } else if (e.includes("")) {
      func(0);
    }
  };

  useEffect(() => {
    const sum =
      parseInt(freight) +
      parseInt(insurance) +
      parseInt(shunting) +
      parseInt(others);
    const ivaTransfer = sum * 0.16;
    const ivaRetained = parseInt(freight) * 0.04;
    const totalFinish = sum + ivaTransfer - ivaRetained;

    setSubtotal(sum);
    setIvaTransfer(ivaTransfer);
    setIvaRetained(ivaRetained);
    setTotal(totalFinish);
  }, [freight, insurance, shunting, others]);

  return (
    <section className="concept-And-Amount">
      <div className="amount-container">
        <h4>Concepto</h4>
        <p>Flete</p>
        <p>Seguro</p>
        <p>Maniobras</p>
        <p>Otros</p>
        <p>Subtotal</p>
        <p>+16% IVA Traslado</p>
        <p>-4% IVA Retenido</p>
        <p>Total</p>
      </div>
      <div className="concept-container">
        <h4>Importe</h4>
        <input
          type="text"
          name="freight"
          className="bolt"
          value={freight ? freight : freightEdit}
          onChange={(e) => onlyNumbers(e.target.value, setFreight)}
        />
        <input
          type="text"
          name="insurance"
          className="bolt"
          value={insurance ? insurance : insuranceEdit}
          onChange={(e) => onlyNumbers(e.target.value, setInsurance)}
        />
        <input
          type="text"
          name="shunting"
          className="bolt"
          value={shunting ? shunting : shuntingEdit}
          onChange={(e) => onlyNumbers(e.target.value, setShunting)}
        />
        <input
          type="text"
          name="others"
          className="bolt"
          value={others ? others : othersEdit}
          onChange={(e) => onlyNumbers(e.target.value, setOthers)}
        />
        <input
          type="text"
          name="subtotal"
          className="bolt"
          readOnly
          value={subtotal ? formatter.format(subtotal) : subtotalEdit}
        />
        <input
          type="text"
          name="ivaTransfer"
          className="bolt"
          readOnly
          value={ivaTransfer ? formatter.format(ivaTransfer) : ivaTransferEdit}
        />
        <input
          type="text"
          name="ivaRetained"
          className="bolt"
          readOnly
          value={ivaRetained ? formatter.format(ivaRetained) : ivaRetainedEdit}
        />
        <input
          type="text"
          name="total"
          className="bolt"
          readOnly
          value={total ? formatter.format(total) : totalEdit}
        />
      </div>
    </section>
  );
};

export default Amounts;
