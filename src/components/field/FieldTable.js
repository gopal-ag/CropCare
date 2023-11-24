import React from "react";
import { useNavigate } from "react-router-dom";

function FieldTable({ fieldData }) {
  const navigate = useNavigate();

  return (
    <>
      {fieldData?.[0] ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Tag</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Location coordinates
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Area</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Soil</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Gat Number</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {fieldData?.length > 0 &&
                fieldData?.map((data) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/field/${data?._id}`)}
                  >
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="d-block">
                          <div className="text-slate-800">{data?.name}</div>
                          {/* <div className="text-sm text-gray-500">
                            {person?.gender} {person?.email}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="d-block">
                          <div className="text-slate-800">
                            {data?.tag ? data?.tag : "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="d-block">
                        <div className="text-center">
                          Longitute -{" "}
                          {data?.location?.lang ? data?.location?.lang : "N/A"}
                          <div className="">
                            Latitude -{" "}
                            {data?.location?.lat ? data?.location?.lat : "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="d-block">
                        <div className="text-center">
                          {data?.area ? data?.area : "N/A"}{" "}
                          {data?.area ? "acres" : ""}
                        </div>
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.soil ? data?.soil : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.gatNo ? data?.gatNo : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FieldTable;
