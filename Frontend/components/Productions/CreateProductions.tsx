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
import { Response } from "../../class/backendRequest";
import { Customers, RawMaterials } from "./../../class/document"


import { post } from "../../utils";

export default function CreateProductions() {
  // console.log("CardVerifyMyId", props);
  const router = useRouter()
  let [spinnerProcess, setSpinnerProcess] = useState(false);

  let [batchesNumber, setBatchesNumber] = useState("");
  let [productionDepartmentEmployerName, setProductionDepartmentEmployerName] = useState("")
  let [date, setDate] = useState("")
  let [warehouseDeptEmployerName, setWarehouseDeptEmployerName] = useState("")

  let [purchaseOrderNumber, setPurchaseOrderNumber] = useState("")
  let [customerName, setCustomerName] = useState(0)

  let [customerNames, setCustomerNames] = useState<Partial<Customers[]>>([])

  let [productName, setProductName] = useState(0)
  let [productNames, setProductNames] = useState<Partial<RawMaterials[]>>([])


  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  useEffect(() => {
    let fetch = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "JWT " + localStorage.getItem("token")
      }

      let response: Partial<Response> = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getCustomerByQuery",
          parameters: {
            query: {
              "selector": {
                "customerId": {
                  "$gt": null
                }
              }, "fields": ["customerId"],
              "sort": [
                {
                  "createdAt": "desc"
                }
              ]
            },
          },
          userId: "user2",
          organization: "org1"
        })
      }, { headers: headers });
      console.log("All customer ", response);
      if (response && response.data && response.status == 200) {
        response.data.pop()
        console.log("subArray", response.data);

        setCustomerNames(response.data)

      }
      response = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getRawMaterialByQuery",
          parameters: {
            query: {
              "selector": {
                "$and": [{
                  "rawMaterialId": {
                    "$gt": null
                  }
                }, {
                  "receiverNote": {
                    "$gt": ""
                  }
                }]
              }, "fields": ["productName"],
              "sort": [
                {
                  "createdAt": "desc"
                }
              ]
            },
          },
          userId: "user2",
          organization: "org1"
        })
      }, { headers: headers });
      console.log("All productName ", response);
      if (response.status == 200) {
        response.data.pop()
        console.log("subArray", response.data);

        setProductNames(response.data)
      }
    }
    if (customerNames.length == 0 || productNames.length == 0) {
      fetch()
    }

  }, [])



  const submit = useCallback(async function () {
    if (customerNames.length == 0) {
      toast.error("Create Customer First")
      return;
    }
    if (productNames.length == 0) {
      toast.error("Raw Material First")
      return;
    }

    if (batchesNumber != "" && date != "" && purchaseOrderNumber != "" && productionDepartmentEmployerName != "" && warehouseDeptEmployerName != "") {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': "JWT " + localStorage.getItem("token")
        }
        let response: Partial<Response> = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "existsProduction",
            parameters: {
              batchesNumber: batchesNumber,
            },
            userId: "user2",
            organization: "org1"
          })
        }, { headers: headers });
        console.log("response", response);
        if (response.status === 200 && !response.data && customerNames) {
          response = await post("api/addQueue", {
            data: JSON.stringify({
              transactionCode: "002",
              apiName: "createProductionEntity",
              parameters: {
                batchesNumber: batchesNumber,
                date: date,
                purchaseOrderNumber: purchaseOrderNumber,
                customerName: customerNames[customerName]?.customerId,
                productName: productNames[productName]?.productName,
                productionDepartmentEmployerName: productionDepartmentEmployerName,
                warehouseDeptEmployerName: warehouseDeptEmployerName
              },
              userId: "user2",
              organization: "org1"
            })
          }, { headers: headers });
          console.log("response", response);

          if (response.status === 200) {
            toast.success("Successfully Created !")
            router.push("/production/production-list")
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


  }, [batchesNumber, date, purchaseOrderNumber, productName, customerName, productionDepartmentEmployerName, warehouseDeptEmployerName]);


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
                    Batches Number
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""

                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setBatchesNumber(e.currentTarget.value);
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

                      setCustomerName(parseInt(e.currentTarget.value))

                      // handleChange(e, props.id)
                    }}>
                    <option value="" disabled >Select Customer</option>

                    {customerNames &&
                      customerNames.map((item: any, i) => (
                        <option key={i} value={i}>{item.customerId}</option>


                      ))}

                  </select>
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
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="lunchStatus" id="challenge"

                    onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                      console.log("e.currentTarget.value", e.currentTarget.value);

                      setProductName(parseInt(e.currentTarget.value))

                      // handleChange(e, props.id)
                    }}>
                    <option value="" disabled >Select Customer</option>

                    {productNames &&
                      productNames.map((item: any, i) => (
                        <option key={i} value={i}>{item.productName}</option>


                      ))}


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
                    Production Department Employer Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setProductionDepartmentEmployerName(e.currentTarget.value);
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
                    Warehouse Dept Employer Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setWarehouseDeptEmployerName(e.currentTarget.value);

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
