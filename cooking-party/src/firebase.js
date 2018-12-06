import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAS1abiWo5s9dkd3nYV2OFNh8m9Q4dpj2Y",
  authDomain: "cooking-party.firebaseapp.com",
  databaseURL: "https://cooking-party.firebaseio.com",
  projectId: "cooking-party",
  storageBucket: "",
  messagingSenderId: "409593497714"
};
firebase.initializeApp(config);

export default firebase;