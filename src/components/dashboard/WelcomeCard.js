import React from "react";
import WelcomeSvg from "../dashboard/WelcomeVector.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useBreakpoint from "../../utils/useBreakpoint";

function WelcomeCard() {
  const organizationName = useSelector(
    (state) => state?.auth?.user?.organizations?.[0]?.name
  );

  console.log(organizationName);

  const { isMobile, isTable } = useBreakpoint();

  return (
    <div
      style={
        isMobile
          ? { backgroundColor: "#c8facd", height: "25rem" }
          : { backgroundColor: "#c8facd", height: "21rem" }
      }
      class="flex flex-col mt-5 items-center rounded-3xl mb-5 bg-white border shadow-md md:flex-row md:max-w-3xl  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div
        style={
          isMobile
            ? { marginTop: "-2rem" }
            : { marginTop: "-2rem", marginLeft: "3rem" }
        }
        class="flex flex-col justify-between pt-2  leading-normal"
      >
        <h5
          class={
            isMobile
              ? "mb-2 mt-12 text-center text-xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
              : "mb-2 text-xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          }
        >
          Welcome back!
          <br /> {organizationName}
        </h5>
        <p
          class={
            isMobile
              ? "mb-3 px-8 mr-5 text-center font-normal text-gray-700 dark:text-gray-400"
              : "mb-3 font-normal text-gray-700 dark:text-gray-400"
          }
        >
          Welcome back {organizationName} to the agrotrust farmer dashboard
        </p>
        <div className={isMobile ? "flex justify-center" : "justify-end"}>
          <Link
            type="submit"
            to={`/onboarding`}
            className="w-max flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[#00AB55] shadow-lg shadow-green-500/50 hover:bg-[#00AB55]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AB55]"
          >
            Go to onboarding
          </Link>
        </div>
      </div>
      <img
        style={isMobile ? { width: "180px" } : {}}
        src={WelcomeSvg}
        alt="Welcome"
        className={isMobile ? "w-72 mt-8 p-5" : "w-72 p-5"}
      />
    </div>
  );
}

export default WelcomeCard;
