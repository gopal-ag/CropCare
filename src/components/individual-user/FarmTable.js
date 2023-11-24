import React from "react";
import { useNavigate } from "react-router-dom";

function FarmTable({ farmData }) {
  const navigate = useNavigate();

  return (
    <>
      {farmData?.length > 0 ? (
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
                  <div className="font-semibold text-center">Local Area</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Village</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Taluka</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">District</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">State</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Country</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Pincode</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {farmData?.length > 0 &&
                farmData?.map((data) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/farm/${data?._id}`)}
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
                          Latitude -{" "}
                          {data?.address.location.lat
                            ? data?.address.location.lat
                            : "N/A"}
                          <div className="text-sm text-gray-500">
                            Longitute -{" "}
                            {data?.address.location.lang
                              ? data?.address.location.lang
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="d-block">
                        <div className="text-center">
                          {data?.address.localArea
                            ? data?.address.localArea
                            : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="d-block">
                        <div className="text-center">
                          {" "}
                          {data?.address.village
                            ? data?.address.village
                            : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.address.taluka ? data?.address.taluka : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.address.district
                          ? data?.address.district
                          : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span> */}
                        {data?.address.state ? data?.address.state : "N/A"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {data?.address.country ? data?.address.country : "N/A"}
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center">
                        {data?.address.pincode ? data?.address.pincode : "N/A"}
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

export default FarmTable;
