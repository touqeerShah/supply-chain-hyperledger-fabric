import React from "react";
import {
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useCallback, useState } from "react";

import { Response } from "../../class/backendRequest";


import { post } from "../../utils";

export default function CreateCustomer() {
  // console.log("CardVerifyMyId", props);
  const router = useRouter()
  let [spinnerProcess, setSpinnerProcess] = useState(false);
  let customerId: string
  let name: string
  let date: string
  let price: string
  let deliveryData: string
  let quantity: string

  // let [customerId, setCustomerId] = useState("");
  // let [name, setName] = useState("")
  // let [date, setDate] = useState("")
  // let [price, setPrice] = useState("")
  // let [deliveryData, setDeliveryData] = useState("")
  // let [quantity, setQuantity] = useState("")
  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  useEffect(() => {


  }, [])



  const submit = useCallback(async function () {
    try {
      setSpinnerProcess(true)
      console.log("customerId", customerId);

      let response: Partial<Response> = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "customerExists",
          parameters: {
            customerId: customerId,
          },
          userId: "user1",
          organization: "org1"
        })
      });
      console.log("response", response);
      if (response.status === 200 && !response.data) {
        response = await post("api/addQueue", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "createCustomer",
            parameters: {
              customerId: customerId,
              name: name,
              date: date,
              price: price,
              deliveryData: deliveryData,
              status: "Active",
              quantity: quantity
            },
            userId: "user1",
            organization: "org1"
          })
        });
        console.log("response", response);

        if (response.status === 200) {
          toast.success("Successfully Created !")
          // setCustomerId("")
          // setDate("")
          // setDeliveryData("")
          // setName("")
          // setPrice("")
          // setQuantity("")
          // setSpinnerProcess(false)
          router.push("/customer/customer-list")
        } else {
          toast.error(response.message)
          setSpinnerProcess(false)

        }

      } else {
        toast.error(response.message)
        setSpinnerProcess(false)

      }

    } catch (error: any) {
      console.log(error);
      setSpinnerProcess(false)
      toast.error("Server Issue")

      return;
    }

  }, []);


  const myRef: React.LegacyRef<HTMLInputElement> = React.createRef();
  const isApply = false;
  return (
    <div className=" border-2 flex flex-col min-w-0 break-words w-full mt-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

      <>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Create Customer
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form
            id="create-choose-type-single"
            onSubmit={handleSubmit(submit)}
          >
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Customer Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Customer Id
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""

                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      customerId = (e.currentTarget.value);
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
                    Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      name = (e.currentTarget.value);
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
                    Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      date = (e.currentTarget.value);
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
                    Price
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      price = (e.currentTarget.value);
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
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      deliveryData = (e.currentTarget.value);

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
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      quantity = (e.currentTarget.value);
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
