import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4NmLI7QKGZOPPMAcbmyWDy9kon17XrqE",
    authDomain: "ecohub-707c9.firebaseapp.com",
    projectId: "ecohub-707c9",
    storageBucket: "ecohub-707c9.appspot.com",
    messagingSenderId: "456800598427",
    appId: "1:456800598427:web:ac58acc10964db30fac93e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
