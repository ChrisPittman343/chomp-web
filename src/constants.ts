export const firebaseConfig = {
  apiKey: "AIzaSyDngHhX72rp3F2gcaTe1AtIaPbEwpHAI5E",
  authDomain: "chomp-chat.firebaseapp.com",
  projectId: "chomp-chat",
  storageBucket: "chomp-chat.appspot.com",
  messagingSenderId: "152270180248",
  appId: "1:152270180248:web:8fabe2a0732cbd0034a5ed",
  measurementId: "G-EPGCLRVK5Q",
};

const isServedLocally = true;

export const BASE_URL = isServedLocally
  ? "http://localhost:5000/chomp-chat/us-central1/widgets"
  : "https://us-central1-chomp-chat.cloudfunctions.net/widgets";

export const actionKeys = [
  //"Enter", <- This shit is actually so annoying to do, but it would be pretty cool
  "Backspace",
  "Control b",
  "Control i",
  "Control `",
  "Control Shift ~",
  "Control m",
  "Control Shift M",
  "Shift (",
  "Shift {",
  "[",
  'Shift "',
  "Tab",
];

export const wrapChars = ["{}", "[]", '""', "****", "**", "``", "$$"];
