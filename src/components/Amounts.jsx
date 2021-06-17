import React, { useState, useEffect, useRef } from "react";
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
  const checkboxIndividual = useRef(null);

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
      func("0");
    }
  };

  useEffect(() => {
    const sum =
      parseFloat(freight) +
      parseFloat(insurance) +
      parseFloat(shunting) +
      parseFloat(others);

    const ivaTransfer =
      parseFloat(freight) * 0.16 +
      parseFloat(insurance) * 0.16 +
      parseFloat(shunting) * 0.16 +
      parseFloat(others) * 0.16;

    let retained = parseFloat(freight) * 0.04;

    if (checkboxIndividual.current.checked) {
      setIvaRetained("$0");
      setTotal(formatter.format(sum + ivaTransfer));
    } else {
      setIvaRetained(formatter.format(retained));
      setTotal(formatter.format(sum + ivaTransfer - retained));
    }

    setSubtotal(formatter.format(sum));
    setIvaTransfer(formatter.format(ivaTransfer));
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
          required
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
          value={subtotal ? subtotal : subtotalEdit}
        />
        <input
          type="text"
          name="ivaTransfer"
          className="bolt"
          readOnly
          value={ivaTransfer ? ivaTransfer : ivaTransferEdit}
        />
        <input
          type="text"
          name="ivaRetained"
          className="bolt"
          readOnly
          value={ivaRetained ? ivaRetained : ivaRetainedEdit}
        />
        <input
          type="text"
          name="total"
          className="bolt"
          readOnly
          value={total ? total : totalEdit}
          required
        />
      </div>
      <label className="checkbox-individual">
        <input type="checkbox" name="individual" ref={checkboxIndividual} />
        Persona física
      </label>
    </section>
  );
};

export default Amounts;
