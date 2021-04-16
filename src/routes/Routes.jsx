import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "@containers/Home";
import Layout from "@components/Layout";
import Tracking from "@containers/Tracking";
import NewShipping from "@containers/NewShipping";
import AdminInicio from "@containers/AdminInicio";
import ShippingDetails from "@containers/ShippingDetails";
import LayoutAdmin from "@components/LayoutAdmin";

import AppContext from "../context/AppContext";
import FirebaseApp from "@utils/FirebaseApp";

const Routes = () => {
  const Firebase = FirebaseApp();

  return (
    <AppContext.Provider value={Firebase}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path={[
              "/admin/inicio",
              "/admin/nuevo-envio",
              "/admin/detalles-envio/:id",
            ]}
          >
            <LayoutAdmin>
              <Route exact path="/admin/inicio" component={AdminInicio} />
              <Route exact path="/admin/nuevo-envio" component={NewShipping} />
              <Route
                exact
                path="/admin/detalles-envio/:id"
                component={ShippingDetails}
              />
            </LayoutAdmin>
          </Route>
          <Route path={["/tracking/:id"]}>
            <Layout>
              <Route exact path="/tracking/:id" component={Tracking} />
            </Layout>
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Routes;
