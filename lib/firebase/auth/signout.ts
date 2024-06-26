import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function SignOut() {
    let result, error = null;

    try {
        result = await signOut(auth);
    } catch (e) {
        error = e;
    }

    return {result, error};
}