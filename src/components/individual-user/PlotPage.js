import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import {
  AiFillEdit,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import PlotModal from "../onboarding/PlotModal";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../utils/Utils";
import DeleteModal from "../DeleteModal";
import PlotTable from "../plot/PlotTable";
import ReactPaginate from "react-paginate";
import useBreakpoint from "../../utils/useBreakpoint";

function PlotPage({
  fieldData,
  userData,
  setRefetch,
  farmData,
  plotData,
  pageCount,
  handlePageClick,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { isMobile, isExtremeSmall } = useBreakpoint();

  const searchItems = () => {
    if (searchInput !== "") {
      const filteredData = plotData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(plotData);
    }
  };

  useEffect(() => {
    searchItems();
  }, [searchInput]);

  const handleEdit = (plot) => {
    setSelectedPlot(plot);
    setModalOpen(true);
  };

  const deletePlot = (id) => {
    const endpoint = `${baseUrl}/plot/${id}`;
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
        pending: "Deleting plot...",
        success: "Plot deleted Successfully 👍",
        error: "Error deleting plot 🤯",
      }
    );
  };

  console.log(filteredResults, "filtered");

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
            {plotData?.length > 0 ? (
              <h1 className="text-2xl mb-1 font-semibold text-gray-900">
                Plot Details
              </h1>
            ) : (
              <h1
                className={
                  isMobile
                    ? "text-lg w-40 mb-1 font-semibold text-gray-900"
                    : "text-xl mb-1 font-semibold text-gray-900"
                }
              >
                Add Plot to this field
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
                  {plotData?.length > 0 ? "Add New" : "Add Plot"}
                </span>
              </button>
            )}
          </div>
          <div className="flex items-center">
            {plotData?.length > 0 && (
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

            {/* Add New button */}
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
                  {plotData?.length > 0 ? "Add New" : "Add Plot"}
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className="p-3">
          {/* Table */}
          {searchInput ? (
            <PlotTable plotData={filteredResults} />
          ) : (
            <PlotTable plotData={plotData} />
          )}
        </div>
        <div>
          {plotData?.length > 0 && (
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

      <PlotModal
        fieldData={fieldData}
        setRefetch={setRefetch}
        farmData={farmData}
        plotData={plotData}
        setSelectedPlot={setSelectedPlot}
        selectedPlot={selectedPlot}
        userData={userData}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <DeleteModal
        deleteObj={deletePlot}
        selectedObj={selectedPlot}
        setSelectedObj={setSelectedPlot}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default PlotPage;
