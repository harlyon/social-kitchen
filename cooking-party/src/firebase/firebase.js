import firebase from 'firebase';

// JONATHAN'S FIREBASE
var config = {
  apiKey: "AIzaSyBgjx22ZYt2yRAYcE3IqDhu4mpU2JAxb2U",
  authDomain: "social-kitchen-e80b3.firebaseapp.com",
  databaseURL: "https://social-kitchen-e80b3.firebaseio.com",
  projectId: "social-kitchen-e80b3",
  storageBucket: "social-kitchen-e80b3.appspot.com",
  messagingSenderId: "344305376967"
};
firebase.initializeApp(config);

export default firebase;