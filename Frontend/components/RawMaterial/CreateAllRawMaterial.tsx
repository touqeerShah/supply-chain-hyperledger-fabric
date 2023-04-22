import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";
import {
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { post } from "../../utils"

import AddRow from "./TableRow";
import { RawMaterialEntity } from '../../class/document'
import { Response } from "../../class/backendRequest";

export default function CreateAllRawMaterial(props: any) {
  const [rawMaterialEntity, setRawMaterialEntity] = useState<RawMaterialEntity[]>()
  const [pageNo, setPageNo] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [totalRecord, setTotalRecord] = useState(0)
  const [options, setOptions] = useState<number[]>([])


  useEffect(() => {
    let fetch = async () => {
      let response: Partial<Response> = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getRawMaterialEntityCount",
          parameters: {

          },
          userId: "user2",
          organization: "org1"
        })
      });
      console.log("getRawMaterialEntityCount", response);

      if (response.status === 200 && response.data.count > 0) {
        setTotalRecord(response.data.count)

        setPageNo(Math.ceil(response.data.count / 20))
        console.log("response.data.count % 20", response.data.count / 20, "Math.ceil(response.data.count / 20)", Math.ceil(response.data.count / 20));
        let options: number[] = []
        for (let index = 0; index < Math.ceil(response.data.count / 20); index++) {
          options.push(index + 1)
        }
        setOptions(options)
        response = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "getRawMaterialByQuery",
            parameters: {
              query: {
                "selector": {
                  "rawMaterialId": {
                    "$gt": null
                  }
                },
                "sort": [
                  {
                    "createdAt": "desc"
                  }
                ],
                "skip": ((currentPage - 1) * 20)
              },
            },
            userId: "user2",
            organization: "org1"
          })
        });
        console.log("All customer ", response);
        if (response.status == 200) {
          response.data.pop()
          console.log("subArray", response.data);

          setRawMaterialEntity(response.data)
        }
      }
    }
    if (totalRecord == 0) {
      fetch()
    }
  }, [])
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (props.color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 w-full py-3 border-0">
          <div className="flex float-left w-9/12	 flex-wrap items-center">
            <div className="relative px-4 mb-3 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (props.color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {props.pageTitle}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Raw Material Id
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Purchase Order Number
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Customer Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Product Name
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  {""}
                </th>

              </tr>
            </thead>
            <tbody>
              {rawMaterialEntity &&
                rawMaterialEntity.map((item: RawMaterialEntity, i) => (
                  <AddRow
                    key={i}
                    item={item as RawMaterialEntity}
                    color={""} />
                ))
              }{!rawMaterialEntity &&
                <tr>
                  <td className="border-t-0 ml-3 font-bold px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                    No Record Found
                  </td>

                </tr>
              }
            </tbody>
          </table>
        </div>

        {rawMaterialEntity && <div className="flex items-center justify-center flex-wrap">
          <div className="w-3/12  lg:w-12/12 px-4">
            <div className="relative  center mb-3">
              <button
                className="border-0  p-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  text-sm shadow focus:outline-none focus:ring w-3/12 ease-linear transition-all duration-150"
                disabled >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>

              <select
                className="border-0  placeholder-blueGray-300 pr-1 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/4 ease-linear transition-all duration-150"
                name="lunchStatus" id="challenge"

                onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                  console.log("e.currentTarget.value", e.currentTarget.value);

                  setCurrentPage(parseInt(e.currentTarget.value))

                  // handleChange(e, props.id)
                }}>
                {
                  options.map((item, i) => (

                    <option key={i} value={item} defaultValue={options[0]}
                    >{item}</option>
                  ))
                }
              </select>
              <button
                className="border-0 p-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  text-sm shadow focus:outline-none focus:ring w-3/12 ease-linear transition-all duration-150"
                disabled >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
}

CreateAllRawMaterial.defaultProps = {
  color: "light",
  pageTitle: ""
};

CreateAllRawMaterial.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
