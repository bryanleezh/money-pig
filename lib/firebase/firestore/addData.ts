import firebase_app from "../config";
import { getFirestore, doc, setDoc, PartialWithFieldValue, DocumentData, FirestoreError } from "firebase/firestore";

const db = getFirestore(firebase_app);

interface AddDataResult {
  result: string | null;
  error: FirestoreError | null;
}

export default async function addData(
  collection: string,
  id: string,
  data: PartialWithFieldValue<DocumentData>
): Promise<AddDataResult> {
  let result: string | null = null;
  let error: FirestoreError | null = null;

  try {
    await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
    result = `Document with ID ${id} successfully added to collection ${collection}.`;
  } catch (e: unknown) {
    // Explicitly type the caught error
    if (e instanceof FirestoreError) {
      error = e;
      console.error(e);
    } else {
      throw e; // Re-throw if it's not a FirestoreError
    }
  }

  return { result, error };
}
