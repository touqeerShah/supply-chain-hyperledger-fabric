
// import './globals.css'
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// components

import FooterSmall from "../components/Footers/FooterSmall";

export default function Auth({ children }: any) {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="  w-full h-full bg-white bg-no-repeat bg-full"

          >  <div
            className="absolute float-left	 top-0 w-6/12 h-full bg-white bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/bannner-2.png')",
            }}
          >
            </div>
            <div
              className="absolute float-left right-0 	 top-0 w-6/12 h-full bg-black  bg-no-repeat bg-full"

              style={{
                backgroundImage: "url('/baner-1.png')",
              }}
            >

            </div>
          </div>
          {children}
          <FooterSmall absolute />
          <ToastContainer />

        </section>
      </main>
    </>
  );
}

