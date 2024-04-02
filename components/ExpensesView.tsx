'use client';

import React from 'react';
import { TripInfo } from '@/lib/types';

export default function ExpensesView( {tripUUID, tripData} : TripInfo ) {
    console.log(tripUUID);
    console.log(tripData);

    const tripName = tripData?.name;
    const expensesLog = tripData?.expensesLog;
    const totalExpense = tripData?.totalExpense;
    const usersExpense = tripData?.usersExpense;
    const usersExpensePaid = tripData?.usersExpensePaid;

    const totalExpenseElements = totalExpense ? Object.entries(totalExpense).map(([currency, expense]) => (
        <div key={currency}>
            <p className="text-base text-primary leading-relaxed text-body-color dark:text-cyan-200">
                {currency}: {String(expense)}
            </p>
        </div>
    )) : null;

    // TODO: Populate with all expenses + total of each currency spent in each trip
    // TODO: Add delete button for each expense (similar to deleteTrip component)
    return (
        <>
            <div className="mb-10 overflow-hidden rounded-lg bg-dark shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
                <div className="p-8 text-center mt-2 sm:p-9 md:p-7 xl:p-9">
                    <h3>
                        <a className="mb-4 block text-xl font-semibold text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                            {tripName}
                        </a>
                    </h3>
                    {/* Change this to grid view maybe */}
                    <p className="mb-4 block text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                        Total Spent this trip: {totalExpenseElements}
                    </p>
                    {/* Total Users Expense */}

                    {/* Users Expense Paid */}

                    {/* All Expenses */}
                </div>
            </div>
        </>
    )
}

