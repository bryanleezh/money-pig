// * Function that adds activity to user document

import { DocumentData, DocumentReference, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { Activity } from "../types";

// * activityType = "add trip" | "add expense" | "delete trip" | "delete expense"
// * desc => trip name or expense name
export default async function addActivity(user: string, activityType: string, desc: string) {
    const db = getFirestore(firebase_app);
    const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(db, 'users', user);
    
    try {
        // Get the current user document
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            // Get the current activity array
            const userDocData = userDocSnap.data();
            if (userDocData && userDocData.activity && Array.isArray(userDocData.activity)) {
                const activityArray: Activity[] = userDocData.activity;

                // Add the new activity object to the activity array
                const newActivity: Activity = {
                    activityType,
                    desc,
                    timestamp: Date.now(),
                };
                activityArray.push(newActivity);

                // Update the user document with the modified activity array
                await setDoc(userDocRef, { activity: activityArray }, { merge: true });
                console.log(`Activity successfully added to ${user}`);
            } else {
                console.error("Activity array not found in user document");
            }
        } else {
            console.error(`User document for ${user} does not exist`);
        }
    } catch (err) {
        console.error("Error adding activity: ", err);
    }

}