// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM4iT3QPBWmpe7g_EgLT8JIEzlmNTKVoo",
  authDomain: "lnmiit-chatbot.firebaseapp.com",
  projectId: "lnmiit-chatbot",
  storageBucket: "lnmiit-chatbot.firebasestorage.app",
  messagingSenderId: "922983810206",
  appId: "1:922983810206:web:217a57840251ab657aa78f",
  measurementId: "G-7XFWTM00FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);