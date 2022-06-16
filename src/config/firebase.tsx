import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANUix0ZLiHCbyAQvfdMz7P2r-ufg9zIBk",
  authDomain: "farmgeneration-aa373.firebaseapp.com",
  databaseURL: "https://farmgeneration-aa373-default-rtdb.firebaseio.com",
  projectId: "farmgeneration-aa373",
  storageBucket: "farmgeneration-aa373.appspot.com",
  messagingSenderId: "273415309566",
  appId: "1:273415309566:web:8815adbe30259c13fd7daf",
  measurementId: "G-F1E37QPDLY"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestore = getFirestore(app);

export default app;