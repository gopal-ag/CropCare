// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  AiFillEdit,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import FieldModal from "../onboarding/FieldModal";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteModal from "../DeleteModal";
import { baseUrl } from "../../utils/Utils";
import FieldTable from "../field/FieldTable";
import ReactPaginate from "react-paginate";
import useBreakpoint from "../../utils/useBreakpoint";

function FieldPage({
  fieldData,
  userData,
  setRefetch,
  farmData,
  pageCount,
  handlePageClick,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { isMobile, isExtremeSmall } = useBreakpoint();

  const searchItems = () => {
    if (searchInput !== "") {
      const filteredData = fieldData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(fieldData);
    }
  };

  useEffect(() => {
    searchItems();
  }, [searchInput]);

  const handleEdit = (field) => {
    setSelectedField(field);
    setModalOpen(true);
  };

  const deleteField = (id) => {
    const endpoint = `${baseUrl}/field/${id}`;
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

  return (
    <>
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg border border-slate-200 mt-10 rounded-3xl">
        <header
          className={
            isMobile
              ? "px-5 py-4 pt-10 border-b border-slate-100 flex flex-col"
              : "px-5 py-4 pt-10 border-b border-slate-100 flex justify-between"
          }
        >
          <div className={isMobile ? "flex justify-between" : ""}>
            {fieldData?.length > 0 ? (
              <h1 className="text-2xl mb-1 font-semibold text-gray-900">
                Field Details
              </h1>
            ) : (
              <h1
                className={
                  isMobile
                    ? "text-lg w-40 mb-1 font-semibold text-gray-900"
                    : "text-xl mb-1 font-semibold text-gray-900"
                }
              >
                Add Field to this farm
              </h1>
            )}
            {isMobile && (
              <button
                className="btn rounded-2xl bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                onClick={() => setModalOpen(true)}
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className=" ml-2">
                  {fieldData?.length > 0 ? "Add New" : "Add Field"}
                </span>
              </button>
            )}
          </div>
          <div
            className={
              isMobile ? "flex flex-col items-center" : "flex items-center"
            }
          >
            {/* Add New button */}

            {fieldData?.length > 0 && (
              <div
                className={isMobile ? "flex w-[17rem] mt-5" : "flex w-[17rem]"}
              >
                <div className=" flex items-center justify-center pl-1 pr-4 border border-[#008542] rounded-md">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    // value={values.name}
                    onChange={(e) => setSearchInput(e.target.value)}
                    // onBlur={handleBlur}
                    autoComplete="given-name"
                    className="border-none focus:border-none focus:outline-none focus:ring-0"
                  />
                  <AiOutlineSearch className="text-[#008542]" />
                </div>
              </div>
            )}
            <div className={isMobile ? "hidden" : ""}>
              <button
                className="btn rounded-2xl bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55] text-white"
                onClick={() => setModalOpen(true)}
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2">
                  {fieldData?.length > 0 ? "Add New" : "Add Field"}
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className="p-3">
          {/* Table */}
          {searchInput ? (
            <FieldTable fieldData={filteredResults} />
          ) : (
            <FieldTable fieldData={fieldData} />
          )}
        </div>
        <div>
          {fieldData?.length > 0 && (
            <div className="App">
              <ReactPaginate
                previousLabel={
                  <span className="flex items-center">
                    {!isExtremeSmall && <AiOutlineArrowLeft />} &nbsp; Prev
                  </span>
                }
                nextLabel={
                  <span className="flex items-center">
                    Next &nbsp; {!isExtremeSmall && <AiOutlineArrowRight />}
                  </span>
                }
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      </div>
      <FieldModal
        setRefetch={setRefetch}
        farmData={farmData}
        setSelectedField={setSelectedField}
        selectedField={selectedField}
        userData={userData}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <DeleteModal
        deleteObj={deleteField}
        selectedObj={selectedField}
        setSelectedObj={setSelectedField}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default FieldPage;
