import React from "react";
import { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Transition } from "@headlessui/react";
import { MdDelete } from "react-icons/md";

function DeleteModal({
  deleteModalOpen,
  setDeleteModalOpen,
  deleteObj,
  obj,
  selectedObj,
  setSelectedObj,
}) {
  const modalContent = useRef(null);
  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={deleteModalOpen}
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
        show={deleteModalOpen}
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
          <main className="flex-1">
            <div className="px-6 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-white">
                <div>
                  <h3 className="text-lg text-center pt-4 leading-6 font-semibold text-gray-900">
                    Are you sure you want to delete ?
                  </h3>
                </div>
                <div className="flex justify-center mt-5 mb-5">
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        deleteObj(obj?.firstName ? obj?._id : selectedObj?._id);
                      }}
                      className="btn ml-5 bg-[red] shadow-lg shadow-green-500/50 hover:bg-[red] text-white"
                    >
                      <MdDelete className="text-xl mr-2" />
                      <span className="">Yes</span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteModalOpen(false);
                        setSelectedObj(null);
                      }}
                      className="btn inline-flex ml-5 mr-5 cursor-pointer items-center py-2 px-3 text-sm font-medium text-cente bg-[#00AB55] hover:bg-[#00AB55] text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Transition>
    </>
  );
}

export default DeleteModal;
