import { useState, useEffect } from "react";

const FirebaseApp = () => {
  const [query, setQuery] = useState("");
  const [allShippings, setAllShippings] = useState([]);
  const [allTrucks, setAllTrucks] = useState([]);
  const [unique, setUnique] = useState(true);
  const [currentFolioCount, setCurrentFolioCount] = useState("");
  const [registeredUser, setRegisteredUser] = useState(null);
  const [error, setError] = useState(null);
  const [allemployees, setAllemployees] = useState([]);

  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  //Curent User

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        //setRegisteredUser(user);
        currentUserFireStore(user);
      } else {
        setRegisteredUser(null);
      }
    });
  }, []);

  //check employee

  const checkEmployee = (name, handle) => {
    console.log("handle", handle);
    firebase
      .firestore()
      .collection("employees")
      .doc(name)
      .update({
        emailVerified: handle,
      })
      .then(() => {
        listOfEmployees();
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //list of employees

  const listOfEmployees = () => {
    firebase
      .firestore()
      .collection("employees")
      .where("email", "!=", "poncianogl@hotmail.com")
      .get()
      .then((querySnapshot) => {
        setAllemployees([]);
        querySnapshot.forEach((doc) => {
          setAllemployees((allemployees) => [...allemployees, doc.data()]);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //

  const currentUserFireStore = (user) => {
    firebase
      .firestore()
      .collection("employees")
      .where("email", "==", user.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setRegisteredUser(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //Log in

  const loginUser = (user) => {
    const email = user.email;
    const password = user.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
      });
  };

  // Add employees data to database

  const createANewUserInDatabase = (user) => {
    firebase
      .firestore()
      .collection("employees")
      .doc(user.displayName)
      .set({
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
      })
      .then(() => {})
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  //Update Proflie

  const updateProfileCreated = (Name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: Name,
      })
      .then(() => {
        console.log(user);
      })
      .then(() => {
        createANewUserInDatabase(user);
      })
      .then(() => {
        setRegisteredUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Register User

  const registerNewUser = (newUser) => {
    const Name = newUser.name;
    const Email = newUser.email;
    const Password = newUser.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then(() => {
        updateProfileCreated(Name);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  //Rastrear toda la información de documentos
  const shipping = (collection, filter, num) => {
    firebase
      .firestore()
      .collection(collection)
      .where(filter, "==", num)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          if (collection === "envios") {
            querySnapshot.forEach((doc) => {
              setQuery(doc.data());
            });
          } else if (collection === "trucks") {
            querySnapshot.forEach((doc) => {
              setQuery(doc.data());
            });
          }
        } else {
          setQuery("DoesNotExist");
        }
      })
      .catch((error) => {
        console.log("Error al obtener el documento:", error);
      });
  };

  //Todos los shipping

  const allShippinsAllTime = (collection, por, order) => {
    firebase
      .firestore()
      .collection(collection)
      .orderBy(por, order)
      .get()
      .then((querySnapshot) => {
        if (collection === "envios") {
          setAllShippings([]);
          querySnapshot.forEach((doc) => {
            setAllShippings((allShippings) => [...allShippings, doc.data()]);
          });
        } else if (collection === "trucks") {
          setAllTrucks([]);
          querySnapshot.forEach((doc) => {
            setAllTrucks((allTrucks) => [...allTrucks, doc.data()]);
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //Todos los envios filtrados

  const allShippingQuery = (collection, por, order) => {
    firebase
      .firestore()
      .collection(collection)
      .where("statusEntregado", "==", false)
      .orderBy(por, order)
      .get()
      .then((querySnapshot) => {
        if (collection === "envios") {
          setAllShippings([]);
          querySnapshot.forEach((doc) => {
            setAllShippings((allShippings) => [...allShippings, doc.data()]);
          });
        } else if (collection === "trucks") {
          setAllTrucks([]);
          querySnapshot.forEach((doc) => {
            setAllTrucks((allTrucks) => [...allTrucks, doc.data()]);
          });
        }
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
      statusEntregado: false,
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
  const folio = (folioType) => {
    firebase
      .firestore()
      .collection(folioType)
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
  const updateFolio = (folioType, newFolio) => {
    firebase
      .firestore()
      .collection(folioType)
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
    firebase.firestore().collection("trucks").add({
      truck: truck,
      shippings: shippings,
      statusEntregado: false,
    });
  };

  //Actualizar el status de envio
  const updateStatus = (num, status) => {
    firebase
      .firestore()
      .collection("envios")
      .where("envio.trackingNumber", "==", num)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (status === "rute") {
            firebase.firestore().collection("envios").doc(doc.id).set(
              {
                statusEnRuta: true,
                statusEnRutaHora: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } else if (status === "domicilio") {
            querySnapshot.forEach((doc) => {
              firebase.firestore().collection("envios").doc(doc.id).set(
                {
                  statusEnDomicilio: true,
                  statusEnDomicilioHora: firebase.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );
            });
          } else if (status === "entregado") {
            querySnapshot.forEach((doc) => {
              firebase.firestore().collection("envios").doc(doc.id).set(
                {
                  statusEntregado: true,
                  statusEntregadoHora: firebase.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );
            });
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //Actualizar el status de camión

  const updateStatusTruck = (num, status) => {
    firebase
      .firestore()
      .collection("trucks")
      .where("truck.folioNumber", "==", num)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (status === "rute") {
            firebase.firestore().collection("trucks").doc(doc.id).set(
              {
                statusEnRuta: true,
                statusEnRutaHora: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } else if (status === "domicilio") {
            querySnapshot.forEach((doc) => {
              firebase.firestore().collection("trucks").doc(doc.id).set(
                {
                  statusEnDomicilio: true,
                  statusEnDomicilioHora: firebase.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );
            });
          } else if (status === "terminado") {
            querySnapshot.forEach((doc) => {
              firebase.firestore().collection("trucks").doc(doc.id).set(
                {
                  statusEntregado: true,
                  statusEntregadoHora: firebase.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );
            });
          }
        });
        setTimeout(() => {
          shipping("trucks", "truck.folioNumber", num);
        }, 1500);
      });
  };

  const logaut = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        setRegisteredUser(null);
      })
      .catch((error) => {
        console.error("Sign Out Error", error);
      });
  };

  return {
    registeredUser,
    loginUser,
    registerNewUser,
    logaut,
    error,
    query,
    shipping,
    newShipping,
    allShippingQuery,
    allShippinsAllTime,
    allShippings,
    allTrucks,
    unique,
    checkIfUnique,
    folio,
    currentFolioCount,
    updateFolio,
    updateShipping,
    newTruck,
    updateStatus,
    updateStatusTruck,
    allemployees,
    listOfEmployees,
    checkEmployee,
  };
};

export default FirebaseApp;
