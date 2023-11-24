import { useState, useEffect } from "react";
import CropTable from "../components/crop/CropTable";
import VarietyTable from "../components/crop/VarietyTable";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../utils/Utils";
import useBreakpoint from "../utils/useBreakpoint";
import { useSelector } from "react-redux";

function Crop() {
  const [refetch, setRefetch] = useState(false);
  const [cropData, setCropData] = useState([]);
  const [varietyData, setVarietyData] = useState([]);

  const { isMobile } = useBreakpoint();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const getCropData = async () => {
    const endpoint = `${baseUrl}/crop/getAllCrops`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response, "ye crop data response");
        setCropData(response?.data?.data);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  const getVarietyData = async () => {
    const endpoint = `${baseUrl}/variety/allVarieties`;
    const token = localStorage.getItem("token");
    try {
      let response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log(response, "ye variety data response");
        setVarietyData(response?.data?.data);
        setRefetch(false);
      }
    } catch (error) {
      setRefetch(false);
      if (isLoggedIn) {
        toast.error(`${error.message}`);
      }
    }
  };

  useEffect(() => {
    getCropData();
    getVarietyData();
  }, []);

  useEffect(() => {
    if (refetch) {
      getCropData();
      getVarietyData();
    }
  }, [refetch]);

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl ml-5 mb-4 font-semibold text-gray-900">
            Manage Crops
          </h1>
        </div>
        <div className={isMobile ? "grid grid-cols-1" : "grid grid-cols-2"}>
          <div
            style={{ width: "-webkit-fill-available" }}
            className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8"
          >
            <CropTable cropData={cropData} setRefetch={setRefetch} />
          </div>
          <div
            style={{ width: "-webkit-fill-available" }}
            className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8"
          >
            <VarietyTable
              cropData={cropData}
              varietyData={varietyData}
              setRefetch={setRefetch}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Crop;
