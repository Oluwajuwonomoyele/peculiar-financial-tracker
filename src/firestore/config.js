import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCSwWiU4LMoJvo0BJArVN4PlBPyKMP2M88",
    authDomain: "peculiar-financial-tracker.firebaseapp.com",
    projectId: "peculiar-financial-tracker",
    storageBucket: "peculiar-financial-tracker.appspot.com",
    messagingSenderId: "679031299690",
    appId: "1:679031299690:web:8eea0ae4932192a7a57413"
  };

  firebase.initializeApp(firebaseConfig);

  const store = firebase.firestore();
  const auth = firebase.auth()

  const timestamp = firebase.firestore.Timestamp

  export { store, auth, timestamp }