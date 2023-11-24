import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import FieldModal from "../onboarding/FieldModal";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteModal from "../DeleteModal";
import { baseUrl } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";
import CropModal from "./CropModal";

function CropTable({ cropData, setCropData, setRefetch }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCrop, setselectedCrop] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = (crop) => {
    setselectedCrop(crop);
    setModalOpen(true);
  };

  const navigate = useNavigate();

  console.log(cropData);

  const deleteCrop = (id) => {
    const endpoint = `${baseUrl}/crop/${id}`;
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
          }
        } catch (error) {
          reject(error);
          setRefetch(false);
          console.log(error);
        }
      }),
      {
        pending: "Deleting crop...",
        success: "crop deleted Successfully 👍",
        error: "Error deleting crop 🤯",
      }
    );
  };

  return (
    <>
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg border border-slate-200 mt-10 rounded-3xl">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between">
          <div>
            {cropData?.length > 0 ? (
              <h1 className="text-2xl mb-1 font-semibold text-gray-900">
                Crop Details
              </h1>
            ) : (
              <h1 className="text-xl mb-1 font-semibold text-gray-900">
                Add Crop details
              </h1>
            )}
          </div>
          <div>
            {/* Add New button */}

            <button
              className="btn rounded-2xl ml-5 bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
              onClick={() => setModalOpen(true)}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className=" ml-2">
                {cropData?.length > 0 ? "Add New" : "Add Crop"}
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          {/* Table */}
          {cropData?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-100">
                  {/* Row */}
                  {cropData?.length > 0
                    ? cropData?.map((data) => (
                        <tr>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="d-block">
                                <div className="text-slate-800">
                                  {data?.name}
                                </div>
                                {/* <div className="text-sm text-gray-500">
                            {person?.gender} {person?.email}
                          </div> */}
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              <div className="flex justify-center">
                                <div>
                                  <button onClick={() => handleEdit(data)}>
                                    <AiFillEdit className="text-2xl  text-green-500" />
                                  </button>
                                </div>
                                <div className="ml-5">
                                  <button
                                    onClick={() => {
                                      setDeleteModalOpen(true);
                                      setselectedCrop(data);
                                    }}
                                  >
                                    <MdDelete className="text-2xl text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <CropModal
        setRefetch={setRefetch}
        // farmData={farmData}
        setselectedCrop={setselectedCrop}
        selectedCrop={selectedCrop}
        // userData={userData}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <DeleteModal
        deleteObj={deleteCrop}
        selectedObj={selectedCrop}
        setSelectedObj={setselectedCrop}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default CropTable;
