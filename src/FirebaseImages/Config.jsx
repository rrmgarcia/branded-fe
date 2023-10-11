import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMCqnc0-Hs-D-icIxQ-Tx0jDITnvy0G1w",
  authDomain: "branded-8c11e.firebaseapp.com",
  projectId: "branded-8c11e",
  storageBucket: "branded-8c11e.appspot.com",
  messagingSenderId: "941904227375",
  appId: "1:941904227375:web:2f7c29efd166a16e81eada",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDB = getStorage(app);

export default imageDB
