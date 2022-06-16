import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyB9pSIMZm2PjJ3JL91oCIGZovX2fDfFebk",
    authDomain: "mychat-application-5ec28.firebaseapp.com",
    projectId: "mychat-application-5ec28",
    storageBucket: "mychat-application-5ec28.appspot.com",
    messagingSenderId: "197278267413",
    appId: "1:197278267413:web:3cebc491ee28284ff2b61c"
  }).auth();