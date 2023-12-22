'use client';

import React from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Nav } from '@/components';

const Account = () => {
    const { user } = useAuthContext();
    const router = useRouter();
    console.log(user);
    console.log(user?.email);


    useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])
    

  return (
    <div>
        <Nav />
        Authorised
    </div>
  )
}

export default Account;