import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
// import * as Yup from "yup";
import { baseUrl } from "../../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import useBreakpoint from "../../utils/useBreakpoint";

const INITIAL_VALUES = {
  name: "",
};

function CropModal({
  userData,
  setModalOpen,
  modalOpen,
  setselectedCrop,
  selectedCrop,
  setRefetch,
  farmData,
}) {
  // onClick={() => setModalOpen(!modalOpen)}

  const modalContent = useRef(null);
  const [values, setValues] = useState(INITIAL_VALUES);

  const organizationId = useSelector(
    (state) => state?.auth?.user?.organizations?.[0]?._id
  );

  const { isMobile } = useBreakpoint();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Field Submitted");
    const token = localStorage.getItem("token");

    const addMessage = selectedCrop
      ? "Updating crop details..."
      : "Adding crop details...";
    const successMessage = selectedCrop
      ? "Crop details updated successfully 👍"
      : "Crop details added successfully 👍";
    const errorMessage = selectedCrop
      ? "Error updating crop details 🤯"
      : "Error adding crop details 🤯";

    toast.promise(
      new Promise(async (resolve, reject) => {
        const endpoint = `${baseUrl}/crop/${selectedCrop?._id}`;
        try {
          let response;
          let finalValues = {
            ...values,
            organizationId: organizationId,
          };
          if (selectedCrop) {
            console.log("Selected crop");
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
            console.log("Add crop");
            const endpoint = `${baseUrl}/crop/`;
            let finalValues = {
              ...values,
              organizationId: organizationId,
            };
            response = await axios.post(endpoint, finalValues, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          }
          if (response.status === 200) {
            resolve(response);
            setModalOpen(false);
            setselectedCrop(null);
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
  // setselectedCrop(null);
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
      setselectedCrop(null);
      setValues(INITIAL_VALUES);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    if (selectedCrop) {
      const formatted = {
        name: selectedCrop?.name,
      };
      setValues(formatted);
    }
  }, [selectedCrop]);

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
          className="bg-white overflow-auto max-w-xl w-full max-h-full rounded shadow-lg"
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
              setselectedCrop(null);
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
                          {selectedCrop
                            ? "Edit crop Details"
                            : "Enter crop Details"}
                        </h3>
                      </div>
                      <div className="mt-6 mb-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Crop Name
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
                          {selectedCrop ? "Update" : "Add crop"}
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

export default CropModal;
