// * Function that adds amount spent by the person logging it

import { doc, getFirestore, updateDoc, increment } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function addUserExpensePaid(amount: number, payerEmail: string, uuid: string, currency: string) {
    const db = getFirestore(firebase_app);
    const tripDocRef = doc(db, 'trips', uuid);

    try {
        await updateDoc(tripDocRef, {
            [`usersExpensePaid.${payerEmail}.${currency}`]: increment(amount)
        });
        console.log(`Added ${amount} ${currency} spent by ${payerEmail}`);
    } catch (err) {
        console.error("Error adding user expense: ", err);
    }
}