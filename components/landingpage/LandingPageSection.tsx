import Link from 'next/link';
import LandingPageNav from './LandingPageNav';
import { BarChart, Receipt, Wallet } from 'lucide-react';

export default function LandingPageSection() {
    return (
        <div className="flex flex-col">
            <LandingPageNav type="landingpage"/>
            <main className="flex-1">
                <section className="py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
                    <div className="flex flex-col px-4 md:px-6 items-center text-center space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Take Control of Your Expenses
                            </h1>
                            <p className="max-w-[700px] text-gray-300 md:text-xl">
                                Our expenses application helps you track and manage your spending, so you can stay on top of your finances.
                            </p>
                        </div>
                        <Link
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            href="/signup"
                        >
                            Sign Up
                        </Link>
                    </div>
                </section>
                <section className="py-12 md:py-24 lg:py-32">
                    <div className="flex flex-col px-4 md:px-6 items-center text-center space-y-6">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-800 dark:text-indigo-300">
                                Expense Tracking
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Effortlessly Track Your Expenses
                            </h2>
                            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Our intuitive interface makes it easy to log and categorize your expenses, so you can see where your
                                money is going.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left space-y-4">
                                <Receipt className="h-8 w-8 text-indigo-600" />
                                <h3 className="text-lg font-semibold">Expense Logging</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Easily log your expenses with our simple and intuitive interface.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left space-y-4">
                                <BarChart className="h-8 w-8 text-indigo-600" />
                                <h3 className="text-lg font-semibold">Expense Details</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Detailed view of all expenses right in your hands.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left space-y-4">
                                <Wallet className="h-8 w-8 text-indigo-600" />
                                <h3 className="text-lg font-semibold">Activity Logging</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Intuitive view of all activities logged into your account.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}