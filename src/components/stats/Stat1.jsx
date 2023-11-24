import { useState, useEffect } from "react";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
// import EditMenu from "../EditMenu";
import { GiFarmer } from "react-icons/gi";
import { GiPlantRoots } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/Utils";
import useBreakpoint from "../../utils/useBreakpoint";
import { useSelector } from "react-redux";

function Stat1() {
  const [farmData, setFarmData] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const [farmersData, setFarmersData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const { isMobile, isTable } = useBreakpoint();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const getFarmData = async () => {
    const endpoint = `${baseUrl}/metrics/getTotalFarmLand`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye farm chart data response");
        setFarmData(response?.data);
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getAllPlot = async () => {
    const endpoint = `${baseUrl}/metrics/getAllPlots`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye plot chart data response");
        setPlotData(response?.data);
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getAllFarmers = async () => {
    const endpoint = `${baseUrl}/metrics/getTotalFarmers`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye farmers chart data response");
        setFarmersData(response?.data);
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getAllUsers = async () => {
    const endpoint = `${baseUrl}/metrics/getTotalUsers`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye users chart data response");
        setUsersData(response?.data);
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  useEffect(() => {
    getFarmData();
    getAllPlot();
    getAllFarmers();
    getAllUsers();
  }, []);

  // const chartData = {
  //   labels: [
  //     "12-01-2020",
  //     "01-01-2021",
  //     "02-01-2021",
  //     "03-01-2021",
  //     "04-01-2021",
  //     "05-01-2021",
  //     "06-01-2021",
  //     "07-01-2021",
  //     "08-01-2021",
  //     "09-01-2021",
  //     "10-01-2021",
  //     "11-01-2021",
  //     "12-01-2021",
  //     "01-01-2022",
  //     "02-01-2022",
  //     "03-01-2022",
  //     "04-01-2022",
  //     "05-01-2022",
  //     "06-01-2022",
  //     "07-01-2022",
  //     "08-01-2022",
  //     "09-01-2022",
  //     "10-01-2022",
  //     "11-01-2022",
  //     "12-01-2022",
  //     "01-01-2023",
  //   ],
  //   datasets: [
  //     // Indigo line
  //     {
  //       data: [
  //         732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
  //         154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
  //       ],
  //       fill: true,
  //       backgroundColor: "#c8facd",
  //       borderColor: "#00AB55",
  //       borderWidth: 2,
  //       tension: 0,
  //       pointRadius: 0,
  //       pointHoverRadius: 3,
  //       pointBackgroundColor: "#00AB55",
  //       clip: 20,
  //     },
  //     // Gray line
  //     {
  //       data: [
  //         532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234,
  //         314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
  //       ],
  //       borderColor: tailwindConfig().theme.colors.slate[300],
  //       borderWidth: 2,
  //       tension: 0,
  //       pointRadius: 0,
  //       pointHoverRadius: 3,
  //       pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
  //       clip: 20,
  //     },
  //   ],
  // };

  return (
    <div
      style={
        isMobile
          ? { width: "100%", marginTop: "20px" }
          : { width: "300px", marginTop: "20px" }
      }
      className="bg-white shadow-lg mb-5 rounded-3xl border border-slate-200"
    >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* Menu button */}
          {/* <EditMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu> */}
        </header>
        <h2
          className={
            isMobile
              ? "text-lg text-center mt-5 font-semibold text-gray-500 text-slate-800 mb-2"
              : "text-lg mt-5 font-semibold text-gray-500 text-slate-800 mb-2"
          }
        >
          Total farmers registered
        </h2>
        {/* <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          Users
        </div> */}
        <div
          className={
            isMobile ? "flex items-center justify-center" : "flex items-start"
          }
        >
          <div className="text-4xl flex font-bold text-slate-800 mr-2">
            <GiFarmer
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                width: "45px",
                height: "45px",
                padding: "6px",
                borderRadius: "15px",
              }}
              className="text-green-800"
            />{" "}
            <span className="ml-6">
              {farmersData?.data?.total_farmers
                ? farmersData?.data?.total_farmers
                : "0"}
            </span>
            <span className="text-lg mt-4 ml-1">farmers</span>
          </div>
        </div>
        <h2
          className={
            isMobile
              ? "text-lg text-center mt-5 font-semibold text-gray-500 text-slate-800 mb-2"
              : "text-lg mt-5 font-semibold text-gray-500 text-slate-800 mb-2"
          }
        >
          Total Farm Land
        </h2>
        {/* <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          Users
        </div> */}
        <div
          className={
            isMobile ? "flex items-center justify-center" : "flex items-start"
          }
        >
          <div className="text-4xl flex font-bold text-slate-800 mr-2">
            <GiPlantRoots
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                width: "45px",
                height: "45px",
                padding: "6px",
                borderRadius: "15px",
              }}
              className="text-green-800"
            />{" "}
            <span className="ml-5">
              {farmData?.data?.totalFarmLand
                ? farmData?.data?.totalFarmLand
                : "0"}{" "}
            </span>
            <span className="text-lg mt-4 ml-1">acres</span>
          </div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            +49%
          </div> */}
        </div>
        <h2
          className={
            isMobile
              ? "text-lg text-center mt-5 font-semibold text-gray-500 text-slate-800 mb-2"
              : "text-lg mt-5 font-semibold text-gray-500 text-slate-800 mb-2"
          }
        >
          Total users registered
        </h2>
        {/* <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          Users
        </div> */}
        <div
          className={
            isMobile ? "flex items-center justify-center" : "flex items-start"
          }
        >
          <div className="text-4xl mb-5 flex font-bold text-slate-800 mr-2">
            <HiOutlineUsers
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                width: "45px",
                height: "45px",
                padding: "6px",
                borderRadius: "15px",
              }}
              className="text-green-800"
            />{" "}
            <span className="ml-5">
              {usersData?.data?.total_users
                ? usersData?.data?.total_users
                : "0"}
            </span>
            <span className="text-lg mt-4 ml-1">users</span>
          </div>
        </div>
        {/* <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            +49%
          </div> */}
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart data={chartData} width={389} height={128} /> */}
      </div>
    </div>
  );
}

export default Stat1;
