import Image from 'next/image'
import Link from 'next/link'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  return (
    <div className='home'>
      <Link href="/api/auth/login">Login</Link>
    </div>
  )
}

