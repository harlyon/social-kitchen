import firebase from 'firebase';

// old firebase
// var config = {
//   apiKey: "AIzaSyBgjx22ZYt2yRAYcE3IqDhu4mpU2JAxb2U",
//   authDomain: "social-kitchen-e80b3.firebaseapp.com",
//   databaseURL: "https://social-kitchen-e80b3.firebaseio.com",
//   projectId: "social-kitchen-e80b3",
//   storageBucket: "social-kitchen-e80b3.appspot.com",
//   messagingSenderId: "344305376967"
// };
// firebase.initializeApp(config);

// new firebase
var config = {
  apiKey: "AIzaSyAHjnnQ0vqJCFZK4xMYfLAX9tD1PquYG3s",
  authDomain: "my-social-kitchen.firebaseapp.com",
  databaseURL: "https://my-social-kitchen.firebaseio.com",
  projectId: "my-social-kitchen",
  storageBucket: "",
  messagingSenderId: "48883199627"
};
firebase.initializeApp(config);

export default firebase;