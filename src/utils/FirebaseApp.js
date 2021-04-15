import { useState } from "react";

const FirebaseApp = () => {
  const [query, setQuery] = useState("");
  const [shippings, setShippings] = useState([]);

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

  //Rastrear un envío
  const shipping = (num) => {
    firebase
      .firestore()
      .collection("envios")
      .doc(num)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setQuery(doc.data());
          //console.log(doc.data());
        } else {
          console.log("No existe tal documento!");
        }
      })
      .catch((error) => {
        console.log("Error al obtener el documento:", error);
      });
  };

  const newShipping = (shipping) => {
    firebase.firestore().collection("envios").add({
      envio: shipping,
      statusRecibido: true,
      statusRecibidoHora: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  //Todos los envios

  const allShipping = () => {
    firebase
      .firestore()
      .collection("envios")
      .get()
      .then((querySnapshot) => {
        setShippings([]);
        querySnapshot.forEach((doc) => {
          setShippings((shippings) => [...shippings, doc.id]);
          //console.log(doc.id);
        });
      });
  };

  return {
    query,
    shipping,
    newShipping,
    allShipping,
    shippings,
  };
};

export default FirebaseApp;
