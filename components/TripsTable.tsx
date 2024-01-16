'use client';

import React from 'react';
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/config';
import { AccountInfoProps, Trip } from '@/lib/types';
import Link from 'next/link';
import { Accessibility, Trash2 } from 'lucide-react';
import Loader from "./Loader";


export default function TripsTable ( { email } : AccountInfoProps ) {

    const db = getFirestore(firebase_app);
    const tripsCollection = collection(db, 'trips');

    const [tripsData, setTripsData] = React.useState<Trip[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const fetchTripData = async() => {
        if (email !== null){
            try {
                const data: Trip[] = []; 
                const q = query(tripsCollection);
                const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as Trip);
                });
                
                const filteredTrips = data.filter((trip) => trip.users.includes(email));

                setTripsData(filteredTrips);
            } catch ( error ) {
                console.error('Error fetching trip data: ', error)
            } finally {
                setIsLoading(false);
            }
        }
    }
    
    const deleteTrip = async() => {

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
                        <div className='border-dotted border-gray-300 grid grid-cols-5'>
                            <div className='col-span-4'>
                                <Link key={index} href={`/trips/${item.uuid}`} passHref>
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
                                {/* TODO: add delete button component for deleting trips with props of the trip uuid */}
                                <Trash2 size={24} color='red' onClick={deleteTrip}/>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
  )
}