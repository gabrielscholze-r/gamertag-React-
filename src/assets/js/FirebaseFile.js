import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBqi1nWuiW1xbH7WIfPZ7aWHE1U56XN-70",
    authDomain: "gamertag-ac382.firebaseapp.com",
    projectId: "gamertag-ac382",
    storageBucket: "gamertag-ac382.appspot.com",
    messagingSenderId: "13947956350",
    appId: "1:13947956350:web:64ad23c6171721f1fe7c2f",
    measurementId: "G-ZD6QP59XJY"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

export default database;