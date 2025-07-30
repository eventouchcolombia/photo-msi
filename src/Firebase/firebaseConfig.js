// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRx6GmccpL3mnFWX8lKN-rrogTiRInjS8",
  authDomain: "photo-msi.firebaseapp.com",
  projectId: "photo-msi",
  storageBucket: "photo-msi.firebasestorage.app",
  messagingSenderId: "567901762753",
  appId: "1:567901762753:web:d068add0a83697bba5d040"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };