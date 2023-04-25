import React, { useState, useEffect } from "react";

import { faUserCircle, faVialVirus, faBoxesPacking, faGavel } from "@fortawesome/free-solid-svg-icons";
// components

import CardStats from "../../components/Cards/CardStats";
import { post } from "../../utils"
import { Response } from "../../class/backendRequest";

export default function HeaderStats() {
  const [cCount, setCustomerCount] = useState(0)
  const [rCount, setRawMaterialCount] = useState(0)
  const [pCount, setProductCount] = useState(0)
  useEffect(() => {
    let fetch = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "JWT " + localStorage.getItem("token")
      }
      let response: Partial<Response> = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getProductionEntityCount",
          parameters: {

          },
          userId: "user2",
          organization: "org1"
        })
      }, { headers: headers });
      if (response.status === 200) {
        setProductCount(response.data.count)
      }
      response = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getCustomerEntityCount",
          parameters: {

          },
          userId: "user2",
          organization: "org1"
        })
      }, { headers: headers });
      if (response.status === 200) {
        setCustomerCount(response.data.count)
      }
      response = await post("api/get", {
        data: JSON.stringify({
          transactionCode: "002",
          apiName: "getRawMaterialEntityCount",
          parameters: {

          },
          userId: "user2",
          organization: "org1"
        })
      }, { headers: headers });
      console.log("getRawMaterialEntityCount", response);

      if (response.status === 200) {
        setRawMaterialCount(response.data.count)
      }
    }

    fetch()
  }, [])
  return (
    <>
      {/* Header */}
      <div className="relative bg-black md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Customer"
                  statTitle={cCount.toString()}
                  statArrow="up"
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName={faUserCircle}
                  statIconColor="bg-yellow-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Raw Material"
                  statTitle={rCount.toString()}
                  statArrow="down"
                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron=""
                  statIconName={faVialVirus}
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Batches"
                  statTitle={pCount.toString()}
                  statArrow="down"
                  statPercent=""
                  statPercentColor="text-orange-500"
                  statDescripiron=""
                  statIconName={faBoxesPacking}
                  statIconColor="bg-green-500"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
