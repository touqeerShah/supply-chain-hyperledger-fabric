import React from "react";
import { useState } from 'react'

// components

import SearchRawMaterial from "../../components/Productions/SearchProductions";

// layout for page

import Admin from "../../layouts/Admin";

export default function VerifyId() {
  console.log("VerifyId");




  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <SearchRawMaterial

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