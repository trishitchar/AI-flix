// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5QuyB-cMSPVhaqIsCKkY9S9CWLcscllY",
  authDomain: "ai-flix-57405.firebaseapp.com",
  projectId: "ai-flix-57405",
  storageBucket: "ai-flix-57405.appspot.com",
  messagingSenderId: "229517533619",
  appId: "1:229517533619:web:bd286888dfeb90aad92bc6",
  measurementId: "G-3E11Z57H9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// same code is needed in every component so make it global
export const auth = getAuth()

/*

firebase login
firebase init
{
  "hosting": {
    "site": "ai-flix-trishit",

    "public": "public",
    ...
  }
}
firebase deploy --only hosting:ai-flix-trishit

*/

