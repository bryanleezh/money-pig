interface AccountInfoProps {
    email: string | null;
}

interface Trip {
    description: string;
    name: string;
    users: string[];
    uuid: string;
}

export type {
    AccountInfoProps,
    Trip
}