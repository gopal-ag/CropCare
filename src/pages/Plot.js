import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/Utils";
import { toast } from "react-toastify";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import FarmModal from "../components/onboarding/FarmModal";
// import PlotPage from "../components/individual-user/PlotPage";
import FieldModal from "../components/onboarding/FieldModal";
import { useNavigate } from "react-router-dom";
import PlotModal from "../components/onboarding/PlotModal";
import { useSelector } from "react-redux";

function Plot() {
  const [PlotData, setPlotData] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [refetch, setRefetch] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  // const [plotData, setPlotData] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const getPlotData = async () => {
    const endpoint = `${baseUrl}/plot/${id}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye plot data response");
        setPlotData(response?.data.body);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  // const getPlotData = async () => {
  //   const endpoint = `${baseUrl}/plot/all/${id}`;
  //   const token = localStorage.getItem("token");
  //   try {
  //     let response = await axios.get(endpoint, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.data.success) {
  //       console.log(response, "ye plot data response");
  //       setPlotData(response?.data.body);
  //       setRefetch(false);
  //     }
  //   } catch (error) {
  //     setRefetch(false);
  //     toast.error(`${error.message}`);
  //   }
  // };

  const deletePlot = () => {
    const endpoint = `${baseUrl}/plot/${id}`;
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
            navigate(`/field/${PlotData?.[0]?.fieldId}`);
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
    getPlotData();
    // getPlotData();
  }, []);

  useEffect(() => {
    if (refetch) {
      getPlotData();
      // getPlotData();
    }
  }, [refetch]);

  // console.log(PlotData, "ye plot data");

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl ml-5 mb-4 font-semibold text-gray-900">
              Plot Details
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
                          {PlotData[0]?.name}
                        </h5>
                      </div>
                      <div className=" md:mb-5">
                        <h2 class="text-gray-600 ">Tag</h2>
                        <h5
                          style={{ overflowWrap: "break-word" }}
                          class="mt-2 text-gray-800 text-xl font-semibold"
                        >
                          {PlotData[0]?.tag ? PlotData[0]?.tag : "N/A"}
                        </h5>
                      </div>{" "}
                      <div className="md:mb-5">
                        <h2 class="text-gray-600 ">Location coordinates</h2>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          Longitude -{" "}
                          {PlotData[0]?.location?.lang
                            ? PlotData[0]?.location?.lang
                            : "N/A"}{" "}
                        </h5>
                        <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                          Latitude -{" "}
                          {PlotData[0]?.location?.lat
                            ? PlotData[0]?.location?.lat
                            : "N/A"}
                        </h5>
                      </div>
                    </div>
                    <div className="text-[#00AB55] mt-5 mb-5">
                      <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-7">
                        <div>
                          <h2 class="text-gray-600 ">Plantation Date</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.plantationDate
                              ? PlotData[0]?.plantationDate
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Plantation Area</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.plantationArea
                              ? PlotData[0]?.plantationArea
                              : "N/A"}
                          </h5>
                        </div>{" "}
                        <div className="md:mb-5">
                          <h2 class="text-gray-600 ">Harvest Date</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.harvestDate
                              ? PlotData[0]?.harvestDate
                              : "N/A"}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <details className="text-[#00AB55] mt-5 mb-5">
                      <summary className="text-xl font-bold">
                        Show more information
                      </summary>
                      <div class="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:grid-cols-1 mt-7">
                        <div>
                          <h2 class="text-gray-600 ">Estimated Yield</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.estimatedYield
                              ? PlotData[0]?.estimatedYield
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Yield</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.yield ? PlotData[0]?.yield : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Soil Type</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.soilType
                              ? PlotData[0]?.soilType
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Status</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            <span class="p-3 inline-flex text-lg leading-5 font-semibold rounded-lg bg-green-100 text-green-800">
                              {PlotData[0]?.isActive ? "Active" : "Inactive"}
                            </span>
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">State</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.state ? PlotData[0]?.state : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Centroid</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.centroid
                              ? PlotData[0]?.centroid
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Plant Count</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.plantCount
                              ? PlotData[0]?.plantCount
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">R2R Distance</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.r2rDistance
                              ? PlotData[0]?.r2rDistance
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">P2P Distance</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.p2pDistance
                              ? PlotData[0]?.p2pDistance
                              : "N/A"}
                          </h5>
                        </div>
                        <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Area</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.area ? PlotData[0]?.area : "N/A"}{" "}
                            acres{" "}
                          </h5>
                        </div>
                        {/* <div className=" md:mb-5">
                          <h2 class="text-gray-600 ">Area Unit</h2>
                          <h5 class="mt-2 text-gray-800 text-xl font-semibold">
                            {PlotData[0]?.areaUnit
                              ? PlotData[0]?.areaUnit
                              : "N/A"}
                          </h5>
                        </div> */}
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
                      onClick={() => {
                        setSelectedPlot(PlotData[0]);
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
                      <span className="">Delete Plot</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PlotModal
        setRefetch={setRefetch}
        setSelectedPlot={setSelectedPlot}
        selectedPlot={selectedPlot}
        userData={PlotData}
        setModalOpen={setFieldModalOpen}
        modalOpen={fieldModalOpen}
      />
      <DeleteModal
        deleteObj={deletePlot}
        selectedObj={selectedPlot}
        setSelectedObj={setSelectedPlot}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default Plot;
