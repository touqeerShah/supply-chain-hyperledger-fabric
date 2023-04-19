import React from "react";
import {
  faFingerprint,
  faSpinner,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useCallback, useState } from "react";


import { post } from "../../utils";

export default function CreateRawMaterial() {
  // console.log("CardVerifyMyId", props);
  const router = useRouter()
  let [spinnerProcess, setSpinnerProcess] = useState(false);

  let [rawMaterialId, setRawMaterialId] = useState("");
  let [purchaseOrderNumber, setPurchaseOrderNumber] = useState("")
  let [date, setDate] = useState("")
  let [customerName, setCustomerName] = useState("")

  let [customerNames, setCustomerNames] = useState("")
  let [productName, setProductName] = useState("")
  let [glassNumber, setGlassNumber] = useState("")
  let [sprayKollerNumber, setSprayKollerNumber] = useState("")
  let [coverNumber, setCoverNumber] = useState("")
  let [stickerAndBarcode, setStickerAndBarcode] = useState("")
  let [cartonOrBoxNumber, setCartonOrBoxNumber] = useState("")
  let [rawMaterialNote, setRawMaterialNote] = useState("")

  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  useEffect(() => {


  }, [])



  const submit = useCallback(async function () {
    try {

    } catch (error: any) {
      console.log(error);

      // console.log(error.message.substring(0, error.message.indexOf("("))); // "Hello"
      // toast.error(error.message.substring(0, error.message.indexOf("(")));

      return;
    }

  }, []);


  const myRef: React.LegacyRef<HTMLInputElement> = React.createRef();
  const isApply = false;
  return (
    <div className="relative border-2 flex flex-col min-w-0 break-words w-full mt-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

      <>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Create Raw Material
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form
            id="create-choose-type-single"
            onSubmit={handleSubmit(submit)}
          >
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {""}&nbsp;

            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    RawMaterial Id
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""

                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setRawMaterialId(e.currentTarget.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Customer Name
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="lunchStatus" id="challenge"

                    onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                      console.log("e.currentTarget.value", e.currentTarget.value);

                      setCustomerName(e.currentTarget.value)

                      // handleChange(e, props.id)
                    }}>
                    <option value="" disabled >Select Customer</option>
                    <option value="ForSignature">For Signature</option>
                    <option value="SignByMe">Sign By Me</option>


                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setDate(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Glass Number
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setGlassNumber(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Purchase Order Number
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setPurchaseOrderNumber(e.currentTarget.value);

                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Product Name

                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setProductName(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Spray& Koller Number
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setSprayKollerNumber(e.currentTarget.value);

                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cover Number

                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setProductName(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Sticker And Barcode
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setStickerAndBarcode(e.currentTarget.value);

                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Carton Or Box Number

                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setProductName(e.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Raw Material Note
                  </label>
                  <textarea
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    rows={4} cols={50}
                    onChange={(e: any) => {
                      setPurchaseOrderNumber(e.currentTarget.value);

                    }}
                  />
                </div>
              </div>
            </div>


            <div className="flex items-center justify-center flex-wrap">
              <div className="w-3/12  lg:w-12/12 px-4">
                <div className="relative  center mb-3">
                  <button
                    className="border-0 px-3 px-2-5 my-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {spinnerProcess && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />} &nbsp;&nbsp;

                    Create
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
