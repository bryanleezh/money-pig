'use client';

import React from 'react';
import {  TripUuid } from '@/lib/types';
import { AddExpense, ExpensesView } from '@/components';

export default function SingleTrip ( { tripUUID } : TripUuid ) {
  return (
    <div className='pt-24 flex flex-col items-center'>
        <AddExpense tripUUID={tripUUID} />
        <ExpensesView tripUUID={tripUUID} />
    </div>
  )
}