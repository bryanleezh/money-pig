'use client';

import React from 'react';
import { AccountInfoProps } from '@/lib/types';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bike, Loader } from 'lucide-react';
import { collection, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/config';
import { v4 as uuidv4 } from 'uuid';
import addData from '@/lib/firebase/firestore/addData';

// Future Reference: shadcn/ui -> Dialog

export default function AddTrip ( { email } : AccountInfoProps ) {
    const db = getFirestore(firebase_app);
    // form data for adding new trip
    const [tripName, setTripName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [addedUsersArr, setAddedUsersArr] = React.useState<string[]>([]);
    const [isUsersLoading, setIsUsersLoading] = React.useState<boolean>(true);

    // for form submission
    const [isFormLoading, setIsFormLoading] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
    // array for populating
    const [usersArr, setUsersArr] = React.useState<string[]>([]);

    const [open, setOpen] = React.useState<boolean>(false);

    const cancelButtonRef = React.useRef(null);

    const handleOpenModal = () => {
        setOpen(true);
    };
    
    // Function to populate users from firebase into an array
    const populateUsers = async () => {
        try{
            // can refactor to separate function for getting collection ids?
            const querySnapshot = await getDocs(collection(db, 'users'));
            const userIdsData: string[] = [];

            querySnapshot.forEach((doc) => {
                if (doc.id !== email) userIdsData.push(doc.id);
            });

            setUsersArr(userIdsData);
        } catch (err) {
            console.error("Error fetching user ids: ", err);
        } finally {
            setIsUsersLoading(false);
        }
    };

    // Populate addedUsersArr through select 
    const handleUserChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(evt.target.selectedOptions).map(option => option.value);
        // console.log(selectedOptions);
        setAddedUsersArr(selectedOptions);
    }

    // Submit form to add data
    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Set submission loading state
        setIsFormLoading(true);

        // create uuid as document id
        let noError: boolean = false;
        const uuid = uuidv4();
        const updatedAddedUsersArr = [...addedUsersArr, email];
        
        // Convert array to obj
        let usersExpense = updatedAddedUsersArr.reduce<{ [key: string]: {} }>((obj, item) => ({ ...obj, [item as string]: {} }), {});
        // let finalUsersObj = updatedAddedUsersArr.reduce((obj, item, index) => ({ ...obj, [item]: index}), {});
        let finalUsersObj = updatedAddedUsersArr.reduce((obj, item, index) => {
            if (item !== null) {
                return { ...obj, [item]: index };
            }
            return obj;
        }, {});

        // data to be added to user data
        const userTripData = {
            name: tripName,
            description: description,
            // UUID as id --> id will be used as value in table for onClick functionality
            id: uuid,
            users: finalUsersObj
        };

        // data to be added to trips collection
        const tripData = {
            uuid: uuid,
            name: tripName,
            description: description,
            users: finalUsersObj,
            // totalExpense stores the total amount spent in each currency, each user is represented by their index
            totalExpense: {},
            // TODO: Add other info here when implementing trips logic
            // expenses by each user, usersExpense stores each user as the key, and an object
            // eg {
                // "user1":{
            //         "SEK": 100,
            //         "USD": 100,
            // }
            usersExpense: usersExpense,
            // expenses paid by each user
            usersExpensePaid: usersExpense,
            // expenses stores who paid how much so that simplify debt logic can be used
            expenses: {},
            // expensesLog stores each expense desc and list of transactions
            expensesLog: [
                // desc: "hi",
                // transactions: []
            ],
        }

        try {
            // Add trip to trip collection
            const { result, error } = await addData('trips', uuid, tripData);
            
            // Add trip to users 
            for (var user of updatedAddedUsersArr) {
                if (!user) return 
                const userDocRef = doc(db, 'users', user);
                try {
                    await setDoc(userDocRef, 
                        {
                            trips: {
                                [uuid]: userTripData,
                            },
                        },
                        { merge: true }
                    );
                    console.log(`Trip data added to user: ${user}`);
                } catch (error) {
                    noError = true;
                    console.error(`Error adding trip data to user ${user}`, error);
                }
            }

            // TODO: Add creation of trip to Activity



            
            if (!noError) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 3000);
            }

        } finally {
            setIsFormLoading(false);
            setTimeout(() => {
                location.reload();
            },2000);
        }

    };

    React.useEffect(() => {
        populateUsers();
    }, []);
    
    return (
        <div>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={handleOpenModal}
                    // className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    className="inline-flex w-50 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                    Create New Trip
                </button>
            </div>
            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
        
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <form className='form' onSubmit={handleForm}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <Bike className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Add a New Trip
                                                </Dialog.Title>
                                                {/* Add form here */}
                                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    {/* trip name */}
                                                    <div className="sm:col-span-4">
                                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Trip Name:
                                                        </label>
                                                        <div className="mt-2">
                                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                            <input
                                                                onChange={(e) => setTripName(e.target.value)}
                                                                required
                                                                type="text"
                                                                name="tripname"
                                                                id="tripname"
                                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                            />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Trip Description */}
                                                    <div className="col-span-full">
                                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Description:
                                                        </label>
                                                        <div className="mt-2">
                                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                <input
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    required
                                                                    type="text"
                                                                    name="descriptiom"
                                                                    id="description"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Users */}
                                                    <div className="sm:col-span-full">
                                                        <label htmlFor="users" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Who will you be going with?
                                                            <p className="block text-sm font-medium leading-6 text-gray-500">If you are on desktop: hold cmd(Mac)/ctrl(Windows) to select multiple!</p>
                                                        </label>              
                                                        {
                                                            isUsersLoading ?
                                                            <Loader color='black' className='animate-spin-slow'/>:                         
                                                            <div className="mt-2">
                                                                <select
                                                                    id="users"
                                                                    name="users"
                                                                    multiple={true}
                                                                    value={addedUsersArr}
                                                                    onChange={handleUserChange}
                                                                    className="w-auto justify-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                                >
                                                                {/* populate with users  with onclick event to add to form*/}
                                                                {usersArr.map((id,index) => (
                                                                    <option key={index} value={id}>
                                                                        {id}
                                                                    </option>
                                                                ))}
                                                                </select>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            disabled={isFormLoading}
                                        >
                                            {isFormLoading ? 'Submitting...' : 'Onwards!'}
                                        </button>
                                        <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
            {isSuccess && (
                <div className='mt-3 text-center text-green-600'>
                    <p>Trip Successfully Created!</p>
                    <p>Page will now reload...</p>
                </div>
            )}
        </div>
    )
  
}