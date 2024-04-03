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
        // <>
        //     <div className="mb-10 overflow-hidden rounded-lg bg-dark shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        //         <div className="p-8 text-center mt-2 sm:p-9 md:p-7 xl:p-9">
        //             <h3>
        //                 <a className="mb-4 block text-xl font-semibold text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
        //                     {tripName}
        //                 </a>
        //             </h3>
        //             {/* Change this to grid view maybe */}
        //             <p className="mb-4 block text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
        //                 Total Spent this trip: {totalExpenseElements}
        //             </p>
        //             {/* Total Users Expense */}

        //             {/* Users Expense Paid */}

        //             {/* All Expenses */}
        //         </div>
        //     </div>
        // </>
        <>
            <section className="w-full py-6">
                <div className="container grid max-w-3xl px-4 gap-6 md:gap-8 sm:grid-cols-1 sm:px-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{tripName}</h1>
                        <p className="trip-desc text-gray-500 dark:text-gray-400 w-full sm:w-auto" >
                            {description}
                        </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                                <h3 className="font-medium">Accommodation</h3>
                                <span>$1200.00</span>
                            </div>
                        <div className="flex items-center justify-between p-4">
                            <h3 className="font-medium">Flights</h3>
                            <span>$800.00</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                            <h3 className="font-medium">Dining</h3>
                            <span>$300.00</span>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <h3 className="font-medium">Spa</h3>
                            <span>$200.00</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                        <h3 className="font-medium">Total</h3>
                        <span>$2500.00</span>
                    </div>
                    </div>
                </div>
                </section>
        </>
    )
}

