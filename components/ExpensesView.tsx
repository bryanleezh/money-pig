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

    // TODO: Populate with all expenses + total of each currency spent in each trip
    // TODO: Add delete button for each expense (similar to deleteTrip component)
    return (
        <div className='container mx-auto max-w-3xl p-8 grow'>
            <h3>
                <a className="mb-4 block text-xl font-semibold text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                    {tripName}
                </a>
            </h3>
            {/* Total Users Expense */}
    
            {/* Users Expense Paid */}

            {/* All Expenses */}
        </div>
    )
}

