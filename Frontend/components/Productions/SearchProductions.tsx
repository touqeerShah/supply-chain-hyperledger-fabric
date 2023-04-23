import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { faClockRotateLeft, faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { ellipseAddress } from '../../lib/utilities'
import { useEffect, useState } from "react";
import { ProductionsEntity } from '../../class/document'
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { post } from "../../utils";
import { Response } from "../../class/backendRequest";
import { useRouter } from 'next/router'

// components



export default function SearchRawMaterial() {

  // pin verficiation 
  let [spinnerProcess, setSpinnerProcess] = useState(false);
  const [productionDetails, setProductionDetails] = React.useState<Partial<ProductionsEntity>>();

  const [production, setProduction] = React.useState("");
  let [startProductionDate, setStartProductionDate] = useState("")
  let [mixTheOil, setMixTheOil] = useState("")
  let [fillBottle, setFillBottle] = useState("")
  let [sprayCoileer, setSprayCoileer] = useState("")
  let [barcode, setBarcode] = useState("")
  let [batchSize, setBatchSize] = useState("")
  let [isComplete, setIsComplete] = useState("")
  let [mfgDate, setMfgDate] = useState("")
  let [expDate, setExpDate] = useState("")
  let [issuedByDate, setIssuedByDate] = useState("")
  let [QAckhDate, setQAckhDate] = useState("")
  let color = "light"
  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  let [isSubmited, setIsSubmited] = useState(false)
  let [showFeild, setShowFeild] = useState(false)

  const update = useCallback(async function () {

    setIsSubmited(true)
    if (productionDetails?.batchesNumber == "") {
      toast.error("Search record First")
    }
    if (startProductionDate != "" && startProductionDate != "" && mixTheOil != "" && fillBottle != "" && sprayCoileer != "" && barcode != "" && batchSize != "" && mfgDate != "" && issuedByDate != "" && QAckhDate != "") {
      try {
        setSpinnerProcess(true)


        let response: Partial<Response> = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "existsProduction",
            parameters: {
              batchesNumber: productionDetails?.batchesNumber,
            },
            userId: "user2",
            organization: "org1"
          })
        });
        console.log("response", response);
        if (response.status === 200 && response.data) {
          response = await post("api/addQueue", {
            data: JSON.stringify({
              transactionCode: "002",
              apiName: "finishProduct",
              parameters: {
                batchesNumber: productionDetails?.batchesNumber,
                startProductionDate: startProductionDate,
                mixTheOil: mixTheOil,
                fillBottle: fillBottle,
                sprayCoileer: sprayCoileer,
                barcode: barcode,
                batchSize: batchSize,
                isComplete: isComplete == "false" ? false : true,
                mfgDate: mfgDate,
                expDate: expDate,
                issuedByDate: issuedByDate,
                QAckhDate: QAckhDate
              },
              userId: "user2",
              organization: "org1"
            })
          });
          console.log("response", response);

          if (response.status === 200) {
            // toast.success("Successfully Created !")
            // router.reload()
          } else {
            toast.error(response.message)
            setSpinnerProcess(false)

          }

        } else {
          toast.error(response.message)
          setSpinnerProcess(false)
          setIsSubmited(false)

        }

      } catch (error: any) {
        console.log(error);
        setIsSubmited(false)
        setSpinnerProcess(false)
        toast.error("Server Issue")

        return;
      }
    } else {
      toast.warning("All Fields are Required")
    }


  }, [startProductionDate, mixTheOil, fillBottle, sprayCoileer, barcode, batchSize, isComplete, mfgDate, expDate, issuedByDate, QAckhDate]);
  const search = useCallback(async function () {
    try {

      if (production != "") {
        setSpinnerProcess(true)


        let response: Partial<Response> = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "getProductionDetails",
            parameters: {
              batchesNumber: production.trim(),
            },
            userId: "user2",
            organization: "org1"
          })
        });
        console.log("response", response);
        if (response.status === 200 && response.data) {
          setShowFeild(true)
          setProductionDetails(response.data)
          setSpinnerProcess(false)

        } else {
          setShowFeild(false)
          let temp: Partial<ProductionsEntity> = {}
          setProductionDetails(temp)
          toast.warn(response.message)
          setSpinnerProcess(false)
        }
      } else {
        toast.warning("Batch Number is Required")
      }
    } catch (error: any) {
      console.log(error);
      setSpinnerProcess(false)
      toast.error("Server Issue")
      return;
    }
  }, [production]);


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
                  Search Production
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <form
              id="create-choose-type-single"
              onSubmit={handleSubmit(search)}
            >
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
                      placeholder="Batch Number"
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setProduction(e.currentTarget.value);
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
                    >
                      {spinnerProcess && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />} &nbsp;&nbsp;

                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>


                </tr>
              </thead>
              <tbody>
                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Batches Number  : {productionDetails?.batchesNumber}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Production Department Employer Name  :                {productionDetails?.productionDepartmentEmployerName}

                  </td>

                </tr>
                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Customer Name : {productionDetails?.customerName}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Product Name  :{productionDetails?.productName}
                  </td>

                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Warehouse Dept Employer Name :{productionDetails?.warehouseDeptEmployerName}
                  </td>
                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Tx id :{ellipseAddress(productionDetails?.txID)}
                  </td>

                </tr>

                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Purchase Order Number :{productionDetails?.purchaseOrderNumber}
                  </td>
                  {productionDetails?.startProductionDate && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Start Production Date:  {productionDetails?.startProductionDate}
                  </td>
                  }
                </tr>
                <tr>

                  {productionDetails?.mixTheOil && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Mix The Oil :{productionDetails?.mixTheOil}
                  </td>}
                  {productionDetails?.fillBottle && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Fill Bottle:  {productionDetails?.fillBottle}
                  </td>}

                </tr>
                <tr>

                  {productionDetails?.sprayCoileer && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Spray Coileer :{productionDetails?.sprayCoileer}
                  </td>}
                  {productionDetails?.batchSize && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Batch Size :{productionDetails?.batchSize}
                  </td>}
                </tr>
                <tr>

                  {productionDetails?.barcode && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Barcode :{productionDetails?.barcode}
                  </td>}
                  {productionDetails?.isComplete && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    IsComplete :{productionDetails?.isComplete}
                  </td>}
                </tr>
                <tr>

                  {productionDetails?.mfgDate && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Mfg Date :{productionDetails?.mfgDate}
                  </td>}
                  {productionDetails?.expDate && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Exp Date :{productionDetails?.expDate}
                  </td>}
                </tr>
                <tr>

                  {productionDetails?.issuedByDate && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Issued By Date :{productionDetails?.issuedByDate}
                  </td>}
                  {productionDetails?.QAckhDate && <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Receiver Note :{productionDetails?.QAckhDate}
                  </td>}
                </tr>

                <tr>


                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Created By :{productionDetails?.createdBy}
                  </td>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Created At :{productionDetails?.createdAt}
                  </th>

                </tr>


                <tr>

                  <td className={
                    "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                    Updated By :{productionDetails?.updatedBy}

                  </td>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    Updated At : {productionDetails?.updatedAt}
                  </th>

                </tr>


              </tbody>
            </table>
            <form
              id="create-choose-type-single"
              onSubmit={handleSubmit(update)}
            >
              {!productionDetails?.startProductionDate && showFeild &&

                <>
                  <div className="flex pt-8 flex-wrap">

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Start Production Date
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setStartProductionDate(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Mix The Oil
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setMixTheOil(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>



                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Fill Bottle
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setFillBottle(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Spray Coileer
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setSprayCoileer(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Barcode
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setBarcode(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Batch Size
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setBatchSize(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          IsComplete
                        </label>

                        <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          name="lunchStatus" id="challenge"

                          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                            console.log("e.currentTarget.value", e.currentTarget.value);

                            setIsComplete((e.currentTarget.value))

                            // handleChange(e, props.id)
                          }}>
                          <option value="" disabled >Select Is Completed</option>
                          <option value={"false"}  >No</option>
                          <option value={"true"}  >Yes</option>


                        </select>
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Mfg Date
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setMfgDate(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Exp Date
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setExpDate(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Issued By Date
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setIssuedByDate(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4 ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          QA Date
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue=""
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setQAckhDate(e.currentTarget.value);
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
                          disabled={isSubmited}
                        >

                          {spinnerProcess && <> <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> &nbsp;</>}

                          Update
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
    </div >
  );
}

SearchRawMaterial.defaultProps = {
  color: "light",

};

SearchRawMaterial.propTypes = {
  color: PropTypes.oneOf(["light", "dark"])
};
