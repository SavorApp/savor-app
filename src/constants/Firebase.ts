import firebase from 'firebase';
import Constants from 'expo-constants';

const apiKey = Constants.manifest.extra?.FIREBASE_API_KEY
const authDomain = Constants.manifest.extra?.FIREBASE_AUTH_DOMAIN
const projectId = Constants.manifest.extra?.FIREBASE_PROJECT_ID
const storageBucket = Constants.manifest.extra?.FIREBASE_STORAGE_BUCKET
const messagingSenderId = Constants.manifest.extra?.FIREBASE_MESSAGING_SENDER
const appId = Constants.manifest.extra?.FIREBASE_APP_ID
const measurementId = Constants.manifest.extra?.FIREBASE_MEASUREMENT_ID
 
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
    
    // apiKey: "AIzaSyDOXvIrFJyBP8Gf2pTH9u1Zc7QGwHyXEyE",
    // authDomain: "savored-app.firebaseapp.com",
    // projectId: "savored-app",
    // storageBucket: "savored-app.appspot.com",
    // messagingSenderId: "609527545165",
    // appId: "1:609527545165:web:04fd6a7979c50e77f70b04",
    // measurementId: "G-RWM44NX7B1"

  };

  export const api = Constants.manifest.extra?.FIREBASE_API_KEY

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebase.initializeApp(firebaseConfig);

  // npm install -D ts-node