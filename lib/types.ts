import { DocumentData } from "firebase/firestore";
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
    uuid: string;
}

interface TripUuid {
    tripUUID: string;
}

interface TripInfo extends TripUuid {
    tripData: DocumentData | undefined;
}

export type {
    AccountInfoProps,
    AccountCardProps,
    Trip,
    TripUuid,
    TripInfo,
}