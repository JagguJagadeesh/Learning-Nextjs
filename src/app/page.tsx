import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import i from "./favicon.ico"



export default function Home() {
  return (
    <div className="h-screen">
      <Toaster />
      <nav className="h-1/6 bg-slate-900 gap-2 flex items-center p-6">
      <Link href='/profile'>
      <Image 
                priority={false}
                src={i} 
                alt='iund' 
                className='border-white border-2 rounded-full' width={70}/>
      </Link>
      <p>Hello</p>
      </nav>
      <div className="h-5/6">
        Home
      </div>
    </div>
  );
}
