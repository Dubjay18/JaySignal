import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA7eLbxLwbWLQrbieuFgTiv-f8BECS253E",
  authDomain: "signal-clone-c806e.firebaseapp.com",
  projectId: "signal-clone-c806e",
  storageBucket: "signal-clone-c806e.appspot.com",
  messagingSenderId: "45021957010",
  appId: "1:45021957010:web:96a9da936010321aa24f4b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth, app };
