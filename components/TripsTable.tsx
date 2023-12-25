'use client';

import React from 'react';
import { AccountInfoProps } from '@/lib/types';
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/config';

export default function TripsTable ( { email } : AccountInfoProps ) {

    const db = getFirestore(firebase_app);
    const tripsCollection = collection(db, 'trips');

    const [tripsData, setTripsData] = React.useState<DocumentData[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const fetchTripData = async() => {
        //   TODO: Populate all with trips related to the email
        const data: DocumentData[] = []; 
        const q = query(tripsCollection);
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        console.log(data);
        setTripsData(data);
    }

    React.useEffect(() => {
        fetchTripData();
    }, []);
    
    return (
        <div>
            Table
        </div>
  )
}