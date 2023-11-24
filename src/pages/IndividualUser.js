import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import FarmerIcon from "../images/farmer.png";
import "react-toastify/dist/ReactToastify.css";
import FarmTable from "../components/individual-user/FarmPage";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { replace } from "formik";
import useBreakpoint from "../utils/useBreakpoint";
// import FieldTable from "../components/individual-user/FieldTable";
// import FarmModal from "../components/onboarding/FarmModal";
// import PlotTable from "../components/individual-user/PlotTable";
import { AiFillEdit } from "react-icons/ai";
import UserModal from "../components/onboarding/UserModal";
import DeleteModal from "../components/DeleteModal";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import FarmPage from "../components/individual-user/FarmPage";
import { useSelector } from "react-redux";

function IndividualUser() {
  const [userData, setUserData] = useState([]);
  const [farmData, setFarmData] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const [cropList, setCropList] = useState([]);
  const [refetch, setRefetch] = useState([]);
  const [offset, setOffset] = useState(1);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { isMobile, isTablet, isLarge } = useBreakpoint();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getindividualUser();
    getCropList();
  }, []);

  useEffect(() => {
    if (refetch) {
      getFarmData();
      getindividualUser();
    }
  }, [refetch]);

  const getindividualUser = async () => {
    const endpoint = `${baseUrl}/user/${id}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response.data.body, "ye user data response");
        setUserData(response?.data.body);
        getFarmData();
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getCropList = async () => {
    const endpoint = `${baseUrl}/plot/list/${id}?all=cropId`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response.data.body, "ye user data response");
        setCropList(response?.data.body);
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getFarmData = async () => {
    const endpoint = `${baseUrl}/farm/all/${id}?page=${offset}&limit=${perPage}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response, "ye farm data response");
        setFarmData(response?.data.data);
        setPageCount(response.data.totalPages);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const deleteUser = (id) => {
    const endpoint = `${baseUrl}/user/${id}`;
    const token = localStorage.getItem("token");

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          let response = await axios.delete(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.status);
          if (response.status === 200) {
            resolve(response);
            console.log(response);
            navigate("/users");
          }
        } catch (error) {
          reject(error);
          console.log(error);
        }
      }),
      {
        pending: "Deleting User...",
        success: "User deleted Successfully 👍",
        error: "Error deleting user 🤯",
      }
    );
  };

  console.log(cropList, "croplist");

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div
            style={{
              width: "100%",
              height: "205px",
              marginTop: "-6rem",
              backgroundColor: "#7ee8fa",
              backgroundImage:
                "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
            }}
            className=""
          ></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* <h1 className="text-2xl mb-4 font-semibold text-gray-900">
            User Information
          </h1> */}
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="">
              <div className="flex  flex-col lg:flex-col xl:flex-row">
                <div
                  style={
                    isMobile && isTablet
                      ? { width: "100%", height: "auto", marginTop: "-7rem" }
                      : isLarge
                      ? { width: "600px", height: "600px", marginTop: "-7rem" }
                      : { width: "465px", height: "600px", marginTop: "-7rem" }
                  }
                >
                  <img
                    style={{
                      borderRadius: "50px",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="p-8"
                    src={userData[0]?.image ? userData[0]?.image : FarmerIcon}
                    alt=""
                  />
                </div>
                <div style={{ marginTop: "-10px" }} class="p-5">
                  {/* <div className="flex">
                  <h5 class="mb-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Name
                  </h5>

                  <h5
                    style={{ marginTop: "-2px" }}
                    class="mb-2 ml-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {userData[0]?.firstName} {userData[0]?.lastName}
                  </h5>
                </div> */}
                  <div
                    className={
                      userData[0]?.type
                        ? "w-full pt-8 py-4 px-8 bg-white shadow-lg rounded-lg my-5"
                        : "w-full py-4 px-8 bg-white shadow-lg rounded-lg my-5"
                    }
                  >
                    <div className="flex items-center justify-between mb-10">
                      <div className="">
                        <span
                          class={`p-2 inline-flex text-sm leading-5 font-semibold rounded-lg border border-primary ${
                            userData[0]?.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {userData[0]?.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      {userData[0]?.type && (
                        <div className="float-right shadow-lg shadow-green-500/50 inline-flex rounded-2xl items-center py-2 px-3 text-sm font-medium text-cente bg-[#00AB55] hover:bg-[#00AB55] text-white">
                          {userData[0]?.type}
                        </div>
                      )}
                    </div>
                    <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 justify-around">
                      <div>
                        <h2 class="text-gray-600 ">Name</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          {userData[0]?.firstName} {userData[0]?.lastName}
                        </h5>
                      </div>
                      <div className=" md:mb-5">
                        <h2 class="text-gray-600 ">Village</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          {userData[0]?.address.village
                            ? userData[0]?.address.village
                            : "N/A"}
                        </h5>
                      </div>{" "}
                      <div className="md:mb-5">
                        <h2 class="text-gray-600 ">District</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          {userData[0]?.address.district
                            ? userData[0]?.address.district
                            : "N/A"}
                        </h5>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-2">
                      <div>
                        <h2 class="text-gray-600 ">Gender</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          {userData[0]?.gender ? userData[0]?.gender : "N/A"}
                        </h5>
                      </div>
                      <div className=" md:mb-5">
                        <h2 class="text-gray-600 ">Education</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          {userData[0]?.education
                            ? userData[0]?.education
                            : "N/A"}
                        </h5>
                      </div>{" "}
                      <div className=" md:mb-5 ">
                        <h2 class="text-gray-600 ">Date of Birth</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          {userData[0]?.dob ? userData[0]?.dob : "N/A"}
                        </h5>
                      </div>
                    </div>

                    {cropList?.length > 0 && (
                      <div>
                        <h2 class="text-gray-600 my-4">Crops</h2>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                          {cropList
                            ?.filter((item) => item.cropId)
                            .map((crop) => (
                              <div class="border border-green-300 bg-green-100 text-green-800 text-sm text-center font-semibold px-2 py-1 rounded-md">
                                {crop?.cropId?.name}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    <details className="text-[#00AB55] mt-5 mb-5">
                      <summary
                        className={
                          isMobile ? "text-lg font-bold" : "text-xl font-bold"
                        }
                      >
                        Show more information
                      </summary>
                      <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-5">
                        <div>
                          <h2 class="text-gray-600 ">Local Area</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {userData[0]?.address.localArea
                              ? userData[0]?.address.localArea
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Email</h2>
                          <h5
                            style={{ overflowWrap: "break-word" }}
                            class="mt-2 text-gray-800 text-xl font-semibold"
                          >
                            {userData[0]?.email ? userData[0]?.email : "N/A"}
                          </h5>
                        </div>{" "}
                        <div className="md:mb-5">
                          <h2 class="text-gray-600 ">Phone number</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {userData[0]?.phoneNumber
                              ? userData[0]?.phoneNumber
                              : "N/A"}
                          </h5>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-2">
                        <div>
                          <h2 class="text-gray-600 ">State</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {userData[0]?.address.state
                              ? userData[0]?.address.state
                              : "N/A"}
                          </h5>
                        </div>
                        <div className="md:mb-5">
                          <h2 class="text-gray-600 ">Country</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {userData[0]?.address.country
                              ? userData[0]?.address.country
                              : "N/A"}
                          </h5>
                        </div>{" "}
                        <div className="md:mb-5">
                          <h2 class="text-gray-600 ">Pincode</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {userData[0]?.address.pincode
                              ? userData[0]?.address.pincode
                              : "N/A"}
                          </h5>
                        </div>
                      </div>
                    </details>
                    {/* <div class="flex justify-end mt-4">
                    <a
                      href={() => "#"}
                      class="text-xl font-medium text-indigo-500"
                    >
                      John Doe
                    </a>
                  </div> */}
                  </div>

                  <div className="flex ">
                    <button
                      type="button"
                      onClick={() => setUserModalOpen(true)}
                      className="inline-flex cursor-pointer rounded-xl items-center py-2 px-3 text-sm font-medium text-cente bg-[#00AB55] hover:bg-[#00AB55] text-white"
                    >
                      <AiFillEdit /> &nbsp; Edit details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteModalOpen(true);
                      }}
                      style={{ borderRadius: "0.75rem" }}
                      className="btn ml-5 bg-[red] shadow-lg shadow-green-500/50 hover:bg-[red] text-white"
                    >
                      <MdDelete className="text-xl mr-2" />
                      <span className="">Delete User</span>
                    </button>
                    {/* <Link
                      type="button"
                      to="/crop"
                      onClick={() => setUserModalOpen(true)}
                      className="inline-flex ml-5 cursor-pointer rounded-xl items-center py-2 px-3 text-sm font-medium text-cente bg-[#00AB55] hover:bg-[#00AB55] text-white"
                    >
                      <AiOutlineArrowRight /> &nbsp; Manange Crops
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {userData[0]?.type === "Farmer" ? (
              <FarmPage
                farmData={farmData}
                userData={userData}
                handlePageClick={handlePageClick}
                offset={offset}
                perPage={perPage}
                pageCount={pageCount}
                setPageCount={setPageCount}
                setOffset={setOffset}
                setRefetch={setRefetch}
              />
            ) : (
              ""
            )}

            {/* {userData[0]?.type === "Farmer" ? (
              <PlotTable
                fieldData={fieldData}
                farmData={farmData}
                userData={userData}
                plotData={plotData}
                setRefetch={setRefetch}
              />
            ) : (
              ""
            )} */}

            {/* <div className="pt-5 pb-4">
            <div className="flex justify-end">
              <button
                type="submit"
                style={{ border: "1px solid #00AB55" }}
                className="btn bg-[#fff] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-[#00AB55] hover:text-white"
              >
                <span className="hidden xs:block">Update User</span>
              </button>
            </div>
          </div> */}
          </div>
        </div>
      </main>
      <UserModal
        userData={userData}
        userModalOpen={userModalOpen}
        setUserModalOpen={setUserModalOpen}
        setRefetch={setRefetch}
      />
      <DeleteModal
        deleteObj={deleteUser}
        obj={userData[0]}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default IndividualUser;
