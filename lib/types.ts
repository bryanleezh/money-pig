interface AccountInfoProps {
    email: string | null;
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

export type {
    AccountInfoProps,
    Trip,
    TripUuid,
}