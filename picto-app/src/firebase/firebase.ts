import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAUs_lHJckdNmppQ8Fw1TBArk_m078xOxw",
  authDomain: "picto-360.firebaseapp.com",
  projectId: "picto-360",
  storageBucket: "picto-360.firebasestorage.app",
  messagingSenderId: "58871127131",
  appId: "1:58871127131:web:83945e299abb9f1a23b37e",
  measurementId: "G-BT3EZ0TEZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app,auth}