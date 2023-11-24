import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
// import * as Yup from "yup";
import { baseUrl } from "../../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import useBreakpoint from "../../utils/useBreakpoint";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  education: "",
  email: "",
  phoneNumber: "",
  organizationId: "",
  localArea: "",
  taluka: "",
  district: "",
  village: "",
  state: "",
  country: "",
  pincode: "",
  type: "",
  isActive: true,
  showContact: "",
  showAddress: "",
};

function UserModal({ userData, setUserModalOpen, userModalOpen, setRefetch }) {
  // onClick={() => setUserModalOpen(!modalOpen)}

  const modalContent = useRef(null);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isContact, setIsContact] = useState(false);
  const [isAddress, setIsAdress] = useState(false);
  const [isType, setIstype] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const organizationId = useSelector(
    (state) => state?.auth?.user?.organizations?.[0]?._id
  );

  const handleImgInput = async (e) => {
    const file = {
      url: URL.createObjectURL(e.target.files[0]),
      details: e.target.files[0],
    };
    console.log(file);
    setFile(file);
  };

  const { isMobile, isTable } = useBreakpoint();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `${baseUrl}/user/${userData[0]?._id}`;
    const token = localStorage.getItem("token");
    const imageUrl = await uploadToCdn(file);

    values["address"] = {
      localArea: values.localArea,
      taluka: values.taluka,
      district: values.district,
      village: values.village,
      state: values.state,
      country: values.country,
      pincode: values.pincode,
    };

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

    const finalValues = {
      ...values,
      image: imageUrl,
      farmerId: userData[0]?._id,
      organizationId: organizationId,
    };

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          let response = await axios.patch(endpoint, finalValues, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            resolve(response);
            setUserModalOpen(false);
            setValues(INITIAL_VALUES);
            setRefetch(true);
            setLoading(false);
          }
        } catch (error) {
          reject(error);
          console.log(error);
          setLoading(false);
        }
      }),
      {
        pending: "Updating user details...",
        success: "User details updated successfully 👍",
        error: "Error updating user details 🤯",
      }
    );
  };

  // close on click outside
  //   useEffect(() => {
  //     const clickHandler = ({ target }) => {
  //       if (!modalOpen || modalContent.current.contains(target)) return;
  //       setUserModalOpen(false);
  // setselectedUser(null);
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
      if (!userModalOpen || keyCode !== 27) return;
      setUserModalOpen(false);
      setValues(INITIAL_VALUES);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    const formatted = {
      firstName: userData[0]?.firstName,
      lastName: userData[0]?.lastName,
      gender: userData[0]?.gender,
      dob: userData[0]?.dob,
      education: userData[0]?.education,
      email: userData[0]?.email,
      phoneNumber: userData[0]?.phoneNumber,
      localArea: userData[0]?.address.localArea,
      taluka: userData[0]?.address.taluka,
      district: userData[0]?.address.district,
      village: userData[0]?.address.village,
      state: userData[0]?.address.state,
      country: userData[0]?.address.country,
      pincode: userData[0]?.address?.pincode,
      isActive: userData[0]?.isActive,
      type: userData[0]?.type,
      image: userData[0]?.image,
    };
    setFile({ url: userData[0]?.image });
    setValues(formatted);
  }, [userData, userModalOpen]);

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={userModalOpen}
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
        show={userModalOpen}
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
              setUserModalOpen(false);
            }}
          >
            X
          </button>
          <main className="flex-1">
            <div className="px-6 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-white">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 divide-y divide-gray-200 "
                >
                  <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                      <div>
                        <h3 className="text-lg pt-4 leading-6 font-semibold text-gray-900">
                          Edit User Details
                        </h3>
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
                                    <span
                                      style={
                                        isMobile
                                          ? { marginLeft: "4rem" }
                                          : { marginLeft: "7rem" }
                                      }
                                    >
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
                              //   id="first-name"
                              name="firstName"
                              value={values.firstName}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  firstName: e.target.value,
                                })
                              }
                              autoComplete="given-name"
                              className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                            />
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
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  lastName: e.target.value,
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
                            Gender
                          </label>
                          <div className="mt-1">
                            <select
                              id="gender"
                              name="gender"
                              value={values.gender}
                              onChange={(e) =>
                                setValues({ ...values, gender: e.target.value })
                              }
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
                              onChange={(e) =>
                                setValues({ ...values, dob: e.target.value })
                              }
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
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  education: e.target.value,
                                })
                              }
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
                          Do you want to edit contact information?
                        </h3>
                        <div className={isMobile ? "mt-3" : "mt-3 ml-3"}>
                          <select
                            id="showContact"
                            name="showContact"
                            value={values.showContact}
                            onChange={(e) => {
                              setValues({
                                ...values,
                                showContact: e.target.value,
                              });
                              setIsContact(e.target.value);
                            }}
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
                              setValues({ ...values, type: e.target.value });
                              setIstype(e.target.value);
                            }}
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
                            onChange={(e) =>
                              setValues({
                                ...values,
                                isActive: e.target.value,
                              })
                            }
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
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    email: e.target.value,
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
                              Phone Number
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={values.phoneNumber}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    phoneNumber: e.target.value,
                                  })
                                }
                                autoComplete="given-name"
                                className="shadow-sm focus:ring-[#008542] focus:border-[#008542] block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className={isMobile ? "flex flex-col" : "flex"}>
                        <h3 className="mt-6 text-lg leading-6 font-medium text-gray-900">
                          Do you want to edit address information?
                        </h3>
                        <div className={isMobile ? "mt-3" : "mt-3 ml-3"}>
                          <select
                            id="showAddress"
                            name="showAddress"
                            value={values.showAddress}
                            onChange={(e) => {
                              setValues({
                                ...values,
                                showAddress: e.target.value,
                              });
                              setIsAdress(e.target.value);
                            }}
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
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    localArea: e.target.value,
                                  })
                                }
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
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    village: e.target.value,
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
                              Taluka
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="taluka"
                                id="taluka"
                                value={values.taluka}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    taluka: e.target.value,
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
                              District
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="district"
                                name="district"
                                value={values.district}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    district: e.target.value,
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
                              State
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="state"
                                name="state"
                                value={values.state}
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    state: e.target.value,
                                  })
                                }
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
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    country: e.target.value,
                                  })
                                }
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
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    pincode: e.target.value,
                                  })
                                }
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
                        isMobile
                          ? "flex justify-center mx-auto"
                          : "flex justify-end"
                      }
                    >
                      <button
                        type="submit"
                        className="btn bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                        disabled={loading ? true : false}
                      >
                        <span className="">
                          {loading ? "Submiting..." : "Edit details"}
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
              </div>
            </div>
          </main>
        </div>
      </Transition>
    </>
  );
}

export default UserModal;
