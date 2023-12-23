import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";


interface AccountInfoProps {
    image: StaticImageData;
    email: string | null;
    username: string | null;
    tripCount: number | null;
    totalExpense: number | null;
}

export default function AccountCard ({
  image,
  email,
  username,
  tripCount,
  totalExpense
} : AccountInfoProps) {
  return (
    <>
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <div className="flex justify-center items-center">
            <Image 
                src={image} 
                alt="" 
                className="inline-block h-40 w-40 rounded-full ring-2 ring-white"
            />
        </div>
        <div className="p-8 text-center mt-2 sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              className="mb-4 block text-xl font-semibold text-primary hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              Hi {username}! This is what your expenses look like!
            </a>
          </h3>
          <p className="mb-7 text-base text-primary leading-relaxed text-body-color dark:text-dark-6">
            Total Number of Trips: {tripCount}
          </p>
          <p className="mb-7 text-base text-primary leading-relaxed text-body-color dark:text-dark-6">
            Total Amount Spent: {totalExpense}
          </p>
        </div>
      </div>
    </>
  );
};
