import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
import MainLogo from "../images/agrotrust-logo-transparent.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { GiPlantRoots } from "react-icons/gi";
import useBreakpoint from "../utils/useBreakpoint";
import InstallPopup from "./InstallPopup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const tokenExpireTime = useSelector((state) => state?.auth?.user?.exp);

  const currentTime = Date.now() / 1000;
  const { isMobile, isTable } = useBreakpoint();

  if (isLoggedIn) {
    if (tokenExpireTime < currentTime) {
      console.log("token expired");
      dispatch(logout());
      navigate("/signin", { replace: true });
    }
  }

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
      current: pathname === "/" ? true : false,
    },
    {
      name: "Onboarding",
      href: "/onboarding",
      icon: UsersIcon,
      current: pathname === "/onboarding" ? true : false,
    },
    {
      name: "Users",
      href: "/users",
      icon: UsersIcon,
      current: pathname === "/Users" ? true : false,
    },
    {
      name: "Manage Crops",
      href: "/crop",
      icon: GiPlantRoots,
      current: pathname === "/crop" ? true : false,
    },
  ];

  return (
    <>
      <div>
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img className="h-8 w-auto" src={MainLogo} alt="emertech" />
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-green-100 text-[#008542]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          <Sidebar />
          <div className="md:pl-64 flex flex-col flex-1">
            <TopBar setSidebarOpen={setSidebarOpen} />
            {children}
            <h6
              style={{
                display: `${isMobile ? "block" : "flex"}`,
                justifyContent: "center",
                marginBottom: "2rem",
                marginLeft: `${isMobile ? "1rem" : "0"}`,
              }}
              classname="text-xs mb-5"
            >
              AgroTrust Farm DB ©2022 Created by &nbsp;
              <a href="https://emertech.io/" target={"_blank"} rel="noreferrer">
                Emertech Innovations
              </a>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
