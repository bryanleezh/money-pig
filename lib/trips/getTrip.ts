// * Function to get the trip document using tripUUID

import { DocumentData, DocumentReference, doc, getDoc, getFirestore } from "firebase/firestore";
import firebase_app from "../firebase/config";

export default async function getTrip(uuid: string) {
    const db = getFirestore(firebase_app);
    const tripDocRef: DocumentReference<DocumentData> = doc(db, 'trips', uuid);

    try {
        const tripSnapshot = await getDoc(tripDocRef);
    
        if (tripSnapshot.exists()) {
            const tripData: DocumentData = tripSnapshot.data();
            return tripData;
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (err) {
        console.error("Error fetching trip document: ", err);
        return null;
    }
}