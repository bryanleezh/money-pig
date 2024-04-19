// * Function that deletes expense on user document

import { doc, getFirestore } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function deleteUserExpense(uuid: string, currency: string, amount: number, user: string) {
    const db = getFirestore(firebase_app);
    const userDocRef = doc(db, 'users', uuid);
    
}