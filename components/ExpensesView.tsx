'use client';

import React from 'react';
import { TripInfo } from '@/lib/types';

export default function ExpensesView( {tripUUID, tripData} : TripInfo ) {
    console.log(tripUUID);
    console.log(tripData);

    // TODO: Populate with all expenses + total of each currency spent in each trip
    // TODO: Add delete button for each expense (similar to deleteTrip component)
    return (
        <div>ExpensesView</div>
    )
}

