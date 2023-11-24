import { useState, useEffect } from "react";
import DoughnutChart from "../../charts/DoughnutChart";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/Utils";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";
import { useSelector } from "react-redux";

function DoughtnutStat() {
  const [cropData, setCropData] = useState([]);

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const getCropData = async () => {
    const endpoint = `${baseUrl}/metrics/getAvgCrops`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log(response, "ye crop metric data response");
        setCropData(response?.data.data);
      }
    } catch (error) {
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getCropData();
  }, []);

  let cropNames = cropData?.map((item) => item?.cropName);
  let plotNumbers = cropData?.map((item) => item?.NoPlots);

  // console.log(cropNames, "names");
  // console.log(plotNumbers, "numbers");

  const chartData = {
    labels: cropNames,
    datasets: [
      {
        label: "Total No of plots",
        data: plotNumbers,
        backgroundColor: [
          tailwindConfig().theme.colors.green[400],
          tailwindConfig().theme.colors.green[600],
          tailwindConfig().theme.colors.green[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.green[400],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.green[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <>
      {cropData?.length > 0 && (
        <div className="flex flex-col rounded-xl col-span-full sm:col-span-full xl:col-span-4 bg-white shadow-lg border border-slate-200">
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">
              Average Crops per active plot (in numbers)
            </h2>
          </header>
          <DoughnutChart data={chartData} width={389} height={260} />
        </div>
      )}
    </>
  );
}

export default DoughtnutStat;
