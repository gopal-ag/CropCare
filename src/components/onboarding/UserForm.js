import React from "react";
import { Formik, replace } from "formik";
import { useState, useRef } from "react";
// import * as Yup from "yup";
import { baseUrl } from "../../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boolean } from "yup";
import useBreakpoint from "../../utils/useBreakpoint";
import * as Yup from "yup";

function UserForm({ setShowFarmform, setShowUserform, setUserId }) {
  const [isContact, setIsContact] = useState(false);
  const [isAddress, setIsAdress] = useState(false);
  const [isType, setIstype] = useState(false);
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const organizationId = useSelector(
    (state) => state?.auth?.user?.organizations?.[0]?._id
  );

  const navigate = useNavigate();

  const { isMobile, isTable } = useBreakpoint();

  const handleImgInput = async (e) => {
    const file = {
      url: URL.createObjectURL(e.target.files[0]),
      details: e.target.files[0],
    };
    console.log(file);
    setFile(file);
  };

  const uploadToCdn = async (file) => {
    let formData = new FormData();
    formData.append("item", file?.details);
    const endPoint = "https://media.agrotrust.io/content/";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(endPoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      // setImageData(response.data);
      return response.data?.result?.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        education: "",
        email: "",
        phoneNumber: "",
        organizationId: "624c27d9744a5911fb1d1ba6",
        localArea: "",
        taluka: "",
        district: "",
        village: "",
        state: "",
        country: "",
        pincode: "",
        isActive: true,
        type: "",
        showContact: "",
        showAddress: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        setLoading(true);
        const imageUrl = await uploadToCdn(file);
        console.log(imageUrl);
        const token = localStorage.getItem("token");
        console.log(token);
        const endpoint = `${baseUrl}/user/`;
        values["address"] = {
          localArea: values.localArea,
          taluka: values.taluka,
          district: values.district,
          village: values.village,
          state: values.state,
          country: values.country,
          pincode: values.pincode,
        };

        values["organizationId"] = organizationId;
        values["image"] = imageUrl;

        delete values.localArea;
        delete values.taluka;
        delete values.district;
        delete values.village;
        delete values.state;
        delete values.country;
        delete values.pincode;
        delete values.showContact;
        delete values.showcontact;
        delete values.showAddress;
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
                setUserId(response.data.userId);
                setFile(null);
                setLoading(false);
                navigate("/users", { replace: true });
              }
            } catch (error) {
              reject(error);
              console.log(error);
              setLoading(false);
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
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
      })}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
        } = props;
        return (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200 "
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg pt-4 leading-6 font-semibold text-gray-900">
                    Onboard User
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter user details to onboard user to the system
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="cursor-pointer sm:col-span-6"
                  >
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload user photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {file?.url ? (
                          <div>
                            <img
                              width="300px"
                              className="img-fluid"
                              src={file?.url}
                              alt="img"
                            />
                          </div>
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}

                        <div className="flex text-sm text-gray-600">
                          <label
                            ref={fileInputRef}
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                          >
                            {!file?.url ? (
                              <span className="ml-7">Upload a file</span>
                            ) : (
                              <span style={{ marginLeft: "7rem" }}>
                                Click to change
                              </span>
                            )}
                            <input
                              id="file-upload"
                              name="item"
                              type="file"
                              className="sr-only"
                              onChange={(e) => handleImgInput(e)}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          {file?.details?.name
                            ? file?.details?.name
                            : " PNG, JPG, GIF up to 10MB."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Enter Personal Information
                  </h3>
                </div>
                <div className="mt-6 mb-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="given-name"
                        className={
                          errors.firstName && touched.firstName
                            ? "shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                            : "shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        }
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="text-red-500">{errors.firstName}</div>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <div className="mt-1">
                      <select
                        id="gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="country-name"
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="" disabled selected>
                          Select your option
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Education
                    </label>
                    <div className="mt-1">
                      <select
                        id="education"
                        name="education"
                        value={values.education}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="country-name"
                        className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="" disabled selected>
                          Select your option
                        </option>
                        <option>10th</option>
                        <option>12th</option>
                        <option>Graduate</option>
                        <option>Post Graduate</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  style={isMobile ? { flexDirection: "column" } : {}}
                  className={isContact === "true" ? "flex" : "flex mb-5"}
                >
                  <h3 className="mt-6 text-lg leading-6 font-medium text-gray-900">
                    Do you want to enter contact information?
                  </h3>
                  <div className={isMobile ? "mt-3" : "mt-3 ml-3"}>
                    <select
                      id="showContact"
                      name="showContact"
                      value={values.showContact}
                      onChange={(e) => {
                        handleChange(e);
                        setIsContact(e.target.value);
                      }}
                      onBlur={handleBlur}
                      autoComplete="country-name"
                      className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>

                  <h3
                    className={
                      isMobile
                        ? "mt-6 text-lg leading-6 font-medium text-gray-900"
                        : "mt-6 ml-5 text-lg leading-6 font-medium text-gray-900"
                    }
                  >
                    Enter Type
                  </h3>
                  <div className={isMobile ? "mt-3" : "mt-3 ml-3"}>
                    <select
                      id="type"
                      name="type"
                      value={values.type}
                      onChange={(e) => {
                        handleChange(e);
                        setIstype(e.target.value);
                      }}
                      onBlur={handleBlur}
                      autoComplete="country-name"
                      className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="" disabled selected>
                        Select your option
                      </option>
                      <option value={"User"}>User</option>
                      <option value={"Farmer"}>Farmer</option>
                    </select>
                  </div>
                  <h3
                    className={
                      isMobile
                        ? "mt-6 text-lg leading-6 font-medium text-gray-900"
                        : "mt-6 ml-5 text-lg leading-6 font-medium text-gray-900"
                    }
                  >
                    Enter Status
                  </h3>
                  <div className={isMobile ? "mt-3" : "mt-3 ml-3"}>
                    <select
                      id="status"
                      name="isActive"
                      value={values.isActive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="country-name"
                      className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="" disabled selected>
                        Select your option
                      </option>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>
                </div>

                {isContact === "true" && (
                  <div className="mt-6 mb-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={values.email}
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
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className={isMobile ? "flex-col" : "flex"}>
                  <h3 className="mt-6 text-lg leading-6 font-medium text-gray-900">
                    Do you want to enter address information?
                  </h3>
                  <div className={isMobile ? "mt-3" : "mt-3 ml-3"}>
                    <select
                      id="showAddress"
                      name="showAddress"
                      value={values.showAddress}
                      onChange={(e) => {
                        handleChange(e);
                        setIsAdress(e.target.value);
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
                {isAddress === "true" && (
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
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
                    <div className="sm:col-span-3">
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
                    <div className="sm:col-span-3">
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
                    <div className="sm:col-span-3">
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
                    <div className="sm:col-span-3">
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
                    <div className="sm:col-span-6">
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
                  </div>
                )}
              </div>
            </div>

            <div className="pt-5 pb-4">
              <div
                className={
                  isMobile ? "flex justify-center mx-auto" : "flex justify-end"
                }
              >
                <button
                  type="submit"
                  className="btn bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                  disabled={loading ? true : false}
                >
                  <span className="">
                    {loading ? "Submiting..." : "Submit details"}
                  </span>
                </button>
                {/* {isType === "Farmer" && (
                  <button
                    type="button"
                    style={{ border: "1px solid #00AB55" }}
                    onClick={() => {
                      setShowUserform(false);
                      setShowFarmform(true);
                    }}
                    className="btn ml-5 bg-[#fff] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-[#00AB55] hover:text-white"
                  >
                    <IoIosArrowRoundForward className="text-xl mr-2" />
                    <span className="hidden xs:block">Add farm details</span>
                  </button>
                )} */}
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default UserForm;
