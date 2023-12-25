'use client';

import React from 'react';
import { AccountInfoProps } from '@/lib/types';
import AddTrip from './AddTrip';

export default function TripsSection ( { email } : AccountInfoProps ) {
  return (
    <div className='pt-24 flex justify-center'>
      <AddTrip email={ email || null } />
      {/* <div>TripsSection</div> */}
    </div>
  )
}