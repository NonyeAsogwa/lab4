import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADxyvijEq5KmM_-bs09jiT6Insn-zjE7c",
    authDomain: "lab4react-f981a.firebaseapp.com",
    projectId: "lab4react-f981a",
    storageBucket: "lab4react-f981a.appspot.com",
    messagingSenderId: "577331277107",
    appId: "1:577331277107:web:7ee9f8f5ccccaa0ad86246"
  };
  
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;