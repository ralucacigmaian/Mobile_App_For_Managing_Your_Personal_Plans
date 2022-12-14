import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBis8skaKy0nctUSC6khjVLvxcEOA5gHUk",
    authDomain: "chsapp-6663e.firebaseapp.com",
    projectId: "chsapp-6663e",
    storageBucket: "chsapp-6663e.appspot.com",
    messagingSenderId: "1057226378837",
    appId: "1:1057226378837:web:c276cd557b2a3c990f0edc",
    measurementId: "G-VV9QDBEKHK"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };