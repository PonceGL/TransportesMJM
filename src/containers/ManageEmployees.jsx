import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SEO from "@components/Seo";
import AppContext from "../context/AppContext";
import "@styles/containers/ManageEmployees.css";

const ManageEmployees = () => {
  const { registeredUser, allemployees, listOfEmployees, checkEmployee } =
    useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    listOfEmployees();
  }, []);

  useEffect(() => {
    if (registeredUser === null) {
      history.push("/admin");
    }
  }, [registeredUser]);

  useEffect(() => {
    if (registeredUser != null) {
      if (
        registeredUser.email === "transportesmjm1@gmail.com" ||
        registeredUser.email === "recepcion.transportesmjm@gmail.com"
      ) {
        console.log(
          "%c Transportes MJM ",
          "background: #222; color: #bada55; font-size: 2rem;"
        );
      } else {
        history.push("/admin");
      }
    }
  }, [registeredUser]);

  const handleDisable = (name) => {
    checkEmployee(name, false);
  };

  const handleCheck = (name) => {
    checkEmployee(name, true);
  };

  return (
    <>
      <SEO page="Gestion de empleados" />
      <main className="ManageEmployees">
        <h1>Gestionar a los empleados</h1>
        {allemployees && (
          <section className="list-employee">
            {allemployees.map((employee) => (
              <div className="list-employee_item" key={employee.uid}>
                <p className="employee-name">{employee.name}</p>
                <p>{employee.email}</p>
                {employee.emailVerified ? (
                  <>
                    <button
                      type="button"
                      className="button-disable"
                      onClick={() => handleDisable(employee.name)}
                    >
                      Desabilitar esta cuenta
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="button-check"
                      onClick={() => handleCheck(employee.name)}
                    >
                      Verificar empleado
                    </button>
                  </>
                )}
              </div>
            ))}
          </section>
        )}
        <section className="ManageEmployees-actions">
          <a
            href="mailto:?subject=Enlace de registro Transportes MJM&body=Le envío el enlace para que pueda registrarse en la página, me avisa cuando lo haga. https://mjmpaqueteria.com/registro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar mail con enlace de registro
          </a>
        </section>
      </main>
    </>
  );
};

export default ManageEmployees;
