'use client';

import React from 'react';
import { TripInfo } from '@/lib/types';

export default function ExpensesView( {tripUUID, tripData} : TripInfo ) {
    console.log(tripUUID);
    console.log(tripData);

    const tripName = tripData?.name;
    const description = tripData?.description;
    const expensesLog = tripData?.expensesLog;
    const totalExpense = tripData?.totalExpense;
    const usersExpense = tripData?.usersExpense;
    const usersExpensePaid = tripData?.usersExpensePaid;

    const totalExpenseElements = totalExpense ? Object.entries(totalExpense).map(([currency, expense], index) => {
        if (index % 2 == 0) {
            return (
                <div key={currency} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                    <h3 className="font-medium">{currency}</h3>
                    <span>{String(expense)}</span>
                </div>
            )
        } else {
            return (
                <div key={currency} className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{currency}</h3>
                    <span>{String(expense)}</span>
                </div>
            )
        }
    }) : null;

    const usersExpenseElements = usersExpense ? Object.entries(usersExpense).map(([user, expenseObj], index) => {
        if (index % 2 == 0) {
            return (
                <div key={user} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                    <h3 className="font-medium">{user}</h3>
                    {/* <span>{String(expense)}</span> */}
                </div>
            )
        } else {
            return (
                <div key={user} className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{user}</h3>
                    {/* <span>{String(expense)}</span> */}
                </div>
            )
        }
    }) : null;

    const usersExpensePaidElements = usersExpensePaid ? Object.entries(usersExpensePaid).map(([user, expenseObj], index) => {
        if (index % 2 == 0) {
            return (
                <div key={user} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                    <h3 className="font-medium">{user}</h3>
                    {/* <span>{String(expense)}</span> */}
                </div>
            )
        } else {
            return (
                <div key={user} className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{user}</h3>
                    {/* <span>{String(expense)}</span> */}
                </div>
            )
        }
    }) : null;


    // TODO: Populate with all expenses + total of each currency spent in each trip
    // TODO: Add delete button for each expense (similar to deleteTrip component)
    return (
        <>
            <section className="w-full py-6 flex justify-center">
                <div className="container grid max-w-3xl px-4 gap-6 md:gap-8 sm:grid-cols-1 sm:px-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{tripName}</h1>
                        <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                            {description}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            {totalExpenseElements}
                        </div>
                    </div>
                    {/* Total Users Expense */}
                    {/* <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            {usersExpenseElements}
                        </div>
                    </div> */}
                    {/* Users Expense Paid */}
                    {/* <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            {usersExpensePaidElements}
                        </div>
                    </div> */}
                    {/* All Expenses */}
                </div>
            </section>
        </>
    )
}

