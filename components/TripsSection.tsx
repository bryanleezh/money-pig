'use client';

import React from 'react';
import { AccountInfoProps } from '@/lib/types';
import { AddTrip, TripsTable } from '@/components';

export default function TripsSection ( { email } : AccountInfoProps ) {
  return (
    <div className='pt-24 flex flex-col items-center'>
        <div>
          <AddTrip email={ email || null } />
          <TripsTable email={ email || null } />
        </div>
    </div>
  )
}