'use client';

import React from 'react';
import { TripInfo } from '@/lib/types';
import { ExpenseObj } from "@/lib/types";
import ExpensesViewElements from './ExpensesViewElements';

export default function ExpensesView( {tripUUID, tripData} : TripInfo ) {
    console.log(tripUUID);
    console.log(tripData);

    const tripName = tripData?.name;
    const description = tripData?.description;
    const expensesLog = tripData?.expensesLog;
    const totalExpense = tripData?.totalExpense;
    const usersExpense = tripData?.usersExpense;
    const usersExpensePaid = tripData?.usersExpensePaid;


    // TODO: Can refactor these elements into 1 component since it is a table

    const currencyElements = (elements: ExpenseObj | null) => {
        return elements ? Object.entries(elements).map(([currency, expense]) => {
            return (
                <div key={currency} className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{currency}</h3>
                    <span>{String(expense)}</span>
                </div>
            )
        }) : null;
    }

    const usersExpenseElements = usersExpense ? Object.entries(usersExpense).map(([user, expenseObj], index) => {
        if (index % 2 == 0) {
            return (
                <div key={user} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                    <h3 className="font-medium">{user}</h3>
                    <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                        {currencyElements(expenseObj as ExpenseObj)}
                    </div>
                </div>
            )
        } else {
            return (
                <div key={user} className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{user}</h3>
                    <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                        {currencyElements(expenseObj as ExpenseObj)}
                    </div>
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
                     <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                        {currencyElements(expenseObj as ExpenseObj)}
                    </div>
                </div>
            )
        } else {
            return (
                <div key={user} className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{user}</h3>
                    <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                        {currencyElements(expenseObj as ExpenseObj)}
                    </div>
                </div>
            )
        }
    }) : null;


    // TODO: Populate with all expenses + total of each currency spent in each trip
    // TODO: Add delete button for each expense (similar to deleteTrip component)
    return (
        <>
            <section className="py-6 flex justify-center">
                <div className="container grid max-w-3xl px-4 gap-6 md:gap-8 sm:grid-cols-1 sm:px-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{tripName}</h1>
                        <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                            Description : {description}
                        </p>
                    </div>
                    <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                        Total Expense
                    </p>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            <ExpensesViewElements data={totalExpense} type="total"/>
                        </div>
                    </div>
                    {/* Total Users Expense */}
                    <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                        Users Expenses
                    </p>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            {usersExpenseElements}
                            {/* <ExpensesViewElements data={totalExpense} type="usersExpense"/> */}
                        </div>
                    </div>
                    {/* Users Expense Paid */}
                    <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                        Total Expense Paid By Each User
                    </p>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            {/* {usersExpensePaidElements} */}
                        </div>
                    </div>
                    {/* All Expenses */}
                </div>
            </section>
        </>
    )
}

