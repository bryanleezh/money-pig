"use client";

import React from "react";
import firebase_app from "@/lib/firebase/config";
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, query } from "firebase/firestore";
import AccountCard from '@/components/AccountCard';
import profilepic from '@/lib/images/profile-photo.jpg';
import Loader from "./Loader";

interface AccountInfoProps {
    email: string | null;
}

export default function AccountInfo( { email }: AccountInfoProps ) {
    const db = getFirestore(firebase_app);
    const userCollection = collection(db, 'users');

    const [account, setAccount] = React.useState<DocumentData[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    console.log("Email: ", email);
    console.log("collection: ", userCollection);
    const fetchAccData = async() => {
        try {
            const q = query(userCollection);
            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

            const userData: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                userData.push(doc.data());
            });

            setAccount(userData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching account data: ", error);
            setLoading(false);
        }
    }
    
    React.useEffect(() => {
        fetchAccData();
    }, []);

    const username: string = account.length > 0 ? account[0].username : '';
    const tripCount: number = account.length > 0 ? account[0].trips.length : 0;
    const totalExpenditure: number = account.length > 0 ? account[0].totalExpense : 0;

    return (
        <div className="mt-15">
            {
                loading ? 
                <div role="status" className="flex justify-center pt-20">
                    <Loader />
                </div>
                :
                <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
                    <div>
                        <AccountCard
                            image={profilepic}
                            email={email}
                            username={username}
                            tripCount={tripCount}
                            totalExpense={totalExpenditure}
                        />
                        </div>
                </section>

                // old template
                // <div>
                //     {/* maybe put a logo */}
                //     <div className="px-4 sm:px-0">
                //         <h3 className="text-base font-semibold leading-7 text-primary">Account Information</h3>

                //     </div>
                //     <div className="mt-3">
                //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                //             <dt className="text-sm font-bold leading-6 text-primary">Hi {username}! This is what your expenses look like!</dt>
                //         </div>
                //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                //             <dt className="text-sm font-semibold leading-6 text-primary">Email</dt>
                //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
                //         </div>
                //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                //             <dt className="text-sm font-semibold leading-6 text-primary">Total Number of Trips</dt>
                //             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tripCount}</dd>
                //         </div>  
                //     </div>
                // </div>
            }
                {/* base template 
                <div>
                    <p>Email: {email}</p>
                    <p>Username: {username} </p>
                    <p>Total Number of Trips: {tripCount} </p>
                </div> */}
            
            {/* only render if email exists */}
            {/* {email ? (
                <div>
                    <p>Email: {email}</p>
                </div>
            ) : (
                <p>No email available</p>
            )}
            {username ? (
                <p>Username: {username} </p>
            ): (
                <p>No username available</p>
            )}
            {tripCount ? (
                <p>Total Number of Trips: {tripCount} </p>
            ): (
                <p>No trips found</p>
            )} */}
        </div>
    )
}