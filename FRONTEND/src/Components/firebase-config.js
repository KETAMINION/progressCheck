import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCsQf1XfVCIDxWlrT-KGod1R_hxm5uYm0A",
    authDomain: "progresscheck-3c83c.firebaseapp.com",
    projectId: "progresscheck-3c83c",
    storageBucket: "progresscheck-3c83c.appspot.com",
    messagingSenderId: "353635533735",
    appId: "1:353635533735:web:9f05216c578f32f0afac82",
    measurementId: "G-HSLJZGDT7X"
  };

  const app = initializeApp(firebaseConfig)

  export const auth = getAuth(app)