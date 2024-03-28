// * Function that adds amount spent by person to User document in FireBase

import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function addExpenseToUserDoc(amount: number, email: string, currency: string) {
    const db = getFirestore(firebase_app);
    const userDocRef = doc(db, 'users', email);

    try {
        await updateDoc(userDocRef, {
            [`totalExpense.${currency}`]: increment(amount)
        });
        console.log(`Added ${amount} ${currency} spent by ${email}`);
    } catch (err) {
        console.error('Error adding expense to user: ', err);
    }
}