'use client';

import React from 'react';
import { TripUuid } from '@/lib/types';
import { AddExpense, ExpensesView, Loader } from '@/components';
import { DocumentData, doc, getDoc, getFirestore } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/config';

export default function SingleTrip ( { tripUUID } : TripUuid ) {
  const db = getFirestore(firebase_app);
  const [tripData, setTripData] = React.useState<DocumentData|undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const retrieveData = async () => {
    try{
        const tripData: DocumentData[] = [];
        const tripRef = doc(db, 'trips', tripUUID);
        const tripSnapshot = await getDoc(tripRef);

        if (tripSnapshot.exists()) {
          const tripData: DocumentData = tripSnapshot.data();
          setTripData(tripData)

        } else {
            console.error('No such document!');
        }
        
    } catch (err) {
        console.error("Error fetching user ids: ", err);
    } finally {
        setIsLoading(false);
    }
};

React.useEffect(() => {
  retrieveData();
}, [tripUUID]);

  return (
    <div className='flex flex-col items-center'>
      {
        isLoading ?
        <div role="status" className="flex justify-center pt-20">
          <Loader />
        </div>
        :
        <div className='w-full pt-5'>
          <AddExpense tripUUID={tripUUID} tripData={tripData}/>
          <ExpensesView tripUUID={tripUUID} tripData={tripData} />
        </div>
      }
    </div>
  )
}