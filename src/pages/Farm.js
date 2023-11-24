import React from "react";
import FieldTable from "../components/individual-user/FieldPage";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/Utils";
import { toast } from "react-toastify";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import FarmModal from "../components/onboarding/FarmModal";
import { useNavigate } from "react-router-dom";
import FieldPage from "../components/individual-user/FieldPage";

function Farm() {
  const [farmData, setFarmData] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [refetch, setRefetch] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [farmModalOpen, setFarmModalOpen] = useState(false);
  const [fieldData, setFieldData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  const getFarmData = async () => {
    const endpoint = `${baseUrl}/farm/${id}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye farm data response");
        setFarmData(response?.data.body);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      toast.error(`${error.message}`);
    }
  };

  const deleteFarm = (id) => {
    const endpoint = `${baseUrl}/farm/${id}`;
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
            setRefetch(true);
            setDeleteModalOpen(false);
            navigate(`/user/${farmData?.[0]?.farmerId}`);
          }
        } catch (error) {
          reject(error);
          setRefetch(false);
          console.log(error);
        }
      }),
      {
        pending: "Deleting farm...",
        success: "Farm deleted Successfully 👍",
        error: "Error deleting farm 🤯",
      }
    );
  };

  const getFieldData = async () => {
    const endpoint = `${baseUrl}/field/all/${id}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response, "ye field data response");
        setFieldData(response?.data.data);
        setPageCount(response.data.totalPages);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    getFarmData();
    getFieldData();
  }, []);

  useEffect(() => {
    if (refetch) {
      getFarmData();
      getFieldData();
    }
  }, [refetch]);

  console.log(farmData, "farm data");

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl ml-5 mb-4 font-semibold text-gray-900">
              Farm Details
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="">
              <div className="max-w-7xl">
                <div style={{ marginTop: "1rem" }} class="p-5">
                  <div
                    className={
                      "w-full pt-10 py-4 px-8 bg-white shadow-lg rounded-lg my-5"
                    }
                  >
                    <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 justify-around">
                      <div>
                        <h2 class="text-gray-600 ">Name</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          {farmData[0]?.name}
                        </h5>
                      </div>
                      <div className=" md:mb-5">
                        <h2 class="text-gray-600 ">Tag</h2>
                        <h5
                          style={{ overflowWrap: "break-word" }}
                          class="mt-2 text-gray-800 text-xl font-semibold"
                        >
                          {farmData[0]?.tag ? farmData[0]?.tag : "N/A"}
                        </h5>
                      </div>{" "}
                      <div className="md:mb-5">
                        <h2 class="text-gray-600 ">Location coordinates</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          Longitude-{" "}
                          {farmData[0]?.address?.location?.lang
                            ? farmData[0]?.address?.location?.lang
                            : "N/A"}{" "}
                        </h5>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          Latitude -{" "}
                          {farmData[0]?.address?.location?.lat
                            ? farmData[0]?.address?.location?.lat
                            : "N/A"}
                        </h5>
                      </div>
                    </div>
                    <div className="text-[#00AB55] mt-5 mb-5">
                      <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-7">
                        <div>
                          <h2 class="text-gray-600 ">Local Area</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {farmData[0]?.address.localArea
                              ? farmData[0]?.address.localArea
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Village</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {farmData[0]?.address.village
                              ? farmData[0]?.address.village
                              : "N/A"}
                          </h5>
                        </div>{" "}
                        <div className="md:mb-5">
                          <h2 class="text-gray-600 ">District</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {farmData[0]?.address.district
                              ? farmData[0]?.address.district
                              : "N/A"}
                          </h5>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-7">
                        <div>
                          <h2 class="text-gray-600 ">State</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {farmData[0]?.address.state
                              ? farmData[0]?.address.state
                              : "N/A"}
                          </h5>
                        </div>
                        <div className="md:mb-5">
                          <h2 class="text-gray-600 ">Country</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {farmData[0]?.address.country
                              ? farmData[0]?.address.country
                              : "N/A"}
                          </h5>
                        </div>{" "}
                        <div className="md:mb-5">
                          <h2 class="text-gray-600 ">Pincode</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {farmData[0]?.address.pincode
                              ? farmData[0]?.address.pincode
                              : "N/A"}
                          </h5>
                        </div>
                      </div>
                    </div>
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
                      onClick={() => {
                        setSelectedFarm(farmData[0]);
                        setFarmModalOpen(true);
                      }}
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
                      <span className="">Delete Farm</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <FieldPage
              userData={[{ _id: farmData[0]?.farmerId }]}
              fieldData={fieldData}
              farmData={farmData}
              setRefetch={setRefetch}
              handlePageClick={handlePageClick}
              offset={offset}
              perPage={perPage}
              pageCount={pageCount}
              setPageCount={setPageCount}
              setOffset={setOffset}
            />
          </div>
        </div>
      </main>
      <FarmModal
        setRefetch={setRefetch}
        setSelectedFarm={setSelectedFarm}
        selectedFarm={selectedFarm}
        userData={farmData}
        setModalOpen={setFarmModalOpen}
        modalOpen={farmModalOpen}
      />
      <DeleteModal
        deleteObj={deleteFarm}
        selectedObj={selectedFarm}
        setSelectedObj={setSelectedFarm}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default Farm;
