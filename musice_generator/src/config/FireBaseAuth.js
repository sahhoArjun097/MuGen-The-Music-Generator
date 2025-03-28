
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAz8s7RGIVaEEbd_SwbamKp2-E4CkSjIPk",
  authDomain: "mugen-ai.firebaseapp.com",
  projectId: "mugen-ai",
  storageBucket: "mugen-ai.firebasestorage.app",
  messagingSenderId: "539512134064",
  appId: "1:539512134064:web:7ddd2bd07f21460b7b1e75"
};


const app = initializeApp(firebaseConfig);
const auth  = getAuth(app)
const provider = new GoogleAuthProvider();


export { auth, provider };



export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      return result
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };