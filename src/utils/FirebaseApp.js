import { useState } from "react";

const FirebaseApp = () => {
  const [query, setQuery] = useState("");
  const [allShippings, setAllShippings] = useState([]);
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

  //Rastrear toda la información de un envío
  const shipping = (num) => {
    firebase
      .firestore()
      .collection("envios")
      .where("envio.trackingNumber", "==", num)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setQuery(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error al obtener el documento:", error);
      });
  };

  //Todos los envios

  const allShippingQuery = () => {
    firebase
      .firestore()
      .collection("envios")
      .get()
      .then((querySnapshot) => {
        setAllShippings([]);
        querySnapshot.forEach((doc) => {
          setAllShippings((allShippings) => [...allShippings, doc.data()]);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
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

  //Actualizar datos de envio

  const updateShipping = (shipping, num) => {
    firebase
      .firestore()
      .collection("envios")
      .where("envio.trackingNumber", "==", num)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase.firestore().collection("envios").doc(doc.id).set({
            envio: shipping,
            statusRecibido: true,
            statusRecibidoHora: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
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
    firebase
      .firestore()
      .collection("foliosNumbers")
      .doc("folio")
      .update({
        account: newFolio,
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  //Registrar nuevo camion

  const newTruck = (truck, shippings) => {
    console.log(truck);
    console.log(shippings);
    firebase.firestore().collection("trucks").add({
      truck: truck,
      shippings: shippings,
    });
  };

  //Actualizar datos de envio

  const updateTruck = (shipping, num) => {
    console.log("llega shipping: ", shipping);
    console.log("llega num: ", num);
    firebase
      .firestore()
      .collection("envios")
      .where("envio.carNumber", "==", num)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase
            .firestore()
            .collection("envios")
            .doc(doc.id)
            .set(
              {
                shippings: [shipping],
              },
              { merge: true }
            );
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return {
    query,
    shipping,
    newShipping,
    allShippingQuery,
    allShippings,
    unique,
    checkIfUnique,
    folio,
    currentFolioCount,
    updateFolio,
    updateShipping,
    newTruck,
    updateTruck,
  };
};

export default FirebaseApp;
