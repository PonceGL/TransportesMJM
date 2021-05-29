import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Logo from "@images/Logo-Transportes-MJM-Google-Business.png";

const Seo = ({ page }) => {
  return (
    <Helmet>
      <title>Transportes MJM | {page}</title>
    </Helmet>
  );
};

export default Seo;
