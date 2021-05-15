// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseApp = !firebase.apps.length ? (firebase.initializeApp(
  {
    apiKey: "AIzaSyADCy9GL5HQ20sUsLnBDXNlKLUGInPs7N8",
    authDomain: "instagram-clone-4a1cf.firebaseapp.com",
    databaseURL: "https://instagram-clone-4a1cf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "instagram-clone-4a1cf",
    storageBucket: "instagram-clone-4a1cf.appspot.com",
    messagingSenderId: "578725884639",
    appId: "1:578725884639:web:d1060d2648372a64bc2f6a",
    measurementId: "G-XW2PVFE3HF"  
  }
)) : (firebase.app()) ;

const database = firebaseApp.database();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db, auth, storage, database, firebaseApp };