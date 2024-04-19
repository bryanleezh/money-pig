'use client';

import React from 'react';
import { ExpenseObj, LogObj, TripInfo } from '@/lib/types';
import ExpensesViewElements from './ExpensesViewElements';
import ExpensesLogTable from './ExpensesLogTable';

export default function ExpensesView( {tripUUID, tripData} : TripInfo ) {
    // console.log(tripUUID);
    // console.log(tripData);

    const tripName: string = tripData?.name;
    const description: string = tripData?.description;
    const expensesLog: LogObj[] = tripData?.expensesLog;
    const totalExpense: ExpenseObj = tripData?.totalExpense;
    const usersExpense = tripData?.usersExpense;
    const usersExpensePaid = tripData?.usersExpensePaid;

    // if no data, display no data available
    if (Object.keys(totalExpense).length === 0) return (
        <section className="py-6 flex justify-center">
            <div className="container grid max-w-3xl px-4 gap-6 md:gap-8 sm:grid-cols-1 sm:px-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{tripName}</h1>
                    <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                        Description : {description}
                    </p>
                </div>
                <div className='container grid max-w-3xl sm:grid-cols-1 md:grid-cols-3'>
                    <div className='md:px-1'>
                        <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                            No expenses available, add some expenses to get started!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )


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
                    <div className='container grid max-w-3xl sm:grid-cols-1 md:grid-cols-3'>
                        <div className='md:px-1'>
                            <p className="total-expense text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                                Total Expense
                            </p>
                            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                                    <ExpensesViewElements data={totalExpense} type="total"/>
                                </div>
                            </div>
                        </div>
                        <div className='md:px-1'>
                            {/* Total Users Expense */}
                            <p className="user-expenses text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                                Users Expenses
                            </p>
                            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                                    <ExpensesViewElements data={usersExpense} type="usersExpense"/>
                                </div>
                            </div>
                        </div>
                        <div className='md:px-1'>
                            {/* Users Expense Paid */}
                            <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                                Total Expense Paid By Each User
                            </p>
                            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                                <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                                    <ExpensesViewElements data={usersExpensePaid} type="usersExpense"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* All Expenses */}
                    <div className='container grid max-w-3xl sm:grid-cols-1'>
                        <ExpensesLogTable data={expensesLog} tripUUID={tripUUID} />
                    </div>
                </div>
            </section>
        </>
    )
}

