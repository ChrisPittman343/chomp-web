import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { firebaseConfig } from "./constants";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const functions = firebase.functions();
