import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyALQtOY_sqrvmdur2a1PsFna6rD1iATBIc',
    authDomain: 'library-a9970.firebaseapp.com',
    projectId: 'library-a9970',
    storageBucket: 'library-a9970.appspot.com',
    messagingSenderId: '1062845097694',
    appId: '1:1062845097694:web:f57d63e2558384f3e5444f',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;
