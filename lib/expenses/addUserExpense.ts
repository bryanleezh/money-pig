// * Function that adds amount spent by person
// ! Need to fix .com issue in firebase

import { doc, getFirestore, updateDoc, increment } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function addUserExpense(amount: number, personEmail: string, uuid: string, currency: string) {
    const db = getFirestore(firebase_app);
    const tripDocRef = doc(db, 'trips', uuid);

    try {
        await updateDoc(tripDocRef, {
            [`usersExpense.${personEmail}.${currency}`]: increment(amount)
        });
        console.log(`Added ${amount} ${currency} spent by ${personEmail}`);
    } catch (err) {
        console.error("Error adding user expense: ", err);
    }

}