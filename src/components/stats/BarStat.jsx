import { useState, useEffect } from "react";
import BarChart from "../../charts/BarCharts.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/Utils";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import { useSelector } from "react-redux";

function BarStat() {
  const [LandData, setLandData] = useState([]);

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const getLandData = async () => {
    const endpoint = `${baseUrl}/metrics/getAvgLandHolding`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye land data response");
        setLandData(response?.data);
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  useEffect(() => {
    getLandData();
  }, []);

  let farmersCount = LandData?.data?.map((item) => item?.farmerCount);
  let landHolding = LandData?.data?.map((item) => item?.area);

  console.log(farmersCount, "count");
  console.log(LandData?.data?.[0] ? true : false, "count");

  const chartData = {
    labels: farmersCount,
    datasets: [
      // Light blue bars
      {
        label: "Total Acres hold by farmers",
        data: landHolding,
        backgroundColor: tailwindConfig().theme.colors.green[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      // {
      //   label: "Indirect",
      //   data: [4900, 2600, 5350, 4800, 5200, 4800],
      //   backgroundColor: tailwindConfig().theme.colors.green[500],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
    ],
  };

  return (
    <>
      {LandData?.data?.[0] && (
        <div className="flex rounded-xl flex-col col-span-full sm:col-span-full xl:col-span-8 bg-white shadow-lg border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">
              Average land holding by farmers in acres
            </h2>
          </header>
          {/* Chart built with Chart.js 3 */}
          {/* Change the height attribute to adjust the chart height */}
          <BarChart data={chartData} />
        </div>
      )}
    </>
  );
}

export default BarStat;
