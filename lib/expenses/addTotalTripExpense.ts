// * Function that adds to total trip to show how much has been spent throughout the entire trip

import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";


export default async function addTotalTripExpense(amount: number, uuid: string, currency: string) {
    const db = getFirestore(firebase_app);
    const tripDocRef = doc(db, 'trips', uuid);

    try {
        const tripDocSnap = await getDoc(tripDocRef);
        const tripData = tripDocSnap.data();
        let totalExpense = tripData?.totalExpense ?? {};

        const newTotal = (totalExpense[currency] || 0) + amount;

        await updateDoc(tripDocRef, {
            totalExpense: {
                ...totalExpense,
                [currency]: newTotal
            }
        });
        console.log(`Total trip expenses updated for ${currency} in trip: ${uuid}`);
    } catch (err) {
        console.error("Error adding total trip expense", err);
    }
}