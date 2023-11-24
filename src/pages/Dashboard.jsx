import { Stats } from "../components/stats";
import FarmerTable from "../components/FarmerTable";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import Stat1 from "../components/stats/Stat1";
import DoughtnutStat from "../components/stats/DoughtnutStat";
import BarStat from "../components/stats/BarStat";

function Dashboard() {
  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* <h1 className="text-2xl mb-4 font-semibold text-gray-900">
            Farmer Stats
          </h1> */}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row gap-8">
            <div className="col-span-2">
              <WelcomeCard />
            </div>
            <div className="">
              <Stat1 />
            </div>
          </div>
          <div className="grid grid-cols-12  gap-6">
            <DoughtnutStat />
            <BarStat />
          </div>
          {/* <Stats /> */}
          <FarmerTable />
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
