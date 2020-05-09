import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ANxCA6YdBzQf_QjZK3lnPpVyxC6I7fU",
  authDomain: "nathan-and-dans-list.firebaseapp.com",
  databaseURL: "https://nathan-and-dans-list.firebaseio.com",
  projectId: "nathan-and-dans-list",
  storageBucket: "nathan-and-dans-list.appspot.com",
  messagingSenderId: "541281162117",
  appId: "1:541281162117:web:1b8f724bde8318aa322aec"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;