import { useState } from "react";

const FirebaseApp = () => {
  const [query, setQuery] = useState("");
  const [allShippingsNumbers, setAllShippingsNumbers] = useState([]);
  const [unique, setUnique] = useState(true);
  const [currentFolioCount, setCurrentFolioCount] = useState("");

  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    //databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //Rastrear toda la información deun envío
  const shipping = (num) => {
    firebase
      .firestore()
      .collection("envios")
      .doc(num)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setQuery(doc.data());
        } else {
          console.log("No existe tal documento!");
        }
      })
      .catch((error) => {
        console.log("Error al obtener el documento:", error);
      });
  };

  //Registrar nuevo envio

  const newShipping = (shipping) => {
    firebase.firestore().collection("envios").add({
      envio: shipping,
      statusRecibido: true,
      statusRecibidoHora: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  //obtener el numero de un envio

  const checkIfUnique = (num) => {
    firebase
      .firestore()
      .collection("envios")
      .where("envio.trackingNumber", "==", num)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUnique(false);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //Todos los envios

  const allShipping = () => {
    firebase
      .firestore()
      .collection("envios")
      .get()
      .then((querySnapshot) => {
        setAllShippingsNumbers([]);
        querySnapshot.forEach((doc) => {
          setAllShippingsNumbers((allShippingsNumbers) => [
            ...allShippingsNumbers,
            doc.id,
          ]);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //Ver la numeracion de los folios
  const folio = () => {
    firebase
      .firestore()
      .collection("foliosNumbers")
      .doc("folio")
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log(doc.data());
          setCurrentFolioCount(doc.data());
        } else {
          console.log("No existe tal documento!");
        }
      })
      .catch((error) => {
        console.log("Error al obtener el documento:", error);
      });
  };

  //Actualizar la numeracion de los folios
  const updateFolio = (newFolio) => {
    console.log("Se ejecuta updateFolio");
    console.log("newFolio", newFolio);
    firebase
      .firestore()
      .collection("foliosNumbers")
      .doc("folio")
      .update({
        account: newFolio,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  return {
    query,
    shipping,
    newShipping,
    allShipping,
    allShippingsNumbers,
    unique,
    checkIfUnique,
    folio,
    currentFolioCount,
    updateFolio,
  };
};

export default FirebaseApp;
