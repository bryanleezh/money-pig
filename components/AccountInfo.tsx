"use client";

import React from "react";
import firebase_app from "@/lib/firebase/config";
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, query } from "firebase/firestore";
import AccountCard from '@/components/AccountCard';
import profilepic from '@/lib/images/profile-photo.jpg';
import { AccountInfoProps } from "@/lib/types";
import Loader from "./Loader";

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
            }
        </div>
    )
}