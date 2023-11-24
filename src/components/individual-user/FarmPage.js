// import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
// import { AiFillEdit } from "react-icons/ai";
import FarmModal from "../onboarding/FarmModal";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import FarmerTable from "../FarmerTable";
import FarmTable from "./FarmTable";
import useBreakpoint from "../../utils/useBreakpoint";

function FarmPage({
  farmData,
  userData,
  setRefetch,
  pageCount,
  handlePageClick,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { isMobile, isExtremeSmall } = useBreakpoint();

  const searchItems = () => {
    if (searchInput !== "") {
      const filteredData = farmData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(farmData);
    }
  };

  useEffect(() => {
    searchItems();
  }, [searchInput]);

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
            {farmData?.length > 0 ? (
              <h1 className="text-2xl mb-1 font-semibold text-gray-900">
                Farm Details
              </h1>
            ) : (
              <h1
                className={
                  isMobile
                    ? "text-lg w-40 mb-1 font-semibold text-gray-900"
                    : "text-xl mb-1 font-semibold text-gray-900"
                }
              >
                Add Farm details to the farmer
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
                  {farmData?.length > 0 ? "Add New" : "Add Farm"}
                </span>
              </button>
            )}
          </div>
          <div className="flex items-center">
            {farmData?.length > 0 && (
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
              {/* Add New button */}

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
                  {farmData?.length > 0 ? "Add New" : "Add Farm"}
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className="p-3">
          {/* Table */}
          {searchInput ? (
            <FarmTable farmData={filteredResults} />
          ) : (
            <FarmTable farmData={farmData} />
          )}
        </div>
        <div>
          {farmData?.length > 0 && (
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
      <FarmModal
        setRefetch={setRefetch}
        userData={userData}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
    </>
  );
}

export default FarmPage;
