"use client"

import React from 'react';
import { navbarLinks } from '@/lib/data';
import Link from "next/link";

export default function Nav() {
  return (
    <nav className='ml-0 fixed z-10'>
        <ul className='flex flex-row gap-5 fixed left-8 right-8 justify-center *:sm:m-10 m-3 '>
            {navbarLinks.map((item, index) => (
                <li key={index} className="mr-4">
                    <Link aria-label={item.title} href={item.url}>
                        <item.icon color='lightblue' size={36}/>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}
