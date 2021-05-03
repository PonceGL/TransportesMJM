import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";

const UserNotVerified = () => {
  const { registeredUser } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (registeredUser === null) {
      history.push("/admin");
    }
  }, [registeredUser]);

  return (
    <main
      style={{
        width: "100%",
        padding: "5rem 2rem",
      }}
    >
      {registeredUser && (
        <>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            {registeredUser.name || registeredUser.displayName}, tu cuenta aún
            no está verificada
          </h1>
          <p
            style={{
              fontSize: "1.8rem",
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            Espera a que un administrador verifique tu registro
          </p>
        </>
      )}
    </main>
  );
};

export default UserNotVerified;
