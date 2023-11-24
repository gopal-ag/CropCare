import React from "react";
import Stat1 from "./Stat1";
import Stat2 from "./Stat2";
import Stat3 from "./Stat3";

export const Stats = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <Stat1 />
      <Stat2 />
      <Stat3 />
    </div>
  );
};
