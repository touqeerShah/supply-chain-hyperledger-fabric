import React from "react";
import {
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ellipseAddress } from "../../lib/utilities";
import ProductionsDetails from "./ProductionsDetails";
// components
import { ProductionsEntity } from '../../class/document'

export default function AddRow({
    item,
}: any) {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <tr>
                <td className="border-t-0 ml-3 font-bold px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                    {item.batchesNumber}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                    {item.productionDepartmentEmployerName}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                    {item.warehouseDeptEmployerName}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                    <div className="flex">
                        {item.productName}
                    </div>
                </td>

                <td className="border-t-0  align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap p-4">
                    <div className="flex items-center">
                        <span className="mr-2">{""}</span>
                        <div className="relative w-full">
                            <button
                                className="py-2.5  my-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faEye} /> &nbsp;&nbsp;{"View Details"}
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            <ProductionsDetails
                showModal={showModal}
                setShowModal={setShowModal}
                color={"light"}
                rawMaterialEntity={item as ProductionsEntity}
            />
        </>
    );
}
AddRow.defaultProps = {

    color: "light",

};
