import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { faClockRotateLeft, faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { ellipseAddress } from '../../lib/utilities'
import { useEffect, useState } from "react";
import { RawMaterialEntity } from '../../class/document'
import { Response } from "../../class/backendRequest";
import { post } from "../../utils";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'

// components



export default function SearchRawMaterial() {
  let [receiveNote, setReceiveNote] = useState("")
  const router = useRouter()

  // pin verficiation 
  let [spinnerProcess, setSpinnerProcess] = useState(false);
  const [rawMaterialDetails, setRawMaterialDetails] = React.useState<Partial<RawMaterialEntity>>();
  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const [rawMaterialId, setRawMaterial] = React.useState("");
  const [pin, setPin] = React.useState("");
  let color = "light"
  const received = useCallback(async function () {


    if (receiveNote != "" && rawMaterialId != "") {
      try {
        setSpinnerProcess(true)


        let response: Partial<Response> = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "existsRawMaterial",
            parameters: {
              rawMaterialId: rawMaterialId,
            },
            userId: "user2",
            organization: "org1"
          })
        });
        console.log(rawMaterialDetails?.rawMaterialId, "response", response);
        if (response.status === 200 && response.data) {
          response = await post("api/addQueue", {
            data: JSON.stringify({
              transactionCode: "002",
              apiName: "receiving",
              parameters: {
                rawMaterialId: rawMaterialId,

                receiverNote: receiveNote
              },
              userId: "user2",
              organization: "org1"
            })
          });
          console.log("response", response);

          if (response.status === 200) {
            toast.success("Successfully Created !")
            router.reload()
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
    }


  }, [receiveNote, rawMaterialId]);
  const submit = useCallback(async function () {
    try {
      setSpinnerProcess(true)
      console.log("customerId", rawMaterialId,);

      let response: Partial<Response> = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getRawMaterialDetails",
          parameters: {
            rawMaterialId: rawMaterialId,
          },
          userId: "user2",
          organization: "org1"
        })
      });
      console.log("response", response);
      if (response.status === 200) {
        setRawMaterialDetails(response.data)
        setSpinnerProcess(false)

      } else if (response.status == 404) {
        let temp: Partial<RawMaterialEntity> = {}
        setRawMaterialDetails(temp)
        toast.warn(response.message)
        setSpinnerProcess(false)

      }
    } catch (error: any) {
      console.log(error);
      setSpinnerProcess(false)
      toast.error("Server Issue")

      return;
    }

  }, [rawMaterialId]);
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
                  Search Raw Material
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
                    placeholder="Raw Material Id "
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setRawMaterial(e.currentTarget.value);
                    }}
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
                    Raw Material Id  : {rawMaterialDetails?.rawMaterialId}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Purchase Order Number  :                {rawMaterialDetails?.purchaseOrderNumber}

                  </td>

                </tr>
                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Customer Name : {rawMaterialDetails?.customerName}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Product Name  :{rawMaterialDetails?.productName}
                  </td>

                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Glass Number :{rawMaterialDetails?.glassNumber}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Tx id :{ellipseAddress(rawMaterialDetails?.txID)}
                  </td>

                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Spray and Koller Number :{rawMaterialDetails?.sprayKollerNumber}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Cover Number:  {rawMaterialDetails?.coverNumber}
                  </td>

                </tr>
                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Sticker And Barcode :{rawMaterialDetails?.StickerAndBarcode}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Carton Or BoxNumber:  {rawMaterialDetails?.cartonOrBoxNumber}
                  </td>

                </tr>
                <tr>

                  <td colSpan={2} className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    RawMaterial Note :{rawMaterialDetails?.rawMaterialNote}
                  </td>
                </tr>
                <tr>

                  <td colSpan={2} className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Receiver Note :{rawMaterialDetails?.receiverNote}
                  </td>
                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Created By :{rawMaterialDetails?.createdBy}
                  </td>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Created At :{rawMaterialDetails?.createdAt}
                  </th>
                </tr>


                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Updated At : {rawMaterialDetails?.updatedAt}
                  </th>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Updated By :{rawMaterialDetails?.updatedBy}

                  </td>


                </tr>



              </tbody>
            </table>

            <form
              id="create-choose-type-single"
              onSubmit={handleSubmit(received)}
            >
              {rawMaterialDetails?.receiverNote == "" &&

                <>
                  <div className="w-full lg:w-full  px-4">
                    <div className="relative w-full bg-blueGray-50 mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Receiver Note
                      </label>
                      <textarea
                        className="border-0 px-3 py-3 border-2 bg-blueGray-50 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue=""
                        rows={4} cols={50}
                        onChange={(e: any) => {
                          setReceiveNote(e.currentTarget.value);

                        }}
                      />
                    </div>
                  </div>


                  <div className="flex items-center justify-center flex-wrap">
                    <div className="w-3/12  lg:w-12/12 px-4">
                      <div className="relative  center mb-3">
                        <button
                          className="border-0 px-3 px-2-5 my-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          type="submit"

                        >

                          {spinnerProcess && <> <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> &nbsp;</>}

                          Received
                        </button>
                      </div>
                    </div>
                  </div>

                </>
              }
            </form>

          </div>
        </div>

      </>
    </div>
  );
}

SearchRawMaterial.defaultProps = {
  color: "light",

};

SearchRawMaterial.propTypes = {
  color: PropTypes.oneOf(["light", "dark"])
};
