import React, { useState, useCallback } from "react";
import { ellipseAddress } from '../../lib/utilities'
import { faClockRotateLeft, faBan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Response } from "../../class/backendRequest";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { post } from "../../utils";

export default function RawMaterialDetails({ showModal, color, setShowModal, rawMaterialEntity }: any) {
  let [spinnerProcess, setSpinnerProcess] = useState(false);
  let [receiveNote, setReceiveNote] = useState("")
  const router = useRouter()
  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  // here we check token is not expired
  const submit = useCallback(async function () {


    if (receiveNote != "") {
      try {
        setSpinnerProcess(true)


        let response: Partial<Response> = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "existsRawMaterial",
            parameters: {
              rawMaterialId: rawMaterialEntity.rawMaterialId,
            },
            userId: "user2",
            organization: "org1"
          })
        });
        console.log(rawMaterialEntity.rawMaterialId, "response", response);
        if (response.status === 200 && response.data) {
          response = await post("api/addQueue", {
            data: JSON.stringify({
              transactionCode: "002",
              apiName: "receiving",
              parameters: {
                rawMaterialId: rawMaterialEntity.rawMaterialId,

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


  }, [receiveNote]);

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
                    Raw Material Details
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
                            Raw Material Id  : {rawMaterialEntity.rawMaterialId}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Purchase Order Number  :                {rawMaterialEntity.purchaseOrderNumber}

                          </td>

                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Customer Name : {rawMaterialEntity.customerName}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Product Name  :{rawMaterialEntity.productName}
                          </td>

                        </tr>

                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Glass Number :{rawMaterialEntity.glassNumber}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Tx id :{ellipseAddress(rawMaterialEntity.txID)}
                          </td>

                        </tr>

                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Spray and Koller Number :{rawMaterialEntity.sprayKollerNumber}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Cover Number:  {rawMaterialEntity.coverNumber}
                          </td>

                        </tr>
                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Sticker And Barcode :{rawMaterialEntity.StickerAndBarcode}
                          </td>
                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Carton Or BoxNumber:  {rawMaterialEntity.cartonOrBoxNumber}
                          </td>

                        </tr>
                        <tr>

                          <td colSpan={2} className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            RawMaterial Note :{rawMaterialEntity.rawMaterialNote}
                          </td>
                        </tr>
                        <tr>

                          <td colSpan={2} className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Receiver Note :{rawMaterialEntity.receiverNote}
                          </td>
                        </tr>

                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Created By :{rawMaterialEntity.createdBy}
                          </td>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            Created At :{rawMaterialEntity.createdAt}
                          </th>


                        </tr>


                        <tr>

                          <td className={
                            "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                            Updated By :{rawMaterialEntity.updatedBy}

                          </td>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            Updated At : {rawMaterialEntity.updatedAt}
                          </th>


                        </tr>



                      </tbody>
                    </table>
                    <form
                      id="create-choose-type-single"
                      onSubmit={handleSubmit(submit)}
                    >
                      {rawMaterialEntity.receiverNote == "" &&

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

