import React from "react";
import HeaderAdmin from "@components/HeaderAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <HeaderAdmin />
      {children}
    </>
  );
};

export default LayoutAdmin;
