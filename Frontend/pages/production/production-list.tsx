import React from "react";
import { useState } from 'react'

// components

import CreateAllProductions from "../../components/Productions/CreateAllProductions";

// layout for page

import Admin from "../../layouts/Admin";

export default function VerifyId() {
  console.log("VerifyId");




  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-10/12 px-4">
          <CreateAllProductions
            pageTitle={"Product list"}
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