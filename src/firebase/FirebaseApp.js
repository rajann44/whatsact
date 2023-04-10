import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.WHATSACT_API_KEY,
  authDomain: "whatsact-rajann44.firebaseapp.com",
  projectId: "whatsact-rajann44",
  storageBucket: "whatsact-rajann44.appspot.com",
  messagingSenderId: "1032917084290",
  appId: "1:1032917084290:web:a1c6e5753cc8c8533dac9b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const usersReference = collection(db, "users");
export const groupsReference = collection(db, "groups");
export const messagesReference = collection(db, "messages");

export default app;
