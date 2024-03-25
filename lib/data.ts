import { Plane, CircleUserRound, GanttChartSquare } from "lucide-react";


// data for navbar info
export const navbarLinks = [
    {
        title: "Trips",
        url: "/trips",
        icon: Plane,
    },
    {
        title: "Activity",
        url: "/activity",
        icon: GanttChartSquare,
    },
    {
        title: "Account",
        url: "/account",
        icon: CircleUserRound,
    },
]

export const currencies = [
    { currency: 'Australian Dollar', label: 'AUD' },
    { currency: 'Brazilian Real', label: 'BRL' },
    { currency: 'Canadian Dollar', label: 'CAD' },
    { currency: 'Swiss Franc', label: 'CHF' },
    { currency: 'Chinese Yuan', label: 'CNY' },
    { currency: 'Danish Krone', label: 'DKK' },
    { currency: 'Euro', label: 'EUR' },
    { currency: 'British Pound Sterling', label: 'GBP' },
    { currency: 'Hong Kong Dollar', label: 'HKD' },
    { currency: 'Hungarian Forint', label: 'HUF' },
    { currency: 'Indian Rupee', label: 'INR' },
    { currency: 'Japanese Yen', label: 'JPY' },
    { currency: 'South Korean Won', label: 'KRW' },
    { currency: 'Mexican Peso', label: 'MXN' },
    { currency: 'Norwegian Krone', label: 'NOK' },
    { currency: 'New Zealand Dollar', label: 'NZD' },
    { currency: 'Swedish Krona', label: 'SEK' },
    { currency: 'Singapore Dollar', label: 'SGD' },
    { currency: 'Turkish Lira', label: 'TRY' },
    { currency: 'US Dollar', label: 'USD' },
    { currency: 'Russian Ruble', label: 'RUB' },
    { currency: 'South African Rand', label: 'ZAR' },
  ];
  
  export const tabs = [
    'Equal',
    "For yourself",
    "For bestie",
    "Bestie pays",
    "Bestie pays for you",
    // TODO: For future update on separate expense type
    // 'Unequal',
    // 'Percentage',
  ]