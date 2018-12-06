import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCmITKMzPgouetH1pbECwvEC2__i1HYD14",
  authDomain: "social-kitchen-f0d8c.firebaseapp.com",
  databaseURL: "https://social-kitchen-f0d8c.firebaseio.com",
  projectId: "social-kitchen-f0d8c",
  storageBucket: "social-kitchen-f0d8c.appspot.com",
  messagingSenderId: "519935737387"
};
firebase.initializeApp(config);


export default firebase;