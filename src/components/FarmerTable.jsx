import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import FarmerIcon from "../images/farmer.png";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineSearch,
} from "react-icons/ai";
import UsersData from "./farmers/UsersData";
import useBreakpoint from "../utils/useBreakpoint";

function FarmerTable() {
  const [farmersData, setFarmersData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const organizationId = useSelector(
    (state) => state?.auth?.user?.organizations?.[0]?._id
  );

  console.log("organizationId", organizationId);

  const { isMobile, isExtremeSmall } = useBreakpoint();

  useEffect(() => {
    getUsers();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  const getUsers = async () => {
    const endpoint = `${baseUrl}/user?page=${offset}&limit=${perPage}`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          organizationId: organizationId,
        },
      });
      if (response) {
        const formattedData = response?.data?.data;
        console.log(response.data.totalPages, "ye farmer data response");
        console.log(formattedData, "ye formatted data");
        setFarmersData(formattedData);
        setPageCount(response.data.totalPages);
      }
    } catch (error) {
      // if (isLoggedIn) {
      //   toast.error(`${error.message}`);
      // }
      console.log(error);
    }
  };

  const searchItems = () => {
    if (searchInput !== "") {
      const filteredData = farmersData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(farmersData);
    }
  };

  useEffect(() => {
    searchItems();
  }, [searchInput]);

  console.log(farmersData, "farmers data");

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg border border-slate-200 mt-10 rounded-3xl">
      <header
        className={
          isMobile
            ? "px-5 py-4 pt-10 border-b border-slate-100 flex flex-col"
            : "px-5 py-4 pt-10 border-b border-slate-100 flex justify-between"
        }
      >
        <div className={isMobile ? "flex justify-between" : ""}>
          <h1 className="text-2xl mb-1 font-semibold text-gray-900">
            Users List
          </h1>
          {isMobile && (
            <Link to="/onboarding">
              <button
                style={{ border: "1px solid #00AB55", paddingTop: "12px" }}
                className="btn rounded-2xl p-5 bg-[#00AB55] text-white shadow-lg shadow-green-500/50"
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="ml-2">Add New</span>
              </button>
            </Link>
          )}
        </div>

        <div
          className={
            isMobile ? "flex flex-col items-center" : "flex items-center"
          }
        >
          <div className={isMobile ? "flex w-[17rem] mt-5" : "flex w-[17rem]"}>
            {farmersData?.length > 0 && (
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
            )}
          </div>
          {/* Add New button */}
          <Link className={isMobile ? "hidden" : ""} to="/onboarding">
            <button
              style={{ border: "1px solid #00AB55", paddingTop: "12px" }}
              className="btn rounded-2xl p-5 bg-[#00AB55] text-white shadow-lg shadow-green-500/50"
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-2">Add New</span>
            </button>
          </Link>
        </div>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Photo</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Profile Details</div>
                </th>
                <th className="p-2">
                  <div
                    style={isMobile ? { width: "150px" } : {}}
                    className="font-semibold text-center"
                  >
                    Dob
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Phone Number</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Education</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Village</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Taluka</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">District</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">State</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Country</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Pincode</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Type</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                {/* <th className="p-2">
                  <span className="sr-only">Edit</span>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              <UsersData
                farmersData={searchInput ? filteredResults : farmersData}
              />
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {farmersData?.length > 0 && (
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
  );
}

export default FarmerTable;
