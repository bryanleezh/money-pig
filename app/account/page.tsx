'use client';

import React from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Nav } from '@/components';
import SignOut from '@/lib/firebase/auth/signout';

const Account = () => {
    const { user } = useAuthContext();
    const router = useRouter();
    console.log(user);


    const handleLogout = async() => {
      const {result, error} = await SignOut();

      if ( error ) {
        return console.log(error);
      }
      
      console.log(result);
      return router.push("signin");
    }

    useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])
    

  return (
    <div>
        <Nav />
        Authorised
        <button onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default Account;