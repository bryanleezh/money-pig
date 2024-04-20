import { DeleteResult } from "@/lib/types";
import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// This function deletes a particular trip from a user's document in the 'trips' map
// Params: userEmail: string, tripId: string
export default async function deleteTripFromUser(
  userEmail: string,
  tripId: string
): Promise<DeleteResult> {
  let result: string | null = null;
  let error: any = null;

  try {
    // Get reference to the user's document
    const userDocRef = doc(db, 'users', userEmail);
    
    // Get the user's document data
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      // Get the current trips map from the user's document data
      const trips = userDocSnapshot.data()?.trips || {};

      // Check if the trip to delete exists in the trips map
      if (trips.hasOwnProperty(tripId)) {
        // Delete the trip entry from the trips map
        delete trips[tripId];

        // Update the user's document with the modified trips map
        await updateDoc(userDocRef, { trips });

        result = `Trip with ID ${tripId} successfully deleted from user ${userEmail}'s trips.`;
      } else {
        error = `Trip with ID ${tripId} not found in user ${userEmail}'s trips.`;
      }
    } else {
      error = `User with email ${userEmail} not found.`;
    }
  } catch (e) {
    error = e;
    console.error(e);
  }

  return { result, error };
}
