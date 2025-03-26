
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {

};


const app = initializeApp(firebaseConfig);
const auth  = getAuth(app)
const provider = new GoogleAuthProvider();


export { auth, provider };



export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    //   console.log("User signed in:", user);
      return result
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };