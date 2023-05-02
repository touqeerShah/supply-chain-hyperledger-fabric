import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { post } from "../../utils";

import { faClockRotateLeft, faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { ellipseAddress } from '../../lib/utilities'
import { useEffect, useState } from "react";
import { CustomerEntity } from '../../class/document'
import { Response } from "../../class/backendRequest";


// components



export default function SearchCustomer() {

  // pin verficiation 
  let [spinnerProcess, setSpinnerProcess] = useState(false);
  const [customerDetails, setCustomerDetails] = React.useState<Partial<CustomerEntity>>();
  const [customerId, setCustomerId] = React.useState("");
  // const customerId: React.LegacyRef<HTMLInputElement> = React.createRef();

  // const [customerId, setCustomerId] = React.useState("");
  let color = "light"
  const submit = useCallback(async function () {
    try {
      setSpinnerProcess(true)
      console.log("customerId", customerId,);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "JWT " + localStorage.getItem("token")
      }
      let response: Partial<Response> = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getCustomerDetails",
          parameters: {
            customerId: customerId,
          },
          userId: "user2",
          organization: "org1"
        })
      }, { headers: headers });
      console.log("response", response);
      if (response.status === 200) {
        setCustomerDetails(response.data)
        setSpinnerProcess(false)

      } else if (response.status == 404) {
        let temp: Partial<CustomerEntity> = {}
        setCustomerDetails(temp)
        toast.warn(response.message)
        setSpinnerProcess(false)

      }
    } catch (error: any) {
      console.log(error);
      setSpinnerProcess(false)
      toast.error("Server Issue")

      return;
    }

  }, [customerId]);

  let handleChange = (event: any) => {
    console.log("event.target.value", event.target.value);

    setCustomerId(event.target.value);
  }
  return (
    <div className="relative border-2 flex flex-col min-w-0 break-words w-full mt-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

      <>
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6  rounded " +
            (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  Search Customer
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-9/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    {""}&nbsp;
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    placeholder="Customer Id / Order Number"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >

                  </label>
                  <button
                    className="border-0 px-3 px-2-5 my-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => { submit() }}
                  >
                    {spinnerProcess && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />} &nbsp;&nbsp;

                    Search
                  </button>
                </div>
              </div>
            </div>
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Search Result
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    {"         "}&nbsp;
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Customer Id  : {customerDetails?.customerId}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Name  :                {customerDetails?.name}

                  </td>

                </tr>
                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Date : {customerDetails?.date}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Price  :{customerDetails?.price}
                  </td>

                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Delivery Date :{customerDetails?.deliveryData}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Tx id :{ellipseAddress(customerDetails?.txID)}
                  </td>

                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Quantity :{customerDetails?.quantity}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Status:  {customerDetails?.status}
                  </td>

                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Created By :{customerDetails?.createdBy}
                  </td><th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Created At :{customerDetails?.createdAt}
                  </th>


                </tr>


                <tr>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Updated By :{customerDetails?.updatedBy}

                  </td>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Updated At : {customerDetails?.updatedAt}
                  </th>


                </tr>




              </tbody>
            </table>



          </div>
        </div>

      </>
    </div>
  );
}

SearchCustomer.defaultProps = {
  color: "light",

};

SearchCustomer.propTypes = {
  color: PropTypes.oneOf(["light", "dark"])
};
