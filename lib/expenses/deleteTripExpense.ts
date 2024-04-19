// * Function that deletes expense on trip document
// * deletes specific expense from expenseLog using index
// * subtract amount from currency in totalExpense
// * subtract amount from currency in usersExpense
// * subtract amount from currency in usersExpensePaid

import { DocumentData, DocumentReference, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function deleteTripExpense(uuid: string, paidFor: string[], paidBy: string, currency: string, amount: number, index: number, transactionType: string) {
    const db = getFirestore(firebase_app);
    const tripDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, 'trips', uuid);

    let calculatedAmount = amount;
    if (transactionType === "equal") {
        calculatedAmount = calculatedAmount / 2;
    }

    const paidByIndex = paidBy.lastIndexOf('@');
    if (paidByIndex !== -1 ) {
        paidBy = paidBy.substring(0, paidByIndex);
    }

    try {
        let tripDocSnap = await getDoc(tripDocRef);

        if (tripDocSnap.exists()) {
            const tripData = tripDocSnap.data();
            if (tripData) {
                const { expensesLog, totalExpense, usersExpense, usersExpensePaid } = tripData;

                // remove from expenseLog
                const updatedExpensesLog = expensesLog.filter((_: any, i: number) => i !== index);
                
                // remove from totalExpense
                const updatedTotalExpense = { ...totalExpense };
                updatedTotalExpense[currency] -= amount;
                
                // remove from usersExpense
                const updatedUsersExpense = { ...usersExpense };
                paidFor.forEach((user) => {
                    const atIndex = user.lastIndexOf('@');
                    if (atIndex !== -1) {
                        user = user.substring(0, atIndex);
                    }
                    if (updatedUsersExpense[user]) {
                        updatedUsersExpense[user][currency] -= calculatedAmount;
                    }
                });
                
                // remove from usersExpensePaid
                const updatedUsersExpensePaid = { ...usersExpensePaid };
                if (updatedUsersExpensePaid[paidBy]) {
                    updatedUsersExpensePaid[paidBy][currency] -= amount;
                }

                await updateDoc(tripDocRef, {
                    expensesLog: updatedExpensesLog,
                    totalExpense: updatedTotalExpense,
                    usersExpense: updatedUsersExpense,
                    usersExpensePaid: updatedUsersExpensePaid
                });

                console.log("Expense deleted successfully");
            }
        } else {
            console.error(`Trip document for ${uuid} does not exist!`);
        }

    } catch (err) {
        console.error("Error fetching trip document:  ", err);
    }
}