'use client';

import React from 'react';
import signUp from '@/lib/firebase/auth/signup';
import { useRouter } from 'next/navigation';
import addData from '@/lib/firebase/firestore/addData';
import { SquareUser } from 'lucide-react';
import LandingPageNav from './landingpage/LandingPageNav';

// can use React Joyride for initial tutorial after signup, can be a flag in users db which can be turned on and off

export const Signup = () => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmpassword, setConfirmPassword] = React.useState<string>('');

  const [passworderrors, setPasswordErrors] = React.useState<string[]>([]);
  const router = useRouter();

  const validatePassword = () => {
    const errors: string[] = [];
    if (password.length < 6) {
      errors.push("Password needs to be at least 6 characters");
    } 
    if (password != confirmpassword) {
      errors.push("Passwords do not match!");
    };

    if (password.length>=6 && password == confirmpassword){
      setPasswordErrors([]);
    }

    if (errors.length > 0) setPasswordErrors(errors);

    return errors;
  }

  // form submission for signing up
  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passworderrors.length > 0) {
      return window.alert(passworderrors);
    }
    const { result, error } = await signUp(email, password);

    if ( error ) {
      window.alert(error);
      return;
    }

    const userData = {
      username: username,
      trips: {},
      totalExpense: {},
      activity: []
    };
    
    const { result:res, error: err} = await addData('users', email, userData);

    console.log(result);
    return router.push("/account");
  }
  return (
    <div className="flex flex-col">
      <LandingPageNav type=""/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <SquareUser className="mx-auto h-10 w-auto" color="lightblue" size={52}/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Sign Up for an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 form" onSubmit={handleForm}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                Username
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setUsername(e.target.value)} 
                required 
                type="text" 
                name="username" 
                id="username"
                placeholder='Enter username'
                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                    Enter password (at least 6 characters)
                  </label>
              </div>
              <div className="mt-2">
                  <input
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  type="password" 
                  name="password1" 
                  id="password1" 
                  placeholder="Password"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Re-enter password
                  </label>
              </div>
              <div className="mt-2">
                  <input
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  onBlur= {validatePassword}
                  required 
                  type="password" 
                  name="password2" 
                  id="password2" 
                  placeholder="Password"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>
            {/* render password errors here */}
            <RenderFormErrors errors={passworderrors} />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 pl-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function RenderFormErrors({ errors }: {errors: string[]}) {
  if (!errors || errors.length === 0) return;

  return (
    <div className="container flex flex-col gap-3 p-3 my-5 border-2 border-error">
      {errors.map((err: string, index: number) => (
        <div key={index} className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{err}</span>
        </div>
      ))}
    </div>
  )
}