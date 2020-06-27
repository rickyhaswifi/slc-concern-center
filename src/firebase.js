
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database'

export const app = firebase.initializeApp ({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_UTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
});

// Initialize Firebase - WOorks for realtime databasa
// var fireDb = firebase.initializeApp(firebaseConfig);
// export default fireDb.database().ref();  

// Works for auth only
//export default app;

export const database = app.database().ref(); 