import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
