import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDAGF_ymrqM9CUx4HyuKZPyIsWnT8dTAJ0",
    authDomain: "my-magazine-project-cd6dc.firebaseapp.com",
    projectId: "my-magazine-project-cd6dc",
    storageBucket: "my-magazine-project-cd6dc.appspot.com",
    messagingSenderId: "367842699176",
    appId: "1:367842699176:web:9263466ae0cd19697c1f9d",
    measurementId: "G-PB00WLM21V"
  };

  firebase.initializeApp(firebaseConfig);

  const apiKey = firebaseConfig.apiKey;
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  
  export{auth, apiKey, firestore, storage};