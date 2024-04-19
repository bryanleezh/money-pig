// * Function that deletes expense on user document

import { DocumentData, DocumentReference, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function deleteUserExpense(user: string, currency: string, amount: number) {
    const db = getFirestore(firebase_app);
    const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, 'users', user);

    try {
        let userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData && userData.totalExpense) {
                const totalExpense = userData.totalExpense;

                if (totalExpense[currency]) {
                    totalExpense[currency] -= amount;

                    await updateDoc(userDocRef, { totalExpense });
                    console.log(`Successfully decremented ${amount} from ${currency} in totalExpense for user ${user}!`);
                } else {
                    console.error(`Currency ${currency} not found in totalExpense!`);
                }
            } else {
                console.error(`totalExpense not found in user document!`);
            }
        } else {
            console.error(`User document for ${user} does not exist!`);
        }
    } catch (err) {
        console.error("Error fetching user document: ", err);
    }
}