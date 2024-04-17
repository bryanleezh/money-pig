"use client";

import React from "react";
import firebase_app from "@/lib/firebase/config";
import { DocumentData, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import AccountCard from '@/components/AccountCard';
import profilepic from '@/lib/images/profile-photo.jpg';
import { AccountInfoProps } from "@/lib/types";
import Loader from "./loader/Loader";

export default function AccountInfo( { email }: AccountInfoProps ) {
    const db = getFirestore(firebase_app);
    const userCollection = collection(db, 'users');

    const [account, setAccount] = React.useState<DocumentData[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    
    const username: string = account.length > 0 ? account[0].username : '';
    const tripCount: number = account.length > 0 ? account[0].trips.length : 0;
    const totalExpenditure: Record<string, number> = account.length > 0 ?
        account[0].totalExpense :
    {};

    const fetchAccData = async() => {
        try {
            const userData: DocumentData[] = [];
    
            if (email !== null) {
                const docRef = doc(db, "users", email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    userData.push(docSnap.data());
                    console.log(docSnap.data());
                }
                else {
                    // might need to change this error logging
                    console.log('No such document!');
                }
            }

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