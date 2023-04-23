import React, { useState, useEffect, useCallback } from "react";
import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";
import {
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { post } from "../../utils"
// components 

import AddRow from "./TableRow";
import { ProductionsEntity } from '../../class/document'
import { Response } from "../../class/backendRequest";

export default function CreateAllProductions(props: any) {
  const [products, setProducts] = useState<ProductionsEntity[]>()
  const [pageNo, setPageNo] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [totalRecord, setTotalRecord] = useState(0)
  const [options, setOptions] = useState<number[]>([])
  const next = useCallback(async function () {
    let temp: number = currentPage;
    temp++;
    if (temp < pageNo) {
      setCurrentPage(temp)
      setTotalRecord(0)
    }

  }, [])
  const previous = useCallback(async function () {
    let temp: number = currentPage;
    temp--
    if (temp > 0) {
      setCurrentPage(temp)
      setTotalRecord(0)
    }
  }, [])

  useEffect(() => {
    let fetch = async () => {
      let response: Partial<Response> = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getProductionEntityCount",
          parameters: {

          },
          userId: "user2",
          organization: "org1"
        })
      });
      console.log("getProductionEntityCount", response);

      if (response.status === 200 && response.data.count > 0) {
        setTotalRecord(response.data.count)

        setPageNo(Math.ceil(response.data.count / 25))
        console.log("response.data.count % 25", response.data.count / 25, "Math.ceil(response.data.count / 25)", Math.ceil(response.data.count / 25));
        let options: number[] = []
        for (let index = 0; index < Math.ceil(response.data.count / 25); index++) {
          options.push(index + 1)
        }
        setOptions(options)
        response = await post("api/get", {
          data: JSON.stringify({
            transactionCode: "002",
            apiName: "getProductionByQuery",
            parameters: {
              query: {
                "selector": {
                  "batchesNumber": {
                    "$gt": null
                  }
                },
                "sort": [
                  {
                    "createdAt": "desc"
                  }
                ],
                "skip": ((currentPage - 1) * 25)
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

          setProducts(response.data)
        }
      }
    }
    if (totalRecord == 0) {
      fetch()
    }
  }, [totalRecord])
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  " +
          (props.color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 w-full py-3 border-0">
          <div className="flex float-left w-full	 flex-wrap items-center">
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
                  Batches Number
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Production Department Employer Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Warehouse Dept Employer Name
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
              {products &&
                products.map((item: ProductionsEntity, i) => (
                  <AddRow
                    key={i}
                    item={item as ProductionsEntity}
                    color={""} />
                ))
              }{!products &&
                <tr>
                  <td className="border-t-0 ml-3 font-bold px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                    No Record Found
                  </td>

                </tr>
              }
            </tbody>
          </table>
          {products && <div className="flex items-center justify-center flex-wrap">
            <div className="w-3/12  lg:w-12/12 px-4">
              <div className="relative  center mb-3">
                <button
                  className="border-0  p-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  text-sm shadow focus:outline-none focus:ring w-3/12 ease-linear transition-all duration-150"
                  onClick={() => { previous() }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <select
                  className="border-0  placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/4 ease-linear transition-all duration-150"
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
                  onClick={() => { next() }}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

CreateAllProductions.defaultProps = {
  color: "light",
  pageTitle: ""
};

CreateAllProductions.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
