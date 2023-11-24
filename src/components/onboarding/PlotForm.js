import React from "react";
import { Formik } from "formik";
import { useState, useRef } from "react";
// import * as Yup from "yup";
import { baseUrl } from "../../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
// import { useSelector } from "react-redux";

function PlotForm({ setShowFarmform, setShowPlotform }) {
  const [showCrop, setShowCrop] = useState(false);
  const [showVariety, setShowVariety] = useState(false);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showAddBtn2, setShowAddBtn2] = useState(true);
  const [crop, setCrop] = useState("");
  const [variety, setVariety] = useState("");
  // const uploadToCdn = async () => {
  //   console.log(file);

  // };

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

  return (
    <Formik
      initialValues={{
        name: "",
        tag: "",
        plantationDate: "",
        plantationArea: "",
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
      }}
      onSubmit={async (values, { resetForm }) => {
        const token = localStorage.getItem("token");
        console.log(token);
        const endpoint = `${baseUrl}/plot/`;
        values["location"] = {
          type: values.type,
          coordinates: values.coordinates,
        };
        values["farmerId"] = "";
        values["farmId"] = "";
        values["feildId"] = "";
        console.log(values);
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
                resetForm();
              }
            } catch (error) {
              reject(error);
              console.log(error);
            }
          }),
          {
            pending: "Onboarding User...",
            success: "User Added Successfully 👍",
            error: "Error onboarding user 🤯",
          }
        );
      }}
      // validationSchema={}
    >
      {(props) => {
        const { values, handleChange, handleBlur, handleSubmit } = props;
        return (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowFarmform(true);
                    setShowPlotform(false);
                  }}
                  className="btn  bg-[#fff] shadow-lg shadow-green-500/50 text-[#00AB55]"
                >
                  <BiArrowBack className="text-2xl mr-2" />
                  <span className="hidden xs:block text-xl">Back</span>
                </button>
              </div>
            </div>
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Enter Plot Details
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
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        type="text"
                        id="plantationArea"
                        name="plantationArea"
                        value={values.plantationArea}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option></option>
                        <option></option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-1">
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
                            <span className="hidden xs:block">Create Crop</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      variety
                    </label>
                    <div className="mt-1">
                      <select
                        id="varietyId"
                        name="varietyId"
                        value={values.varietyId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option></option>
                        <option></option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-1">
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Yes</option>
                        <option>No</option>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Area
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="area"
                        name="area"
                        value={values.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 pb-4">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                >
                  <span className="hidden xs:block">Submit Plot Details</span>
                </button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default PlotForm;
