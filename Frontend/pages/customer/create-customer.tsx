import React from "react";
import { useState } from 'react'

// components

import CreateCustomer from "../../components/Customer/CreatCustomer";

// layout for page

import Admin from "../../layouts/Admin";

export default function VerifyId() {
  console.log("VerifyId");




  return (
    <>
      <div className="flex flex-wrap">
        <div className="relative w-full lg:w-8/12 px-4">
          <CreateCustomer
          />
        </div>
      </div>
    </>
  );
}

// Settings.layout = Admin;
VerifyId.getLayout = function getLayout(page: any) {
  return (
    <Admin>{page}</Admin>
  )
}