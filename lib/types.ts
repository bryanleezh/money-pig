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
    totalExpense: Record<string, number> | null;
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

interface DeleteTripsProps extends TripUuid {
    tripData: Trip;
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

interface ExpenseObj {
    [currency: string]: number;
}

interface ElementsObj {
    type: "total" | "usersExpense" | "usersExpensePaid";
    data: ExpenseObj;
}

interface LogObj {
    desc: string;
    log: {
    amount: number;
    currency: string;
    paidBy: string;
    paidFor: string[];
    };
    timeStamp: {
        nanoseconds: number;
        seconds: number;
    };
    transactionType: string;
};

interface ExpensesLogTableProps {
    data: LogObj[];
    tripUUID: string;
}

interface DeleteExpenseProps {
    tripUUID: string;
    data: LogObj;
    index: number;
}

interface Activity {
    activityType: string;
    desc: string;
    timestamp: number;
}

interface IndivActivityProps {
    data: Activity;
    type: string;
}

export type {
    AccountInfoProps,
    AccountCardProps,
    Trip,
    TripUuid,
    TripInfo,
    DeleteTripsProps,
    AddDataResult,
    DeleteResult,
    ExpenseTabProps,
    ExpenseObj,
    ElementsObj,
    LogObj,
    ExpensesLogTableProps,
    DeleteExpenseProps,
    Activity,
    IndivActivityProps,
}