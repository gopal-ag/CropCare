import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
// import * as Yup from "yup";
import { baseUrl } from "../../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transition } from "@headlessui/react";
import useBreakpoint from "../../utils/useBreakpoint";

const INITIAL_VALUES = {
  name: "",
  tag: "",
  location: {
    lang: "",
    lat: "",
  },
  plantationDate: "",
  plantationArea: null,
  harvestDate: "",
  yield: "",
  estimatedYield: null,
  cropId: "",
  varietyId: "",
  soilType: "",
  isActive: "",
  // growingSeason: "",
  state: "",
  centroid: null,
  plantCount: null,
  r2rDistance: null,
  p2pDistance: null,
  growingCycle: null,
  area: "",
  areaUnit: "",
};

function PlotModal({
  userData,
  setModalOpen,
  modalOpen,
  setSelectedPlot,
  selectedPlot,
  setRefetch,
  farmData,
  fieldData,
}) {
  // onClick={() => setModalOpen(!modalOpen)}

  const modalContent = useRef(null);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [showCrop, setShowCrop] = useState(false);
  const [showVariety, setShowVariety] = useState(false);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showAddBtn2, setShowAddBtn2] = useState(true);
  const [cropData, setCropData] = useState([]);
  const [cropId, setCropId] = useState(null);
  const [varietyData, setvarietyData] = useState([]);
  const [crop, setCrop] = useState("");
  const [variety, setVariety] = useState("");

  const { isMobile } = useBreakpoint();

  const handlecropInput = (e) => {
    setCrop(e.target.value);
  };
  const handleVarietyInput = (e) => {
    setVariety(e.target.value);
  };

  const createCrop = async () => {
    const token = localStorage.getItem("token");
    const endpoint = `${baseUrl}/crop/`;
    let values = {
      name: crop,
    };
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          let response = await axios.post(endpoint, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.status);
          if (response.status === 200) {
            resolve(response);
            setShowCrop(false);
          }
        } catch (error) {
          reject(error);
          console.log(error);
        }
      }),
      {
        pending: "Creating crop...",
        success: "Crop Added Successfully 👍",
        error: "Error creating crop 🤯",
      }
    );
  };

  const createVariety = async () => {
    const token = localStorage.getItem("token");
    const endpoint = `${baseUrl}/variety/`;
    let values = {
      name: variety,
      cropId: "",
    };
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          let response = await axios.post(endpoint, values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.status);
          if (response.status === 200) {
            resolve(response);
            setShowCrop(false);
          }
        } catch (error) {
          reject(error);
          console.log(error);
        }
      }),
      {
        pending: "Creating Variety...",
        success: "Variety Added Successfully 👍",
        error: "Error creating Variety 🤯",
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const finalValues = {
      ...values,
      farmerId: userData?.[0]?._id,
      farmId: farmData?.[0]?._id,
      fieldId: fieldData?.[0]?._id,
    };

    const addMessage = selectedPlot
      ? "Updating plot details..."
      : "Adding plot details...";
    const successMessage = selectedPlot
      ? "Plot details updated successfully 👍"
      : "Plot details added successfully 👍";
    const errorMessage = selectedPlot
      ? "Error updating plot details 🤯"
      : "Error adding plot details 🤯";

    toast.promise(
      new Promise(async (resolve, reject) => {
        const endpoint = `${baseUrl}/plot/${selectedPlot?._id}`;
        try {
          let response;
          if (selectedPlot) {
            response = await axios.patch(
              endpoint,
              { ...finalValues, _id: selectedPlot?._id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            const endpoint = `${baseUrl}/plot/`;
            response = await axios.post(endpoint, finalValues, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          }
          if (response.status === 200) {
            resolve(response);
            setModalOpen(false);
            setSelectedPlot(null);
            setValues(INITIAL_VALUES);
            setRefetch(true);
          }
        } catch (error) {
          reject(error);
          console.log(error);
        }
      }),

      {
        pending: addMessage,
        success: successMessage,
        error: errorMessage,
      }
    );
  };

  // close on click outside
  //   useEffect(() => {
  //     const clickHandler = ({ target }) => {
  //       if (!modalOpen || modalContent.current.contains(target)) return;
  //       setModalOpen(false);
  // setselectedPlot(null);
  // setValues(INITIAL_VALUES);
  //     };
  //     document.addEventListener("click", clickHandler);
  //     return () => document.removeEventListener("click", clickHandler);
  //   });

  //   useEffect(() => {
  //     if (modalOpen) {
  //       document.body.style.overflow = "hidden";
  //     }
  //     return () => {
  //       document.body.style.overflow = "";
  //     };
  //   }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
      setSelectedPlot(null);
      setValues(INITIAL_VALUES);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    if (selectedPlot) {
      const formatted = {
        name: selectedPlot?.name,
        tag: selectedPlot?.tag,
        location: {
          lang: selectedPlot?.location?.lang,
          lat: selectedPlot?.location?.lat,
        },
        plantationDate: selectedPlot?.plantationDate,
        plantationArea: selectedPlot?.plantationArea,
        harvestDate: selectedPlot?.harvestDate,
        yield: selectedPlot?.yield,
        estimatedYield: selectedPlot?.estimatedYield,
        cropId: selectedPlot?.cropId,
        varietyId: selectedPlot?.varietyId,
        soilType: selectedPlot?.soilType,
        isActive: selectedPlot?.isActive,
        // growingSeason: "",
        state: selectedPlot?.state,
        centroid: selectedPlot?.centroid,
        plantCount: selectedPlot?.plantCount,
        r2rDistance: selectedPlot?.r2rDistance,
        p2pDistance: selectedPlot?.p2pDistance,
        growingCycle: selectedPlot?.growingCycle,
        area: selectedPlot?.area,
        areaUnit: selectedPlot?.areaUnit,
      };
      setValues(formatted);
    }
  }, [selectedPlot]);

  const getCropData = async () => {
    const endpoint = `${baseUrl}/crop/getAllCrops`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response, "ye crop data response");
        setCropData(response?.data?.data);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      toast.error(`${error.message}`);
    }
  };

  const getVarietyData = async () => {
    const endpoint = `${baseUrl}/variety/${cropId}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response.data.data, "ye variety data response");
        // let data = response.data.body.map
        setvarietyData(response?.data?.data);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    getCropData();
  }, []);

  useEffect(() => {
    if (cropId) {
      getVarietyData();
    }
  }, [cropId]);

  console.log(varietyData, "ye variety data");

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white overflow-auto max-w-6xl w-full max-h-full rounded shadow-lg"
        >
          <button
            style={{
              backgroundColor: "crimson",
              borderRadius: "50%",
              float: "right",
              width: "40px",
              height: "40px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
            type="button"
            className="btn m-5"
            onClick={() => {
              setModalOpen(false);
              setSelectedPlot(null);
              setValues(INITIAL_VALUES);
            }}
          >
            X
          </button>
          <main className="flex-1">
            <div className="px-6 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-white">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 divide-y divide-gray-200"
                >
                  <div></div>
                  <div className="space-y-8">
                    <div className="pt-8">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {selectedPlot
                            ? "Edit plot details"
                            : "Add plot details"}
                        </h3>
                      </div>
                      <div className="mt-6 mb-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={values?.name}
                              onChange={(e) =>
                                setValues({ ...values, name: e.target.value })
                              }
                              autoComplete="given-name"
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tag
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="tag"
                              name="tag"
                              value={values.tag}
                              onChange={(e) =>
                                setValues({ ...values, tag: e.target.value })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Longitude coordinates
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="lang"
                              name="lang"
                              value={values?.location?.lang}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  location: {
                                    ...values?.location,
                                    lang: e.target.value,
                                  },
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Latitude Coordinates
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="coordinates"
                              name="coordinates"
                              value={values?.location?.lat}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  location: {
                                    ...values?.location,
                                    lat: e.target.value,
                                  },
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Plantation Date
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              id="plantationDate"
                              name="plantationDate"
                              value={values.plantationDate}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  plantationDate: e.target.value,
                                })
                              }
                              autoComplete="country-name"
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Plantation Area
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="plantationArea"
                              name="plantationArea"
                              value={values.plantationArea}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  plantationArea: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Harvest Date
                          </label>
                          <div className="mt-1">
                            <input
                              type="date"
                              id="harvestDate"
                              name="harvestDate"
                              value={values.harvestDate}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  harvestDate: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Estimated Yield
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="estimatedYield"
                              name="estimatedYield"
                              value={values.estimatedYield}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  estimatedYield: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Yield
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="yield"
                              name="yield"
                              value={values.yield}
                              onChange={(e) =>
                                setValues({ ...values, yield: e.target.value })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Crop
                          </label>
                          <div className="mt-1">
                            <select
                              id="cropId"
                              name="cropId"
                              value={values.cropId}
                              onChange={(e) => {
                                setValues({
                                  ...values,
                                  cropId: e.target.value,
                                });
                                setCropId(e.target.value);
                              }}
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="" disabled selected>
                                Select your option
                              </option>
                              {cropData?.map((crop) => (
                                <option key={crop?.id} value={crop?._id}>
                                  {crop?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* <div className="sm:col-span-1">
                          <div className="mt-7">
                            {showAddBtn && (
                              <button
                                type="button"
                                style={{ border: "1px solid #00AB55" }}
                                onClick={() => {
                                  setShowCrop(true);
                                  setShowAddBtn(false);
                                }}
                                className="btn ml-2 bg-[#fff] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-[#00AB55] hover:text-white"
                              >
                                <span className="hidden xs:block">Add New</span>
                              </button>
                            )}
                            {showCrop && (
                              <>
                                <input
                                  type="text"
                                  id="yield"
                                  name="yield"
                                  value={crop}
                                  onChange={(e) => handlecropInput(e)}
                                  className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                                />

                                <button
                                  type="button"
                                  style={{ border: "1px solid #00AB55" }}
                                  onClick={() => createCrop()}
                                  className="btn mt-2 bg-[#fff] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-[#00AB55] hover:text-white"
                                >
                                  <span className="hidden xs:block">
                                    Create Crop
                                  </span>
                                </button>
                              </>
                            )}
                          </div>
                        </div> */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select variety for selected crop
                          </label>
                          <div className="mt-1">
                            <select
                              id="varietyId"
                              name="varietyId"
                              value={values.varietyId}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  varietyId: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="" disabled selected>
                                Select your option
                              </option>
                              {varietyData?.map((variety) => (
                                <option
                                  key={variety?._id}
                                  value={variety?.name}
                                >
                                  {variety?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* <div className="sm:col-span-1">
                          <div className="mt-7">
                            {showAddBtn2 && (
                              <button
                                type="button"
                                style={{ border: "1px solid #00AB55" }}
                                onClick={() => {
                                  setShowVariety(true);
                                  setShowAddBtn2(false);
                                }}
                                className="btn ml-2 bg-[#fff] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-[#00AB55] hover:text-white"
                              >
                                <span className="hidden xs:block">Add New</span>
                              </button>
                            )}
                            {showVariety && (
                              <>
                                <input
                                  type="text"
                                  id="yield"
                                  name="yield"
                                  value={variety}
                                  onChange={(e) => handleVarietyInput(e)}
                                  className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                                />

                                <button
                                  type="button"
                                  style={{ border: "1px solid #00AB55" }}
                                  onClick={() => createVariety()}
                                  className="btn mt-2 bg-[#fff] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-[#00AB55] hover:text-white"
                                >
                                  <span className="hidden xs:block">
                                    Create Variety
                                  </span>
                                </button>
                              </>
                            )}
                          </div>
                        </div> */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Soil Type
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="soilType"
                              name="soilType"
                              value={values.soilType}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  soilType: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Active
                          </label>
                          <div className="mt-1">
                            <select
                              id="isActive"
                              name="isActive"
                              value={values.isActive}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  isActive: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="" disabled selected>
                                Select your option
                              </option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            State
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={values.state}
                              onChange={(e) =>
                                setValues({ ...values, state: e.target.value })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Centroid
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="centroid"
                              name="centroid"
                              value={values.centroid}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  centroid: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Plant Count
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="plantCount"
                              name="plantCount"
                              value={values.plantCount}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  plantCount: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            R2R Distance
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="r2rDistance"
                              name="r2rDistance"
                              value={values.r2rDistance}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  r2rDistance: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            P2P Distance
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="p2pDistance"
                              name="p2pDistance"
                              value={values.p2pDistance}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  p2pDistance: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Growing Cycle
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="growingCycle"
                              name="growingCycle"
                              value={values.growingCycle}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  growingCycle: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Area ( in acres )
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="area"
                              name="area"
                              value={values.area}
                              onChange={(e) =>
                                setValues({ ...values, area: e.target.value })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        {/* <div className="sm:col-span-6">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Area Unit
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="areaUnit"
                              name="areaUnit"
                              value={values.areaUnit}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  areaUnit: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 pb-4">
                    <div
                      className={
                        isMobile
                          ? "flex justify-center mx-auto"
                          : "flex justify-end"
                      }
                    >
                      <button
                        type="submit"
                        className="btn bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                      >
                        <span className="">
                          {selectedPlot ? "Update details" : "Submit details"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </Transition>
    </>
  );
}

export default PlotModal;
