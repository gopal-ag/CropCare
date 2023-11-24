import React from "react";
import FieldPage from "../components/individual-user/FieldPage";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/Utils";
import { toast } from "react-toastify";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import FarmModal from "../components/onboarding/FarmModal";
import PlotTable from "../components/individual-user/PlotPage";
import FieldModal from "../components/onboarding/FieldModal";
import { useNavigate } from "react-router-dom";
import PlotPage from "../components/individual-user/PlotPage";
import { useSelector } from "react-redux";

function Field() {
  const [fieldData, setFieldData] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [refetch, setRefetch] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [plotData, setPlotData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const getFieldData = async () => {
    const endpoint = `${baseUrl}/field/${id}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye field data response");
        setFieldData(response?.data.body);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getPlotData = async () => {
    const endpoint = `${baseUrl}/plot/all/${id}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response, "ye plot data response");
        setPlotData(response?.data.data);
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

  const deleteField = () => {
    const endpoint = `${baseUrl}/field/${id}`;
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
            navigate(`/farm/${fieldData[0]?.farmId}`);
            console.log(response);
          }
        } catch (error) {
          reject(error);
          setRefetch(false);
          console.log(error);
        }
      }),
      {
        pending: "Deleting field...",
        success: "Field deleted Successfully 👍",
        error: "Error deleting field 🤯",
      }
    );
  };

  useEffect(() => {
    getFieldData();
    getPlotData();
  }, []);

  useEffect(() => {
    if (refetch) {
      getFieldData();
      getPlotData();
    }
  }, [refetch]);

  console.log(fieldData, "ye field data");

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl ml-5 mb-4 font-semibold text-gray-900">
              Field Details
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
                          {fieldData[0]?.name}
                        </h5>
                      </div>
                      <div className=" md:mb-5">
                        <h2 class="text-gray-600 ">Tag</h2>
                        <h5
                          style={{ overflowWrap: "break-word" }}
                          class="mt-2 text-gray-800 text-xl font-semibold"
                        >
                          {fieldData[0]?.tag ? fieldData[0]?.tag : "N/A"}
                        </h5>
                      </div>{" "}
                      <div className="md:mb-5">
                        <h2 class="text-gray-600 ">Location Details</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          Longitude -{" "}
                          {fieldData[0]?.location?.lang
                            ? fieldData[0]?.location?.lang
                            : "N/A"}{" "}
                        </h5>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          Latitude -{" "}
                          {fieldData[0]?.location?.lat
                            ? fieldData[0]?.location?.lat
                            : "N/A"}
                        </h5>
                      </div>
                    </div>
                    <div className="text-[#00AB55] mt-5 mb-5">
                      <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-7">
                        <div>
                          <h2 class="text-gray-600 ">Soil</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {fieldData[0]?.soil ? fieldData[0]?.soil : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">area</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {fieldData[0]?.area ? fieldData[0]?.area : "N/A"}{" "}
                            acres
                          </h5>
                        </div>{" "}
                        {/* <div className="md:mb-5">
                          <h2 class="text-gray-600 ">Area Unit</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {fieldData[0]?.areaUnit
                              ? fieldData[0]?.areaUnit
                              : "N/A"}
                          </h5>
                        </div> */}
                        <div>
                          <h2 class="text-gray-600 ">Gat Number</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {fieldData[0]?.gatNo ? fieldData[0]?.gatNo : "N/A"}
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
                        setSelectedField(fieldData[0]);
                        setFieldModalOpen(true);
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
                      <span className="">Delete field</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <PlotPage
              userData={[{ _id: fieldData[0]?.farmerId }]}
              fieldData={fieldData}
              plotData={plotData}
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
      <FieldModal
        setRefetch={setRefetch}
        setSelectedField={setSelectedField}
        selectedField={selectedField}
        userData={fieldData}
        setModalOpen={setFieldModalOpen}
        modalOpen={fieldModalOpen}
      />
      <DeleteModal
        deleteObj={deleteField}
        selectedObj={selectedField}
        setSelectedObj={setSelectedField}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default Field;
