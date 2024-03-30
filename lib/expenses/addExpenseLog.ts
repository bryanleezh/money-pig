// * Function that adds to log to display what activities there are

import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function addExpenseLog(amount: number, description: string, uuid: string, currency: string, type: string, userEmail: string, bestieEmail: string) {
    const db = getFirestore(firebase_app);
    let paidFor: string[] = [];
    let paidBy: string = "";

    switch (type) {
        case "equal":
            paidFor = [userEmail, bestieEmail];
            paidBy = userEmail;
            break;
        case "indiv":
            paidFor = [userEmail];
            paidBy = userEmail;
            break;
        case "bestie":
            paidFor = [bestieEmail];
            paidBy = userEmail;
            break;
        case "bestiepay":
            paidFor = [bestieEmail];
            paidBy = bestieEmail;
            break;
        case "bestiepayforyou":
            paidFor = [userEmail];
            paidBy = bestieEmail;
            break;
        default:
            paidFor = [];
            break;
    }

    const log = {
        "desc": description,
        "log": {
            "amount": amount,
            "currency": currency,
            "paidFor": paidFor,
            "paidBy": paidBy,
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