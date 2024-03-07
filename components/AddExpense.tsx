'use client';

import React, { Fragment } from 'react';
import { TripInfo } from '@/lib/types';
import { currencies } from '@/lib/data';
import firebase_app from '@/lib/firebase/config';
import addData from '@/lib/firebase/firestore/addData';
import { Transition, Dialog, Listbox } from '@headlessui/react';
import { getFirestore, getDoc, collection, doc, updateDoc, DocumentData } from 'firebase/firestore';
import { Bike, Check, ChevronDown, Loader } from 'lucide-react';
import { useAuthContext } from '@/app/context/AuthContext';

export default function AddExpense( {tripUUID, tripData} : TripInfo ) {
    // console.log(tripUUID);
    // console.log(tripData);
    const { user } = useAuthContext();
    console.log(user?.email);
    // TODO: Add logic for type of expense to add -> add tabs for different type of expense

    const db = getFirestore(firebase_app);
    // form data for adding new trip
    const [description, setDescription] = React.useState<string>('');
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencies[0])

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
    
    // Function to populate users from tripId into an array
    const retrieveUsers = () => {
        if (tripData){
            setUsersArr(tripData.users);
            setIsUsersLoading(false);
        } else {
            console.error("No valid trip UUID provided");
        }
    };

    // Populate addedUsersArr through select 
    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        // console.log(selectedOptions);
        setAddedUsersArr(selectedOptions);
    }

    // TODO: Submit form to add data
    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Set submission loading state
        setIsFormLoading(true);

        // create uuid as document id
        let noError: boolean = false;
        // const uuid = uuidv4();
        // const updatedAddedUsersArr = [...addedUsersArr, email];

        // // data to be added to user data
        // const userTripData = {
        //     name: tripName,
        //     description: description,
        //     // UUID as id --> id will be used as value in table for onClick functionality
        //     id: uuid,
        //     users: updatedAddedUsersArr
        // };

        // // data to be added to trips collection
        // const tripData = {
        //     uuid: uuid,
        //     name: tripName,
        //     description: description,
        //     users: updatedAddedUsersArr,
        //     // TODO: Add other info here when implementing trips logic
        // }

        // try {
        //     // Add trip to trip collection
        //     const { result, error } = await addData('trips', uuid, tripData);
        //     // Add trip to users 
        //     for (var user of addedUsersArr) {
        //         const userDocRef = doc(db, 'users', user);
        //         try {
        //             await updateDoc(userDocRef, {
        //                 trips: {
        //                     [uuid]: userTripData,
        //                 },
        //             });
        //             console.log(`Trip data added to user: ${user}`);
        //         } catch (error) {
        //             noError = true;
        //             console.error(`Error adding trip data to user ${user}`, error);
        //         }
        //     }

            // TODO: Add creation of expense to Activity



            
            // if (!noError) {
            //     setIsSuccess(true);
            //     setTimeout(() => {
            //         setIsSuccess(false);
            //     }, 3000);
            // }

        // } finally {
        //     setIsFormLoading(false);
        //     setTimeout(() => {
        //         location.reload();
        //     },2000);
        // }

    };

    React.useEffect(() => {
        retrieveUsers();
    }, []);
    
    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            >
                Add Expense
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
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
        
                <div className="fixed z-10 w-full h-full flex items-center justify-center">
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
                                                Add a New Expense
                                                </Dialog.Title>

                                                <div className="grid grid-cols-5 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    {/* Expense Description */}
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
                                                                    placeholder='Enter a description'
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Currency dropdown */}
                                                    <div className='col-span-3'>
                                                        <div className="top-16">
                                                            <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
                                                                <div className="relative mt-1">
                                                                    <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                                        <span className="block truncate text-gray-900">{selectedCurrency.label}</span>
                                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>
                                                                    <Transition
                                                                        as={Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                                        {currencies.map((currency, currencyIdx) => (
                                                                            <Listbox.Option
                                                                            key={currencyIdx}
                                                                            className={({ active }) =>
                                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                                active ? 'bg-green-200 text-white' : 'text-gray-900'
                                                                                }`
                                                                            }
                                                                            value={currency.label}
                                                                            >
                                                                            {({ selected }) => (
                                                                                <>
                                                                                <span
                                                                                    className={`block truncate ${
                                                                                    selected ? 'font-medium text-gray-900' : 'font-normal text-gray-400'
                                                                                    }`}
                                                                                >
                                                                                    {currency.currency}
                                                                                </span>
                                                                                {selected ? (
                                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                                </>
                                                                            )}
                                                                            </Listbox.Option>
                                                                        ))}
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </Listbox>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="col-span-3">
                                                        <div className="mt-2">
                                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                <input
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    required
                                                                    type="number"
                                                                    name="currency"
                                                                    id="currency"
                                                                    placeholder='0.00'
                                                                    className="block flex-1 border-0 bg-transparent pr-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* TODO: Paid by who, split equally/not equally */}
                                                    {/* DROPDOWN LIST Users */}
                                                    <div className="sm:col-span-full">
                                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
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
            </Transition.Root>
            {isSuccess && (
                <div className='mt-3 text-center text-green-600'>
                    <p>Expense Successfully Created!</p>
                    <p>Page will now reload...</p>
                </div>
            )}
        </div>
    )
}

