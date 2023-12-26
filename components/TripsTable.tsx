'use client';

import React from 'react';
import { AccountInfoProps, Trip } from '@/lib/types';
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/config';

export default function TripsTable ( { email } : AccountInfoProps ) {

    const db = getFirestore(firebase_app);
    const tripsCollection = collection(db, 'trips');

    const [tripsData, setTripsData] = React.useState<Trip[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const fetchTripData = async() => {
        //   TODO: Populate all with trips related to the email
        try {
            const data: Trip[] = []; 
            const q = query(tripsCollection);
            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push(doc.data() as Trip);
            });
            console.log(data);
            setTripsData(data);
            setIsLoading(false);
        } catch ( error ) {
            console.error('Error fetching trip data: ', error)
        } finally {
            setIsLoading(false);
        }

    }

    React.useEffect(() => {
        fetchTripData();
    }, []);
    
    return (
        <div className='container mx-auto max-w-3xl p-8 grow'>
            { isLoading ? (
                <p>Loading...</p>
            ) : (
                <p>display</p>
                // {tripsData.map((item, index) => {
                //     <div key={index}>
                //         <h2>{item.name}</h2>
                //         <p>{item.description}</p>
                //         <ul>
                //             {item.users.map((user, userIndex) => (
                //             <li key={userIndex}>{user}</li>
                //             ))}
                //         </ul>
                //         <p>UUID: {item.uuid}</p>
                //     </div>
                // })}
            )}
            
            Table
        </div>
  )
}