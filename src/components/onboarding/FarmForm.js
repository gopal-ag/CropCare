import React from "react";
import { Formik } from "formik";
import { useState } from "react";
// import * as Yup from "yup";
import { baseUrl } from "../../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";

function FarmForm({
  setShowFarmform,
  setShowUserform,
  setShowPlotform,
  userId,
}) {
  const [isField, setIsField] = useState();
  console.log(userId);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          tag: "",
          type: "",
          coordinates: "",
          localArea: "",
          taluka: "",
          district: "",
          village: "",
          state: "",
          country: "",
          pincode: "",
          // rawAddress: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const endpoint = `${baseUrl}/farm/`;
          const token = localStorage.getItem("token");
          console.log(token);
          values["farmerId"] = userId;
          let newKey = {
            address: {
              location: {
                type: values.type,
                coordinates: values.coordinates,
              },
              localArea: values.localArea,
              taluka: values.taluka,
              district: values.district,
              village: values.village,
              state: values.state,
              country: values.country,
              pincode: values.pincode,
              // rawAddress: values.rawAddress,
            },
          };

          delete values.type;
          delete values.coordinates;
          delete values.showFields;
          delete values.localArea;
          delete values.taluka;
          delete values.district;
          delete values.village;
          delete values.state;
          delete values.country;
          delete values.pincode;
          // delete values.rawAddress;
          let finalValues = { ...values, ...newKey };
          console.log(finalValues);
          toast.promise(
            new Promise(async (resolve, reject) => {
              try {
                let response = await axios.post(endpoint, finalValues, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                console.log(response.status);
                if (response.status === 200) {
                  resolve(response);
                  resetForm();
                  console.log(response);
                }
              } catch (error) {
                reject(error);
                console.log(error);
              }
            }),
            {
              pending: "Adding farm details...",
              success: "Farm details Added Successfully 👍",
              error: "Error adding farm details 🤯",
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
              <div className="mt-5 space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserform(true);
                        setShowFarmform(false);
                      }}
                      className="btn  bg-[#fff] shadow-lg shadow-green-500/50 text-[#00AB55]"
                    >
                      <BiArrowBack className="text-2xl mr-2" />
                      <span className="hidden xs:block text-xl">Back</span>
                    </button>
                  </div>
                </div>
                <div className="pt-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Enter Farm Details
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
                        Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="type"
                          name="type"
                          value={values?.address?.location?.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="country-name"
                          className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option>Latitude</option>
                          <option>Longitude</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Coordinates
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="coordinates"
                          name="coordinates"
                          value={values?.address?.location?.coordinates}
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
                        Local Area
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="localArea"
                          name="localArea"
                          value={values.localArea}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Village
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="village"
                          name="village"
                          value={values.village}
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
                        Taluka
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="taluka"
                          id="taluka"
                          value={values.taluka}
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
                        District
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={values.district}
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
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pincode
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={values.pincode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    {/* <div className="sm:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="rawAddress"
                          name="rawAddress"
                          value={values.rawAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="pt-5 pb-4">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                  >
                    <span className="hidden xs:block">Submit farm Details</span>
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>

      <Formik
        initialValues={{
          name: "",
          tag: "",
          type: "",
          coordinates: "",
          area: null,
          areaUnit: "",
          soil: "",
          gatNo: "",
          showFields: false,
        }}
        onSubmit={async (values, { resetForm }) => {
          const endpoint = `${baseUrl}/field/`;
          const token = localStorage.getItem("token");
          console.log(token);
          values["location"] = {
            type: values.type,
            coordinates: values.coordinates,
          };
          values["farmerId"] = "";
          values["farmId"] = "";
          console.log(values);
          delete values.showFields;
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
              pending: "Adding Field...",
              success: "Field added Successfully 👍",
              error: "Error adding feild 🤯",
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
              <div className="space-y-8">
                <div>
                  <div></div>
                </div>
                <div style={{ marginTop: "-1rem" }} className="pt-8">
                  <div className="flex">
                    <h3 className="mt-6 text-lg leading-6 font-medium text-gray-900">
                      Do you want to enter field details to this farm?
                    </h3>
                    <div className="mt-3 ml-3">
                      <select
                        id="showFields"
                        name="showFields"
                        value={values.showFields}
                        onChange={(e) => {
                          handleChange(e);
                          setIsField(e.target.value);
                        }}
                        onBlur={handleBlur}
                        autoComplete="country-name"
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </select>
                    </div>
                  </div>

                  {isField === "true" && (
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
                          Type
                        </label>
                        <div className="mt-1">
                          <select
                            id="type"
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="country-name"
                            className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Latitude</option>
                            <option>Longitude</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Coordinates
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="coordinates"
                            name="coordinates"
                            value={values.coordinates}
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
                            type="text"
                            id="area"
                            name="area"
                            value={values.area}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="given-name"
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
                            type="text"
                            id="areaUnit"
                            name="areaUnit"
                            value={values.areaUnit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Soil
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="soil"
                            id="soil"
                            value={values.soil}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gat Number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="gatNo"
                            name="gatNo"
                            value={values.gatNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isField === "true" && (
                <div className="pt-5 pb-4">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                    >
                      <span className="hidden xs:block">
                        Submit field Details
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          );
        }}
      </Formik>
      <div className="pt-5 pb-4 space-y-8 divide-y divide-gray-200">
        <div className="flex justify-end">
          <button
            type="button"
            style={{ border: "1px solid #00AB55" }}
            onClick={() => {
              setShowFarmform(false);
              setShowPlotform(true);
            }}
            className="btn bg-[#fff] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-[#00AB55] hover:text-white"
          >
            <IoIosArrowRoundForward className="text-xl mr-2" />
            <span className="hidden xs:block ">Add Plot details</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default FarmForm;
