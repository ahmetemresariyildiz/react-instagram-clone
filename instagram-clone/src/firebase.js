import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import  'firebase/compat/storage';





  const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyC4tqx8R6AoAxXhYH-g3lgapSCJioWTbxo",
    authDomain: "instagram-clone-bec88.firebaseapp.com",
    databaseURL: "https://instagram-clone-bec88-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "instagram-clone-bec88",
    storageBucket: "instagram-clone-bec88.appspot.com",
    messagingSenderId: "1064066891481",
    appId: "1:1064066891481:web:611c3677a6c7a8dc8188c8",
    measurementId: "G-NL5B5WJCDY"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage =firebase.storage();

  export{db,auth,storage};