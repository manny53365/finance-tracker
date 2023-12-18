import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD1vhXMK_yXLiFZNQMFaeL_rgXYej-kZ3s",
    authDomain: "finance-app-d4541.firebaseapp.com",
    projectId: "finance-app-d4541",
    storageBucket: "finance-app-d4541.appspot.com",
    messagingSenderId: "365800216798",
    appId: "1:365800216798:web:29b138bcd56405d7f98a4f",
    measurementId: "G-FH3TFNE8P0"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp }
