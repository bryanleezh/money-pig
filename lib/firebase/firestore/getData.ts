import { DocumentSnapshot } from "firebase/firestore/lite";
import firebase_app from "../config";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDocument(collection: string, id: string) {
    let docRef = doc(db, collection, id);

    let result: DocumentSnapshot | null = null;
    let filteredResult: object = {};
    let error: any = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}