import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDikZt49arrlN6CimsTB9nVNDvanP1Nk5M",
  authDomain: "f-app-273d0.firebaseapp.com",
  databaseURL: "https://f-app-273d0.firebaseio.com",
  projectId: "f-app-273d0",
  storageBucket: "f-app-273d0.appspot.com",
  messagingSenderId: "701901936271"
};
const fire = firebase.initializeApp(config);

export default fire;