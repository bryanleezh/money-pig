'use client';

import React from 'react'
import { useEffect } from 'react';
import { useAuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Nav, SingleTrip } from '@/components';

// TODO: Need to add conditional render for if tripid is not found

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
            <SingleTrip tripUUID={params.tripId}/>
        </div>
    )
}

export default tripDetails;