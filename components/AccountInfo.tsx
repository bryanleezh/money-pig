"use client";

import React from "react";
import firebase_app from "@/lib/firebase/config";
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, query } from "firebase/firestore";
import AccountCard from '@/components/AccountCard';
import profilepic from '@/lib/images/profile-photo.jpg';

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
                <div role="status">
                    <svg aria-hidden="true" className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
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