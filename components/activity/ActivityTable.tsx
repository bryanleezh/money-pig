'use client';

import React from 'react';
import { getFirestore } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/config';
import { AccountInfoProps, Activity } from '@/lib/types';
import { IndivActivity, Loader } from '@/components';
import getData from '@/lib/firebase/firestore/getData';

export default function ActivityTable ( { email } : AccountInfoProps ) {

    const db = getFirestore(firebase_app);

    const [activityData, setActivityData] = React.useState<Activity[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    // Fetch data from users collection
    const fetchUserData = async() => {
        if (email === null) return;
        const activitydata: Activity[] = [];

        try {
            const {result, error }= await getData('users', email);
            if (error) return;
            if (!result?.exists()) return;

            const activityObj = result.data().activity;
            
            for (const activity of activityObj) {
                activitydata.push(activity as Activity);
            }
            
            setActivityData(activitydata);
        } catch ( error ) {
            console.error('Error fetching trip data: ', error)
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        fetchUserData();
    }, [email]);
    
    return (
        <div className='container mx-auto max-w-3xl p-8 grow'>
            {isLoading ? (
                <div role="status" className="flex justify-center">
                    <Loader />
                </div>
                ) : (
                <>
                    {activityData.map((item: Activity, index) => (
                        <div key={index} className='border-dotted border-gray-300 grid grid-cols-3 p-2 pb-10'>
                            <div className='col-span-3'>
                                <div className='border-dotted  border-gray-300 grid grid-cols-5 grid-rows-2'>                                
                                    {item.activityType.includes("create") ? 
                                        <IndivActivity data={item} type="create"/>
                                    :
                                        <IndivActivity data={item} type="delete"/>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
  )
}