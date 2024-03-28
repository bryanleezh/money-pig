// * Function that adds amount spent by the person logging it

import { doc, getFirestore, updateDoc, increment } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function addUserExpensePaid(amount: number, payerEmail: string, uuid: string, currency: string) {
    const db = getFirestore(firebase_app);
    const tripDocRef = doc(db, 'trips', uuid);

    const atIndex = payerEmail.lastIndexOf('@');
    if (atIndex !== -1) {
        payerEmail = payerEmail.substring(0, atIndex);
    }

    try {
        await updateDoc(tripDocRef, {
            [`usersExpensePaid.${payerEmail}.${currency}`]: increment(amount)
        });
        console.log(`Added ${amount} ${currency} paid by ${payerEmail}`);
    } catch (err) {
        console.error("Error adding user expense: ", err);
    }
}