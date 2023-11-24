import { useState } from "react";
import FarmForm from "../components/onboarding/FarmForm";
import PlotForm from "../components/onboarding/PlotForm";
import UserForm from "../components/onboarding/UserForm";

function Onboarding() {
  // console.log(isContact);
  const [showUserForm, setShowUserform] = useState(true);
  const [showFarmForm, setShowFarmform] = useState(false);
  const [showPlotForm, setShowPlotform] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <main className="flex-1">
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-white shadow-lg border border-slate-200 rounded-3xl">
          {showUserForm && (
            <UserForm
              setUserId={setUserId}
              setShowFarmform={setShowFarmform}
              setShowUserform={setShowUserform}
            />
          )}
          {/* {showFarmForm && (
            <FarmForm
              userId={userId}
              setShowUserform={setShowUserform}
              setShowFarmform={setShowFarmform}
              setShowPlotform={setShowPlotform}
            />
          )} */}
          {/* {showPlotForm && (
            <PlotForm
              setShowFarmform={setShowFarmform}
              setShowPlotform={setShowPlotform}
            />
          )} */}
        </div>
      </div>
    </main>
  );
}

export default Onboarding;
