// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJJQamgMV0wS6bnB5XvBZGtTRickTV0d8",
  authDomain: "chalotask.firebaseapp.com",
  projectId: "chalotask",
  storageBucket: "chalotask.appspot.com",
  messagingSenderId: "235501159358",
  appId: "1:235501159358:web:c74d85218dc6073e5c2fef"
};

const fireDb=firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();