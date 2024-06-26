'use client';

import React from "react";
import signIn from "@/lib/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { Coins } from "lucide-react";
import LandingPageNav from "./landingpage/LandingPageNav";

export const Signin = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const { result, error } = await signIn(email, password);
    
        if ( error ) {
            window.alert("Email or password entered wrongly, please try again!");
            return console.log(error);
        }
    
        // console.log(result);
        return router.push("/trips");
    }
    return (
        <div className="flex flex-col">
            <LandingPageNav type=""/>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Coins className="mx-auto h-10 w-auto" color="lightblue" size={52}/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6 form" onSubmit={handleForm}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="example@mail.com"
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6">
                                Password
                                </label>
                                <div className="text-sm">
                                    <a href="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Password"
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

// export default SignIn;