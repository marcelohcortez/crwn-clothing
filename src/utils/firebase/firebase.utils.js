import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA68X48TVyb7BKymuKO05Vyl-H4QIssDEw",
    authDomain: "crwn-clothing-db-ab00c.firebaseapp.com",
    projectId: "crwn-clothing-db-ab00c",
    storageBucket: "crwn-clothing-db-ab00c.appspot.com",
    messagingSenderId: "340072546064",
    appId: "1:340072546064:web:7ebbadc65332e8a56a6f95"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch(error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
}
