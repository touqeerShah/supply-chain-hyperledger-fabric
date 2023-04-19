import React from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";

const IndexDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef: any = React.createRef();
  const popoverDropdownRef: any = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="hover:text-blueGray-500 text-white px-3 py-4 mb-1   lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Dashboard
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-blueGray-600 text-base float-left   list-none text-left rounded shadow-lg min-w-48 border-2"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-black"
          }
        >
          Customer
        </span>


        <Link href="/customer/create-customer"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>
          Create Customer

        </Link>

        <Link href="/customer/search-customer"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>
          Search Customer

        </Link>

        <Link href="/customer/customer-list"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>
          Customer List

        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blue-100 " />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-black "
          }
        >
          Raw Material
        </span>
        <Link href="/rawmaterial/create-raw-material"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>

          Create Raw Material
        </Link>

        <Link href="/rawmaterial/search-raw-material"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>
          Search Raw Material

        </Link>

        <Link href="/rawmaterial/raw-material-list"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>
          Raw Material List

        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blue-100 " />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-black "
          }
        >
          Productions
        </span>
        <Link href="/production/create-production"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>

          Create Production
        </Link>

        <Link href="/production/search-production"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>
          Search Production

        </Link>

        <Link href="/production/production-list"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-black"
          }>
          Production List

        </Link>


      </div>
    </>
  );
};

export default IndexDropdown;
