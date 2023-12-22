import firebase_app from "../config";
import { getFirestore, doc, setDoc, PartialWithFieldValue, DocumentData } from "firebase/firestore";

const db = getFirestore(firebase_app)

type Data = string | number ;

export default async function addData(colllection: string, id: string, data: PartialWithFieldValue<DocumentData>) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
        console.log(e)
    }

    return { result, error };
}