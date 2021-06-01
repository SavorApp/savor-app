import firebase from "firebase";
import Constants from "expo-constants";

const apiKey = Constants.manifest.extra?.FIREBASE_API_KEY;
const authDomain = Constants.manifest.extra?.FIREBASE_AUTH_DOMAIN;
const projectId = Constants.manifest.extra?.FIREBASE_PROJECT_ID;
const storageBucket = Constants.manifest.extra?.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = Constants.manifest.extra?.FIREBASE_MESSAGING_SENDER;
const appId = Constants.manifest.extra?.FIREBASE_APP_ID;
const measurementId = Constants.manifest.extra?.FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
