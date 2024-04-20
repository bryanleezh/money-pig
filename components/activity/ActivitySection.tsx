'use client';

import React from 'react';
import { AccountInfoProps } from '@/lib/types';
import ActivityTable from './ActivityTable';

export default function ActivitySection ( { email } : AccountInfoProps ) {
    console.log(email);

    return (
        <div className='flex flex-col items-center'>
            <div className='pt-5'>
                <ActivityTable email={ email || null } />
            </div>
        </div>
    )
}