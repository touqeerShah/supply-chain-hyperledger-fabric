"use client"
import React from "react";
import { useRouter } from 'next/router'
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CryptoJS from 'crypto-js';

import Link from "next/link";
// components
import { useCallback, useEffect, useState } from 'react'
import { toast } from "react-toastify";



import IndexDropdown from "../Dropdowns/IndexDropdown";
// import NotificationMenu from "../Notification/NotificationMenu"
// import SetPin from "./../Pin/SetPin"


export default function Navbar(props: any) {
  const router = useRouter()
  const [getTokenCall, setGetTokenCall] = React.useState(false);
  let isRequest = false;

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [pin, setPin] = React.useState("");
  const [checkPin, setCheckPin] = React.useState(false);
  const [isUserExist, setIsUserExist] = React.useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = React.useState(true);


  // const [web3ProviderState, setCollapseShow] = useState("hidden");


  const login = useCallback(async function () {

    router.push("auth/login")
  }, [])

  const logout = useCallback(async function () {


  }, [])

  useEffect(() => {

  }, [])

  return (
    <>
      {/* absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 */}
      <nav className={(router.pathname.indexOf("customer") == -1) && (router.pathname.indexOf("rawmaterial") == -1) && (router.pathname.indexOf("production") == -1) ? "top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-black shadow" : "absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"}>

        <div className="container px-10 mx-auto flex flex-wrap items-center justify-between">
          {(router.pathname.indexOf("customer") == -1) && (router.pathname.indexOf("rawmaterial") == -1) && (router.pathname.indexOf("production") == -1) && <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/* <Link href="/"> */}
            {/* <div className="container flex flex-wrap items-center justify-between mx-auto"> */}
            <a className=" flex items-center"
              href="#pablo">
              <img src="/logo-3.png" className="-mt-10 md:-mt-12 ml-3 md:ml-0 h-24 w-30 md:h-40 md:w-40 " alt="Flowbite Logo" />
            </a>
            {/* </div> */}
            {/* </Link> */}
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {/* <i className="fas fa-bars"></i> */}

              <FontAwesomeIcon icon={faBars} />{" "}

            </button>
          </div>}
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">

            </ul>
            <ul className="flex flex-col  lg:flex-row list-none lg:ml-auto">
              {(router.pathname.indexOf("customer") == -1) && (router.pathname.indexOf("rawmaterial") == -1) && (router.pathname.indexOf("production") == -1) &&
                <li className="flex items-center">
                  <IndexDropdown />
                </li>}

              <li className="flex items-center">

                {false ? (
                  <button className="bg-blueGray-700 text-white active:bg-blueGray-600 border-2 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button" onClick={logout}>
                    Logout
                  </button>
                ) : (
                  <button className="bg-blueGray-700 text-white active:bg-blueGray-600 border-2 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button" onClick={login}>
                    Login
                  </button>
                )}


              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
