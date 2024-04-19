'use client';

import React from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Nav, AccountInfo } from '@/components';

const Account = () => {
    const { user } = useAuthContext();

    const router = useRouter();
    // console.log(user);
    // console.log(typeof user?.email);
    
    useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])
    

  return (
    <div>
        <Nav />
        <AccountInfo email={user?.email || null}/>
    </div>
  )
}

export default Account;