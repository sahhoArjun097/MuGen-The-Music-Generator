
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
      console.log("User signed in:", user);
      return result
      
      // Send user data to backend
    //   await fetch("http://localhost:5000/api/auth/google-login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       name: user.displayName,
    //       email: user.email,
    //       profilePic: user.photoURL,
    //     }),
    //   });
  
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };