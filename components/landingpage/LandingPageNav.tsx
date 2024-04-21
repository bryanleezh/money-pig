import Link from 'next/link';
import logo from '@/lib/images/money-pig.png';
import Image from 'next/image';
import { LandingPageNavProps } from '@/lib/types';

export default function LandingPageNav( { type } : LandingPageNavProps) {
    if (type === "landingpage") {
        return (
            <>
                <header className="bg-gray-700 text-white px-4 lg:px-6 h-14 flex items-center justify-between">
                    <Link className="flex items-center" href="/">
                        <Image 
                            src={logo} 
                            alt="money-pig-logo"
                            width={48}
                            height={48}
                            className="mr-2"
                        />
                        <span className="text-lg font-semibold">Money Pig</span>
                    </Link>
                    <Link
                        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        href="/signin"
                        >
                        Sign In
                    </Link>
                </header>
            </>
        )
    } else {
        return (
            <>
                <header className="bg-gray-700 text-white px-4 lg:px-6 h-14 flex items-center justify-between">
                    <Link className="flex items-center" href="/">
                        <Image 
                            src={logo} 
                            alt="money-pig-logo"
                            width={48}
                            height={48}
                            className="mr-2"
                        />
                        <span className="text-lg font-semibold">Money Pig Expense Tracker</span>
                    </Link>
                </header>
            </>
        )
    }
}