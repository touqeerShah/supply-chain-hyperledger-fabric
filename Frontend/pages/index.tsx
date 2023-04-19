import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";
import { faBars, faWallet, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footers/Footer";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 bg-black items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-white">
                New Way to Connect Supply-Chain Private Blockchain.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white">
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Private Blockchain (Hyperledger Fabric) help you secure way of trace and trace
                </a>
                .
              </p>
              {/* <div className="mt-12">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index"
                  target="_blank"
                  rel="noreferrer"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-400 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/touqeerShah/ENS-Marketplace"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github Star
                </a>
              </div> */}
            </div>
          </div>
        </div>
        {/* <Image src="/baner.png" width={100} height={22} className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px" alt={''}/> */}
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="/baner-1.png"
          alt="..."
        />
      </section>


      <Footer />
    </>
  )
}
