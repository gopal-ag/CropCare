import React from "react";
import FarmerIcon from "../../images/farmer.png";
import { useNavigate } from "react-router-dom";

function UsersData({ farmersData }) {
  const navigate = useNavigate();
  return (
    <>
      {farmersData?.length > 0 &&
        farmersData?.map((person) => (
          <tr
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/user/${person?._id}`)}
          >
            <td className="p-2">
              <div className="flex items-center">
                {/* <img
                  src={person?.image ? person?.image : FarmerIcon}
                  alt="farmer"
                  className="w-15 h-10 mr-5 rounded-full"
                /> */}
                <div
                  style={{
                    backgroundImage: `url(${
                      person?.image ? person?.image : FarmerIcon
                    })`,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundSize: "cover",
                    marginRight: "15px",
                    marginBottom: "2px",
                  }}
                  className="img-fluid"
                ></div>
              </div>
            </td>
            <td className="p-2">
              <div className="flex items-center">
                <div className="d-block">
                  <div className="text-slate-800">
                    {person?.firstName} {person?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {person?.gender} {person?.email}
                  </div>
                </div>
              </div>
            </td>
            <td className="p-2">
              <div className="d-block">
                <div className="text-center">{person?.dob}</div>
                {/* <div className="text-sm text-gray-500">
                {person.department}
              </div> */}
              </div>
            </td>
            <td className="p-2">
              <div className="d-block">
                <div className="text-center">
                  {person?.phoneNumber ? person?.phoneNumber : "N/A"}
                </div>
                {/* <div className="text-sm text-gray-500">
                {person.department}
              </div> */}
              </div>
            </td>
            <td className="p-2">
              <div className="d-block">
                <div className="text-center">
                  {person?.education ? person?.education : "N/A"}
                </div>
                {/* <div className="text-sm text-gray-500">
                {person.department}
              </div> */}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span> */}
                {person?.address?.village ? person?.address?.village : "N/A"}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span> */}
                {person?.address?.taluka ? person?.address?.taluka : "N/A"}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span> */}
                {person?.address?.district ? person?.address?.district : "N/A"}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {person?.address?.state ? person?.address?.state : "N/A"}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {person?.address?.country ? person?.address?.country : "N/A"}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {person?.address?.pincode ? person?.address?.pincode : "N/A"}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                {" "}
                {person?.type ? person?.type : "N/A"}
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">
                <span
                  class={`p-2 inline-flex text-sm leading-5 font-semibold rounded-lg ${
                    person?.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {person?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}

export default UsersData;
