import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBzgqMhyh_0nNxOQ8rXvhXIl73OWO03xBI",
  authDomain: "burger-queen-92025.firebaseapp.com",
  databaseURL: "https://burger-queen-92025.firebaseio.com",
  projectId: "burger-queen-92025",
  storageBucket: "burger-queen-92025.appspot.com",
  messagingSenderId: "342628368800",
  appId: "1:342628368800:web:7dda585ee4b4b367"
};

firebase.initializeApp(config);

export default firebase;