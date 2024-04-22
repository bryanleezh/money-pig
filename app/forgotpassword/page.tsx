'use client';
import { FrownIcon } from "lucide-react";
import Link from "next/link";

const ForgotPassword = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-800">
            <div className="max-w-md text-center">
                <FrownIcon className="mx-auto h-24 w-24 text-gray-500 dark:text-gray-400" />
                <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Oops!</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    The forgot password feature hasn't been developed yet. If you have any issues, email leebryan307@gmail.com with your Money-Pig email to reset your password!
                </p>
                <Link
                    className="mt-6 inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-indigo-600 dark:text-white dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="/"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    )
};

export default ForgotPassword;