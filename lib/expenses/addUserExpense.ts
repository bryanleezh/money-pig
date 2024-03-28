// * Function that adds amount spent by person to Trip document

import { doc, getFirestore, updateDoc, increment } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function addUserExpense(amount: number, personEmail: string, uuid: string, currency: string) {
    const db = getFirestore(firebase_app);
    const tripDocRef = doc(db, 'trips', uuid);

    const atIndex = personEmail.lastIndexOf('@');
    if (atIndex !== -1) {
        personEmail = personEmail.substring(0, atIndex);
    }

    try {
        await updateDoc(tripDocRef, {
            [`usersExpense.${personEmail}.${currency}`]: increment(amount)
        });
        console.log(`Added ${amount} ${currency} spent by ${personEmail}`);
    } catch (err) {
        console.error("Error adding user expense: ", err);
    }

}