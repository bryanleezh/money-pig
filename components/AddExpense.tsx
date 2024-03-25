'use client';

import React, { Fragment } from 'react';
import { TripInfo } from '@/lib/types';
import { currencies, tabs } from '@/lib/data';
import firebase_app from '@/lib/firebase/config';
import { Transition, Dialog, Tab } from '@headlessui/react';
import { getFirestore } from 'firebase/firestore';
import { useAuthContext } from '@/app/context/AuthContext';
import ExpenseTab from './ExpenseTab';
import addTotalTripExpense from '@/lib/expenses/addTotalTripExpense';
import addExpenseLog from '@/lib/expenses/addExpenseLog';
import addExpense from '@/lib/expenses/addExpense';
import addUserExpense from '@/lib/expenses/addUserExpense';
import addUserExpensePaid from '@/lib/expenses/addUserExpensePaid';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function AddExpense( {tripUUID, tripData} : TripInfo ) {

    // console.log(tripUUID);
    console.log(tripData);
    const { user } = useAuthContext();
    const userEmail = user?.email;
    const totalUsersCount: number = Object.keys(tripData?.users).length;
    const isSingleUser: boolean = totalUsersCount<2 ? true : false;
    var bestieEmail = "";
    if (!isSingleUser) {
        for (let i = 0; i < tripData!.users.length; i++) {
            console.log(tripData!.users[i]);
            if (tripData!.users[i] !== userEmail) {
                bestieEmail = tripData!.users[i];
            }
        }
    }

    // TODO: Initialise the other persons email if the trip has 2 users instead of just one, if there is only one person's email, just need to show the buttons without the tab

    // TODO: Add logic for type of expense to add -> add tabs for different type of expense

    const db = getFirestore(firebase_app);

    // Modal state
    const [ isOpen, setIsOpen ] = React.useState<boolean>(false);

    // form data for adding new trip
    const [description, setDescription] = React.useState<string>('');
    const [amount, setAmount] = React.useState<number>(0);
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencies[0].label);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleCurrencyChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(evt.target.value);
    }

    const submitEqualExpense = () => {
        setIsOpen(false);
        console.log("submitting equal expense...");
        let splitAmount = amount/2;
        // TODO: Add expense to user document totalExpense
        // TODO: Add expense to trip document -> totalExpense, usersExpense, expenses, expensesLog
        if (!user || !tripUUID) console.error( "User or tripUUID not found" );
        addTotalTripExpense(amount, tripUUID, selectedCurrency);
        addExpenseLog(amount, description, tripUUID, selectedCurrency, "equal");
        if (tripData && userEmail) {
            addUserExpense(splitAmount, userEmail, tripUUID, selectedCurrency);
            addUserExpense(splitAmount, bestieEmail, tripUUID, selectedCurrency);
            addUserExpensePaid(amount, userEmail, tripUUID, selectedCurrency);
        }

    }

    const submitIndivExpense = () => {
        setIsOpen(false);
        console.log("submitting indiv expense...");
        // TODO: Add expense to user document totalExpense
        // TODO: Add expense to trip document -> totalExpense, usersExpense, expenses, expensesLog
        if (!user || !tripUUID) console.error( "User or tripUUID not found" );
        addTotalTripExpense(amount, tripUUID, selectedCurrency);
        addExpenseLog(amount, description, tripUUID, selectedCurrency, "indiv");
        if (tripData && userEmail) {
            // ! TODO: addExpense doesn't work for now
            // addExpense(tripData.users[userEmail], tripData.users[userEmail], amount, tripUUID, selectedCurrency);
            addUserExpense(amount, userEmail, tripUUID, selectedCurrency);
            addUserExpensePaid(amount, userEmail, tripUUID, selectedCurrency);
        }
    }

    const submitBestieExpense = () => {
        setIsOpen(false);
        console.log("submitting bestie expense...");
        // TODO: Add expense to user document totalExpense
        // TODO: Add expense to trip document -> totalExpense, usersExpense, expenses, expensesLog
        if (!user || !tripUUID) console.error( "User or tripUUID not found" );
        addTotalTripExpense(amount, tripUUID, selectedCurrency);
        addExpenseLog(amount, description, tripUUID, selectedCurrency, "bestie");
        if (tripData && userEmail) {
            addUserExpense(amount, bestieEmail, tripUUID, selectedCurrency);
            addUserExpensePaid(amount, userEmail, tripUUID, selectedCurrency);
        }
    }

    const submitForBestieExpense = () => {
        setIsOpen(false);
        console.log("submitting for bestie...");
        // TODO: Add expense for bestie, which logs for the bestie
        if (!user || !tripUUID) console.error( "User or tripUUID not found" );
        addTotalTripExpense(amount, tripUUID, selectedCurrency);
        addExpenseLog(amount, description, tripUUID, selectedCurrency, "bestie");
        if (tripData && userEmail) {
            addUserExpense(amount, bestieEmail, tripUUID, selectedCurrency);
            addUserExpensePaid(amount, bestieEmail, tripUUID, selectedCurrency);
        }
    }

    const submitBestieExpenseForYou = () => {
        setIsOpen(false);
        console.log("submitting for bestie...");
        // TODO: Add expense for bestie, which logs for the bestie
        if (!user || !tripUUID) console.error( "User or tripUUID not found" );
        addTotalTripExpense(amount, tripUUID, selectedCurrency);
        addExpenseLog(amount, description, tripUUID, selectedCurrency, "bestie");
        if (tripData && userEmail) {
            addUserExpense(amount, userEmail, tripUUID, selectedCurrency);
            addUserExpensePaid(amount, bestieEmail, tripUUID, selectedCurrency);
        }
    }

    const submitExactExpense = () => {
        setIsOpen(false);
    }

    const submitPercentageExpense = () => {
        setIsOpen(false);
    }

    // TODO: Submit form to add data
    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit form");
    };
    
    return (
        <div>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    // className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                    Add Expense
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Add a new expense
                        </Dialog.Title>
                        <form className="mt-2">
                            <p className="text-sm text-gray-500">
                            Your payment has been successfully submitted. We’ve sent
                            you an email with all of the details of your order.
                            </p>
                            {/*  Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="block w-full rounded-md border-gray-300 border-solid py-1.5 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm"
                                        placeholder="Enter description"
                                        />
                                </div>
                            </div>
                            {/* Currency */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Total Amount Spent
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <label htmlFor="currency" className="sr-only">
                                            Currency
                                        </label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            value={selectedCurrency}
                                            onChange={handleCurrencyChange}
                                            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        >
                                            {currencies.map((currency, currencyIdx) => (
                                                <option key={currency.currency} value={currency.label}>{currency.label}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Tabs for type of expense */}
                            <div className="w-full max-w-md px-2 py-2 sm:px-0">
                                {isSingleUser ? (
                                    <>
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-black pb-4">{description}</p>
                                        </div>
                                        <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                onClick={submitIndivExpense}
                                            >
                                                Add Expense!
                                            </button>
                                            <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <Tab.Group>
                                        <Tab.List className="flex space-x-1 rounded-xl bg-green-900/20 p-1">
                                            {/* TODO: Add description to each tab on what each type is */}
                                            {tabs.map((tab, index) => (
                                                <Tab key={index} className={({ selected }) =>
                                                    classNames(
                                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-green-700 shadow'
                                                        : 'text-black hover:bg-white/[0.12] hover:text-white'
                                                    )
                                                }>{tab}</Tab>    
                                            ))}
                                        </Tab.List>
                                        <Tab.Panels className="mt-2">
                                            <ExpenseTab type="equal" submitExpense={submitEqualExpense} closeModal={closeModal} />
                                            <ExpenseTab type="indiv" submitExpense={submitIndivExpense} closeModal={closeModal} />
                                            <ExpenseTab type="bestie" submitExpense={submitBestieExpense} closeModal={closeModal} />
                                            <ExpenseTab type="bestiepay" submitExpense={submitForBestieExpense} closeModal={closeModal} />
                                            <ExpenseTab type="bestiepayforyou" submitExpense={submitBestieExpenseForYou} closeModal={closeModal} />
                                            
                                            {/* TODO */}
                                            {/* Unequal Expense */}
                                            {/* Percentage Expense */}

                                        </Tab.Panels>
                                    </Tab.Group>
                                )}
                                
                            </div>
                        </form>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </div>
    )
}

