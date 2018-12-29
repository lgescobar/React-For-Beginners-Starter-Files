import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAxcm5kGQcX8hwWeFPd5FAWU6lW4Wtsrp0",
  authDomain: "catch-of-the-day-luis-garcia.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-luis-garcia.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export {firebaseApp};

// This is the default export
export default base;
