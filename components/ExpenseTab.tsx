'use client';

import { ExpenseTabProps } from "@/lib/types";
import { Tab } from "@headlessui/react";

export default function ExpenseTab( { type, submitExpense, closeModal}: ExpenseTabProps) {
    let description = "";
    switch (type) {
        case "equal":
            description = "This splits the expense equally between you and your bestie.";
            break;
        case "indiv":
            description = "This is your own individual expense.";
            break;
        case "bestie":
            description = "This expense is for your bestie only.";
            break;
        default:
            description = "";
            break;
    }
    return (
        <Tab.Panel className="rounded-xl p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <div className="flex flex-col items-center justify-center">
                <p className="text-black pb-4">{description}</p>
            </div>
            <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={submitExpense}
                >
                    Add Expense!
                </button>
                <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </Tab.Panel>
    )
}