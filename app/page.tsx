import Image from 'next/image';
import { Nav, Loader } from '@/components';

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* <Nav /> */}
      <div className='flex justify-center pt-20'>
        <Loader />
      </div>
    </main>
  )
}
