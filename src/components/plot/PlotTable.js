import React from "react";
import { useNavigate } from "react-router-dom";

function PlotTable({ plotData }) {
  const navigate = useNavigate();

  console.log(plotData, "plot data");

  return (
    <>
      {plotData?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-left"
                  >
                    Name
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Tag</div>
                </th>
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-center"
                  >
                    Location coordinates
                  </div>
                </th>
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-center"
                  >
                    Plantation Details
                  </div>
                </th>
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-center"
                  >
                    Harvest Date
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Estimated Yield
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Yield</div>
                </th>
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-center"
                  >
                    Crop Details
                  </div>
                </th>
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-center"
                  >
                    Variety Details
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Soil Type</div>
                </th>
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-center"
                  >
                    State
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Centroid</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Plant Count</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">R2R Distance </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">P2P Distance</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Growing Cycle</div>
                </th>
                <th className="p-2">
                  <div
                    style={{ width: "100px" }}
                    className="font-semibold text-center"
                  >
                    Area
                  </div>
                </th>
                {/* <th className="p-2">
                      <div className="font-semibold text-center">Area Unit</div>
                    </th> */}
                <th className="p-2">
                  <div
                    style={{ width: "200px" }}
                    className="font-semibold text-center"
                  >
                    Status
                  </div>
                </th>
                {/* <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {plotData?.length > 0 &&
                plotData?.map((data) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/plot/${data?._id}`)}
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
                          Longitude -{" "}
                          {data?.location?.lang ? data?.location?.lang : "N/A"}
                          <div className="text-sm text-gray-500">
                            Latitude -{" "}
                            {data?.location?.lat ? data?.location?.lat : "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="d-block">
                        <div className="text-center">
                          {data?.plantationDate ? data?.plantationDate : "N/A"}
                          <div className="text-sm text-gray-500">
                            {data?.plantationArea
                              ? data?.plantationArea
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="d-block">
                        <div className="text-center">
                          {" "}
                          {data?.harvestDate ? data?.harvestDate : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.estimatedYield ? data?.estimatedYield : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.yield ? data?.yield : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.cropId.name ? data?.cropId.name : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.varietyId ? data?.varietyId : "N/A"}
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center">
                        {data?.soilType ? data?.soilType : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.state ? data?.state : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.centroid ? data?.centroid : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.plantCount ? data?.plantCount : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.r2rDistance ? data?.r2rDistance : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.p2pDistance ? data?.p2pDistance : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.growingCycle ? data?.growingCycle : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.area ? data?.area : "N/A"}{" "}
                        {data?.area ? "acres" : ""}
                      </div>
                    </td>
                    {/* <td className="p-2">
                          <div className="text-center">
                            {data?.areaUnit ? data?.areaUnit : "N/A"}
                          </div>
                        </td> */}
                    <td className="p-2">
                      <div className="text-center">
                        <span class="p-2 inline-flex text-sm leading-5 font-semibold rounded-lg bg-green-100 text-green-800">
                          {data?.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    {/* <td className="p-2">
                          <div className="text-center">
                            <div className="flex justify-between">
                              <button
                                onClick={() => {
                                  setDeleteModalOpen(true);
                                  setSelectedPlot(data);
                                }}
                              >
                                <MdDelete className="text-2xl text-red-500" />
                              </button>
                              <button onClick={() => handleEdit(data)}>
                                <AiFillEdit className="text-2xl text-green-500" />
                              </button>
                            </div>
                          </div>
                        </td> */}
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

export default PlotTable;
