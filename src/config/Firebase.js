import firebase from "firebase";

import "firebase/firestore";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDyK4PI5JFoKo23on7RTMEVZxlMpsLRRsI",
  authDomain: "arcafeed.firebaseapp.com",
  databaseURL: "https://arcafeed-default-rtdb.firebaseio.com",
  projectId: "arcafeed",
  storageBucket: "arcafeed.appspot.com",
  messagingSenderId: "95104512746",
  appId: "1:95104512746:web:d3a3a0fc58bc22110ddd93",
  measurementId: "G-ZYWPY2M7FC",
});

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true,
  merge: true,
});

const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();

// handles user session persistence
// auth
//   .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//   .then(() => {
//     console.log("user stored");
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyBQDW8W-76hJsA9QCQLTTq6gln0VNc2qiM",
//   authDomain: "detectly.firebaseapp.com",
//   projectId: "detectly",
//   storageBucket: "detectly.appspot.com",
//   messagingSenderId: "684850200186",
//   appId: "1:684850200186:web:c0a6320c9087f4e99105c3",
// });

export { db, auth, storage, firebaseApp, googleProvider, FacebookProvider };
