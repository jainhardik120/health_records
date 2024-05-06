"use client"

import Image from "next/image"
import Snap1 from "./Snap1.png"
import Snap2 from "./Snap2.png"

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-black to-gray-900 text-white py-12">
        <header className="h-screen flex items-center">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-snug">Your Trusted Medical Records Guardian</h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed">Empowering patients and healthcare providers with secure, decentralized medical record management.</p>
          </div>
        </header>
        <section className="h-screen flex items-center">
          <div className="mx-auto w-4/5 flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 leading-snug">Revolutionizing Healthcare with Blockchain Technology</h2>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">HealthChain ensures privacy, security, and accessibility of medical data, revolutionizing the way healthcare information is managed and shared.</p>
          </div>
            <div className="md:w-1/2 max-h-svh text-center md:text-left">
              <Image src={Snap2} alt="Code Snippet" layout="responsive" width={800} height={600} />
            </div>
          </div>
        </section>
        <section className="h-screen flex items-center">
          <div className="mx-auto w-4/5 flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-snug">Secure File Encryption with IPFS Integration</h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed">Before uploading files to IPFS, MediChain encrypts them using industry-standard encryption algorithms, ensuring maximum security and confidentiality.</p>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <Image src={Snap1} alt="Code Snippet" layout="responsive" width={800} height={600} />
            </div>
          </div>
        </section>

      </div>

    </>
  )
};
