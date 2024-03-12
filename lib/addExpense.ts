// * 3 ways to split: Exact, Equal, Percentage
// * Can Create Expense class, extend the 3 ways out of Expense Class

import { arrayUnion, doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "./firebase/config";

// * Params: 
// * from, to -> user index in trip data
// * from -> user that needs to pay
// * to -> user that receives the money (the one that paid 1st)
// * totalAmt -> total amount of expense (used to compute how much to add based on expense type)
// ! type has been removed to be placed in a separate function
export default async function addExpense( from: number, to: number, amount: number, uuid: string ) {
    // TODO: Add to firebase under trips -> indiv user expense
    const db = getFirestore(firebase_app);
    const transaction = [from, to, amount];
    const tripDocRef = doc(db, 'trips', uuid);

    try {
        await setDoc(tripDocRef,
                {
                    expenses: arrayUnion(transaction),
                },
                { merge: true }
            );
        console.log(`Expense data added to trip: ${uuid}`);
    } catch (err) {
        console.log("Error adding expense", err);
    }
}