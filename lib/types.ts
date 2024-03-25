import { DocumentData, FirestoreError } from "firebase/firestore";
import { StaticImageData } from "next/image";

interface AccountInfoProps {
    email: string | null;
}

interface AccountCardProps {
    image: StaticImageData;
    email: string | null;
    username: string | null;
    tripCount: number | null;
    totalExpense: number | null;
}

interface Trip {
    description: string;
    name: string;
    users: string[];
    id: string;
}

interface TripUuid {
    tripUUID: string;
}

interface TripInfo extends TripUuid {
    tripData: DocumentData | undefined;
}

interface AddDataResult {
    result: string | null;
    error: FirestoreError | null;
  }

interface DeleteResult {
    result: string | null;
    error: any;
}

interface ExpenseTabProps {
    type: "equal" | "indiv" | "bestie" | "bestiepay" | "bestiepayforyou";
    submitExpense: () => void;
    closeModal: () => void;
}

export type {
    AccountInfoProps,
    AccountCardProps,
    Trip,
    TripUuid,
    TripInfo,
    AddDataResult,
    DeleteResult,
    ExpenseTabProps,
}