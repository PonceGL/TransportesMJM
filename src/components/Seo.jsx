import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({ page, url }) => {
  return (
    <Helmet>
      <title>Transportes MJM | {page}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Transportes MJM" />
      <meta name="twitter:description" content="Necesita una descripcion" />
      <meta
        name="twitter:image"
        content="https://firebasestorage.googleapis.com/v0/b/transportesmjm-9d8a5.appspot.com/o/MJM_logo.svg?alt=media&token=5da3b2b1-00ad-4355-a668-3f21e99f933f"
      />

      <meta property="og:title" content="Transportes MJM" />
      <meta property="og:description" content="Transportes MJM" />
      <meta
        property="og:image"
        content="https://firebasestorage.googleapis.com/v0/b/transportesmjm-9d8a5.appspot.com/o/MJM_logo.svg?alt=media&token=5da3b2b1-00ad-4355-a668-3f21e99f933f"
      />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Transportes MJM" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content="ID_APP_FACEBOOK" />
    </Helmet>
  );
};

export default Seo;
