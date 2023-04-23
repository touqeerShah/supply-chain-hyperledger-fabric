import React, { useState, useCallback } from "react";
import { ellipseAddress } from '../../lib/utilities'
import { faClockRotateLeft, faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { post } from "../../utils";
import { Response } from "../../class/backendRequest";
import { useRouter } from 'next/router'

export default function ProductionsDetails({ showModal, color, setShowModal, ProductionsEntity }: any) {
  console.log("ProductionsEntity.startProductionDate", ProductionsEntity.startProductionDate);
  const router = useRouter()

  let [spinnerProcess, setSpinnerProcess] = useState(false);
  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
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

  let [isSubmited, setIsSubmited] = useState(false)
  const submit = useCallback(async function () {

    setIsSubmited(true)
    if (startProductionDate != "" && startProductionDate != "" && mixTheOil != "" && fillBottle != "" && sprayCoileer != "" && barcode != "" && batchSize != "" && mfgDate != "" && issuedByDate != "" && QAckhDate != "") {
      try {
        setSpinnerProcess(true)


        let response: Partial<Response> = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "existsProduction",
            parameters: {
              batchesNumber: ProductionsEntity.batchesNumber,
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
                batchesNumber: ProductionsEntity.batchesNumber,
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
                            Batches Number  : {ProductionsEntity?.batchesNumber}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Production Department Employer Name  :                {ProductionsEntity?.productionDepartmentEmployerName}

                          </td>

                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Customer Name : {ProductionsEntity?.customerName}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Product Name  :{ProductionsEntity?.productName}
                          </td>

                        </tr>

                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Warehouse Dept Employer Name :{ProductionsEntity?.warehouseDeptEmployerName}
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
                            Purchase Order Number :{ProductionsEntity.purchaseOrderNumber}
                          </td>
                          {ProductionsEntity.startProductionDate && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Start Production Date:  {ProductionsEntity.startProductionDate}
                          </td>
                          }
                        </tr>
                        <tr>

                          {ProductionsEntity.mixTheOil && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Mix The Oil :{ProductionsEntity.mixTheOil}
                          </td>}
                          {ProductionsEntity.fillBottle && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Fill Bottle:  {ProductionsEntity.fillBottle}
                          </td>}

                        </tr>
                        <tr>

                          {ProductionsEntity.sprayCoileer && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Spray Coileer :{ProductionsEntity.sprayCoileer}
                          </td>}
                          {ProductionsEntity.batchSize && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Batch Size :{ProductionsEntity.batchSize}
                          </td>}
                        </tr>
                        <tr>

                          {ProductionsEntity.barcode && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Barcode :{ProductionsEntity.barcode}
                          </td>}
                          {ProductionsEntity.isComplete && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            IsComplete :{ProductionsEntity.isComplete}
                          </td>}
                        </tr>
                        <tr>

                          {ProductionsEntity.mfgDate && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Mfg Date :{ProductionsEntity.mfgDate}
                          </td>}
                          {ProductionsEntity.expDate && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Exp Date :{ProductionsEntity.expDate}
                          </td>}
                        </tr>
                        <tr>

                          {ProductionsEntity.issuedByDate && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Issued By Date :{ProductionsEntity.issuedByDate}
                          </td>}
                          {ProductionsEntity.QAckhDate && <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{ProductionsEntity.QAckhDate}
                          </td>}
                        </tr>

                        <tr>


                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Created By :{ProductionsEntity.createdBy}
                          </td>
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

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Updated By :{ProductionsEntity.updatedBy}

                          </td>
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

                        </tr>


                      </tbody>
                    </table>
                    <form
                      id="create-choose-type-single"
                      onSubmit={handleSubmit(submit)}
                    >
                      {!ProductionsEntity.startProductionDate &&

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

