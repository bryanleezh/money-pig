'use client';

import React from 'react'
import { useEffect } from 'react';
import { useAuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Nav, SingleTrip } from '@/components';

const tripDetails = ({ 
    params
}: {
    params: { tripId: string };
}) => {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])

    return (
        <div>
            <Nav />
            Authorised
            {/* <h1>Trip Details</h1>
            <h2>{params.tripId}</h2> */}
            <SingleTrip tripUUID={params.tripId}/>
        </div>
    )
}

export default tripDetails;