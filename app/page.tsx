import Image from 'next/image';
import { Nav, Loader } from '@/components';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Nav />
      <Loader />
    </main>
  )
}
