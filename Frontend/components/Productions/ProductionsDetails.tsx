import React, { useState } from "react";
import { ellipseAddress } from '../../lib/utilities'
import { faClockRotateLeft, faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ProductionsDetails({ showModal, color, setShowModal, ProductionsEntity }: any) {
  let [spinnerProcess, setSpinnerProcess] = useState(false);

  // here we check token is not expired
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
  return (
    <>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-5xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Productions Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div
                  className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6  rounded " +
                    (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                  }
                >

                  <div className="block w-full overflow-x-auto">
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
                            Raw Material Id  : {ProductionsEntity.batchesNumber}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Purchase Order Number  :                {ProductionsEntity.productionDepartmentEmployerName}

                          </td>

                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Customer Name : {ProductionsEntity.customerName}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Product Name  :{ProductionsEntity.productName}
                          </td>

                        </tr>

                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Glass Number :{ProductionsEntity.warehouseDeptEmployerName}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Tx id :{ellipseAddress(ProductionsEntity.txID)}
                          </td>

                        </tr>

                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Spray and Koller Number :{ProductionsEntity.purchaseOrderNumber}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Cover Number:  {ProductionsEntity.startProductionDate}
                          </td>

                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Sticker And Barcode :{ProductionsEntity.mixTheOil}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Carton Or BoxNumber:  {ProductionsEntity.fillBottle}
                          </td>

                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            RawMaterial Note :{ProductionsEntity.sprayCoileer}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            RawMaterial Note :{ProductionsEntity.batchSize}
                          </td>
                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{ProductionsEntity.barcode}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{ProductionsEntity.isComplete}
                          </td>
                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{ProductionsEntity.mfgDate}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{ProductionsEntity.expDate}
                          </td>
                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{ProductionsEntity.issuedByDate}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{ProductionsEntity.QAckhDate}
                          </td>
                        </tr>

                        <tr>


                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Created By :{ProductionsEntity.createdBy}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Updated By :{ProductionsEntity.updatedBy}

                          </td>

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
                            Updated At : {ProductionsEntity.updatedAt}
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            Created At :{ProductionsEntity.createdAt}
                          </th>

                        </tr>

                        <tr>
                          <th
                            colSpan={2}
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            <div className="w-full lg:w-6/12 px-4">
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
                            <div className="w-full lg:w-6/12 px-4">
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
                          </th>
                        </tr>

                        <tr>
                          <th
                            colSpan={2}
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            <div className="w-full lg:w-6/12 px-4">
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
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Spray Coileer
                                </label>
                                <input
                                  type="date"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  defaultValue=""
                                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setSprayCoileer(e.currentTarget.value);
                                  }}
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th
                            colSpan={2}
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Barcode
                                </label>
                                <input
                                  type="date"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  defaultValue=""
                                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setBarcode(e.currentTarget.value);
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
                                  BatchSize
                                </label>
                                <input
                                  type="date"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  defaultValue=""
                                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setBatchSize(e.currentTarget.value);
                                  }}
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th
                            colSpan={2}
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  IsComplete
                                </label>
                                <input
                                  type="boolean"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  defaultValue=""
                                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setIsComplete(e.currentTarget.value);
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
                          </th>
                        </tr>
                        <tr>
                          <th
                            colSpan={2}
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            <div className="w-full lg:w-6/12 px-4">
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
                            <div className="w-full lg:w-6/12 px-4">
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
                          </th>
                        </tr>
                        <tr>
                          <th
                            colSpan={2}
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            <div className="w-full lg:w-6/12 px-4">
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

                          </th>
                        </tr>
                        <tr>
                          <th
                            colSpan={2}
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            <div className="flex items-center justify-center flex-wrap">
                              <div className="w-3/12  lg:w-12/12 px-4">
                                <div className="relative  center mb-3">
                                  <button
                                    className="border-0 px-3 px-2-5 my-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    type="submit"
                                  >
                                    {spinnerProcess && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />} &nbsp;&nbsp;

                                    Updated
                                  </button>
                                </div>
                              </div>
                            </div>
                          </th>


                        </tr>


                      </tbody>
                    </table>

                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-blueGray-2-00"></div>

        </>
      ) : null
      }
    </>
  );
}

