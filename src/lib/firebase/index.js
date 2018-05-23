import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import config from "./config";

firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId
});

export const database = firebase.database;
export const auth = firebase.auth;

export default firebase;
