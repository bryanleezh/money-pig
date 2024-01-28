import { DeleteResult } from "@/lib/types";
import firebase_app from "../config";
import { getFirestore, doc, deleteDoc, DocumentData } from "firebase/firestore";

const db = getFirestore(firebase_app);

// this function deletes a document from a particular collection
// params: collection : string, documentid : string
export default async function deleteData(
  collection: string,
  id: string
): Promise<DeleteResult> {
  let result: string | null = null;
  let error: any = null;

  try {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);
    result = `Document with ID ${id} successfully deleted from collection ${collection}.`;
  } catch (e) {
    error = e;
    console.error(e);
  }

  return { result, error };
}
