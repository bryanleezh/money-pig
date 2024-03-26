'use client';

import React from 'react';
import { collection, getFirestore } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/config';
import { AccountInfoProps, Trip } from '@/lib/types';
import Link from 'next/link';
import { Accessibility } from 'lucide-react';
import { Loader } from '@/components';
import DeleteTrip from "../components/DeleteTrip";
import getData from '@/lib/firebase/firestore/getData';

export default function TripsTable ( { email } : AccountInfoProps ) {

    const db = getFirestore(firebase_app);
    const tripsCollection = collection(db, 'trips');

    const [tripsData, setTripsData] = React.useState<Trip[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    // Fetch data from users table
    const fetchTripData = async() => {
        if (email === null) return;
        const tripsdata: Trip[] = [];

        try {
            const {result, error }= await getData('users', email);
            if (error) return;
            if (!result?.exists()) return;

            const tripsObj = result.data().trips;

            for (let tripId in tripsObj) {
                tripsdata.push(tripsObj[tripId] as Trip);
            }
            
            setTripsData(tripsdata);
        } catch ( error ) {
            console.error('Error fetching trip data: ', error)
        } finally {
            setIsLoading(false);
            }
    }

    React.useEffect(() => {
        fetchTripData();
    }, [email]);
    
    return (
        <div className='container mx-auto max-w-3xl p-8 grow'>
            {isLoading ? (
                <div role="status" className="flex justify-center">
                    <Loader />
                </div>
                ) : (
                <>
                    {tripsData.map((item: Trip, index) => (
                        // TODO: Add button for deletion of trip with lucide React
                        <div key={item.id} className='border-dotted border-gray-300 grid grid-cols-5'>
                            <div className='col-span-4'>
                                <Link href={`/trips/${item.id}`} passHref>
                                    <div className='mb-5 border-dotted  border-gray-300 grid grid-cols-5 grid-rows-3'>                                
                                        <div className='row-span-2 flex flex-col items-center pt-2'>
                                            <Accessibility size={48} color='lightblue' />
                                        </div>
                                        <div className='col-span-3'>
                                            <h2 className="mb-1 block text-xl font-bold text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                                                {item.name}
                                            </h2>
                                        </div>
                                        <div className="col-start-2 row-start-2 col-span-3">
                                            <h3 className="text-base font-semibold text-primary leading-relaxed text-body-color dark:text-primary">
                                                {item.description}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className='col-span-1 flex justify-center mt-8 grid-rows-3'>
                                <DeleteTrip tripUUID={item.id} />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
  )
}