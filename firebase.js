import {initializeApp} from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup
} from "firebase/auth";

// Firebase config data
const firebaseConfig = {
    apiKey: "AIzaSyAwbABZDwJJuYQcpNUrZryFxqgqrsV8ryU",
    authDomain: "badbank-mern-ad70a.firebaseapp.com",
    projectId: "badbank-mern-ad70a",
    storageBucket: "badbank-mern-ad70a.appspot.com",
    messagingSenderId: "677900496011",
    appId: "1:677900496011:web:75cf9c7d106a5b02a4388e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    /* Creating user in MongoDB database */
    const name = user.displayName;
    const email = user.email;
    const password = user.uid;
    const url = `/api/account/createGoogleMongo/${name}/${email}/${password}`;
    const apiCreateAccount = async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      if (data.error) {
        console.log("Google sign in - MongoDB create user error:", data.error);
      } else {
        console.log("Google sign in - User created in MongoDB success")
      }
    };
    apiCreateAccount();
    /* --------------------------------- */
    console.log("Google user logged in:", user.email);
    console.log("Google sign in user data:", user);
    return user.email;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  signInWithGoogle,
};