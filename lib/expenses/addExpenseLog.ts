// * Function that adds to log to display what activities there are

import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function addExpenseLog(amount: number, description: string, uuid: string, currency: string, type: string) {
    const db = getFirestore(firebase_app);
    const log = {
        "desc": description,
        "log": {
            "amount": amount,
            "currency": currency
        },
        "timeStamp": new Date(),
        "transactionType": type
    };

    try {
        const tripDocRef = doc(db, 'trips', uuid);
        await updateDoc(tripDocRef, {
            expensesLog: arrayUnion(log)
        });
        console.log("Expense log successfully added");
    } catch (err) {
        console.error("Error adding expense log: ", err);
    }

}