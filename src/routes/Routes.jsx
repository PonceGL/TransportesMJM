import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "@containers/Home";
import Layout from "@components/Layout";
import Tracking from "@containers/Tracking";
import NewShipping from "@containers/NewShipping";
import Admin from "@containers/Admin";
import RegisteredUser from "@containers/RegisteredUser";
import UserNotVerified from "@containers/UserNotVerified";
import AdminInicio from "@containers/AdminInicio";
import ShippingDetails from "@containers/ShippingDetails";
import ManageEmployees from "@containers/ManageEmployees";
import LayoutAdmin from "@components/LayoutAdmin";
import ShippingEdit from "@containers/ShippingEdit";
import TruckDetails from "@containers/TruckDetails";
import Newtruck from "@containers/Newtruck";

import AppContext from "../context/AppContext";
import FirebaseApp from "@utils/FirebaseApp";

const Routes = () => {
  const Firebase = FirebaseApp();

  return (
    <AppContext.Provider value={Firebase}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/registro" component={RegisteredUser} />
          <Route
            path={[
              "/admin/inicio",
              "/admin/nuevo-envio",
              "/admin/detalles-envio/:id",
              "/admin/detalles-camion/:id",
              "/admin/editar-envio/:id",
              "/admin/crear-camion",
              "/admin/administrar-empleados",
              "/usuario-no-verificado",
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
              <Route
                exact
                path="/admin/detalles-camion/:id"
                component={TruckDetails}
              />
              <Route
                exact
                path="/admin/editar-envio/:id"
                component={ShippingEdit}
              />
              <Route exact path="/admin/crear-camion" component={Newtruck} />
              <Route
                exact
                path="/admin/administrar-empleados"
                component={ManageEmployees}
              />
              <Route
                exact
                path="/usuario-no-verificado"
                component={UserNotVerified}
              />
            </LayoutAdmin>
          </Route>
          <Route path={["/", "/tracking/:id"]}>
            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/tracking/:id" component={Tracking} />
            </Layout>
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Routes;
