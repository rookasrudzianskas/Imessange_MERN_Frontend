import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAQ7jLQczjbSkOqNQaG9zBNjgKu92Mk_gQ",
    authDomain: "rookas-imessage-mern-app.firebaseapp.com",
    projectId: "rookas-imessage-mern-app",
    storageBucket: "rookas-imessage-mern-app.appspot.com",
    messagingSenderId: "383445998242",
    appId: "1:383445998242:web:af5f066cc90b96a11e55fb",
    measurementId: "G-844MYFTZJ5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
