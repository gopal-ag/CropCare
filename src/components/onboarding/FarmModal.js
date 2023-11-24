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
  address: {
    location: {
      lang: "",
      lat: "",
    },
    localArea: "",
    taluka: "",
    district: "",
    village: "",
    state: "",
    country: "",
    pincode: "",
  },
  tag: "",
};

function FarmModal({
  userData,
  setModalOpen,
  modalOpen,
  selectedFarm,
  setSelectedFarm,
  setRefetch,
}) {
  // onClick={() => setModalOpen(!modalOpen)}

  const modalContent = useRef(null);
  const [values, setValues] = useState(INITIAL_VALUES);

  const { isMobile, isTable } = useBreakpoint();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const finalValues = {
      ...values,
      farmerId: userData[0]?._id,
    };

    const addMessage = selectedFarm
      ? "Updating farm details..."
      : "Adding farm details...";
    const successMessage = selectedFarm
      ? "Farm details updated successfully 👍"
      : "Farm details added successfully 👍";
    const errorMessage = selectedFarm
      ? "Error updating farm details 🤯"
      : "Error adding farm details 🤯";

    toast.promise(
      new Promise(async (resolve, reject) => {
        const endpoint = `${baseUrl}/farm/${selectedFarm?._id}`;
        try {
          let response;
          if (selectedFarm) {
            response = await axios.patch(
              endpoint,
              { ...finalValues },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            const endpoint = `${baseUrl}/farm/`;
            response = await axios.post(endpoint, finalValues, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          }
          setRefetch(true);
          if (response.status === 200) {
            resolve(response);
            setModalOpen(false);
            setSelectedFarm(null);
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
  // setSelectedFarm(null);
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
      setSelectedFarm(null);
      setValues(INITIAL_VALUES);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    if (selectedFarm) {
      const formatted = {
        name: selectedFarm?.name,
        address: {
          location: {
            lang: selectedFarm?.address?.location?.lang,
            lat: selectedFarm?.address?.location?.lat,
          },
          localArea: selectedFarm?.address?.localArea,
          taluka: selectedFarm?.address?.taluka,
          district: selectedFarm?.address?.district,
          village: selectedFarm?.address?.village,
          state: selectedFarm?.address?.state,
          country: selectedFarm?.address?.country,
          pincode: selectedFarm?.address?.pincode,
        },
        tag: selectedFarm?.tag,
      };
      setValues(formatted);
    }
  }, [selectedFarm]);

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
              setSelectedFarm(null);
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
                  <div className="mt-5 space-y-8">
                    <div></div>
                    <div className="pt-5">
                      <div>
                        <h3 className="text-xl leading-6 font-medium text-gray-900">
                          {selectedFarm
                            ? "Edit Farm Details"
                            : "Enter Farm Details"}
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
                            Longitute coordinates
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="lang"
                              name="lang"
                              value={values?.address?.location?.lang}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    location: {
                                      ...values.address.location,
                                      lang: e.target.value,
                                    },
                                  },
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
                            Latitude Coordinates
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="lat"
                              name="lat"
                              value={values?.address?.location?.lat}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    location: {
                                      ...values.address.location,
                                      lat: e.target.value,
                                    },
                                  },
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
                            Local Area
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="localArea"
                              name="localArea"
                              value={values.address.localArea}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    localArea: e.target.value,
                                  },
                                })
                              }
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
                              value={values.address.village}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    village: e.target.value,
                                  },
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
                            Taluka
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="taluka"
                              id="taluka"
                              value={values.address.taluka}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    taluka: e.target.value,
                                  },
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
                            District
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="district"
                              name="district"
                              value={values.address.district}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    district: e.target.value,
                                  },
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
                            State
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={values.address.state}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    state: e.target.value,
                                  },
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
                              value={values.address.country}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    country: e.target.value,
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
                            Pincode
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="pincode"
                              name="pincode"
                              value={values.address.pincode}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: {
                                    ...values.address,
                                    pincode: e.target.value,
                                  },
                                })
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
                          {selectedFarm ? "Update" : "Submit"}
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

export default FarmModal;
