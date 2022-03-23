import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB4NmLI7QKGZOPPMAcbmyWDy9kon17XrqE",
    authDomain: "ecohub-707c9.firebaseapp.com",
    projectId: "ecohub-707c9",
    storageBucket: "ecohub-707c9.appspot.com",
    messagingSenderId: "456800598427",
    appId: "1:456800598427:web:ac58acc10964db30fac93e",
};

const app = initializeApp(firebaseConfig);

export { app };
