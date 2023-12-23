import React from 'react';
import Image from 'next/image';
import loadingAnimation from '@/lib/images/loader.png';

const Loader = () => {
  return (
    <div className='inline-block h-40 w-40 rounded-full ring-2 ring-white'>
        <Image 
                src={loadingAnimation} 
                alt='' 
                className='inline-block h-40 w-40 rounded-full ring-2 ring-white animate-spin-slow'
            />
    </div>
  )
}

export default Loader