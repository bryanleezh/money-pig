'use client';

import React from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Nav, TripsSection } from '@/components';


const Trips = () => {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])
    

  return (
    <div>
        <Nav />
        Authorised
        <TripsSection email={user?.email || null}/>
    </div>
  )
}

export default Trips;