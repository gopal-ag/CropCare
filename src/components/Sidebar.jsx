import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UsersIcon } from "@heroicons/react/outline";
import MainLogo from "../images/agrotrust-logo-transparent.png";
import { GiPlantRoots } from "react-icons/gi";

function Sidebar() {
  const { pathname } = useLocation();

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
      current: pathname === "/users" ? true : false,
    },
    {
      name: "Manage Crops",
      href: "/crop",
      icon: GiPlantRoots,
      current: pathname === "/crop" ? true : false,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component */}
        <div className="flex flex-col flex-grow shadow-lg pt-5 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-8 w-auto" src={MainLogo} alt="emertech logo" />
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-green-100 text-[#008542]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "bg-green-100 text-[#008542]"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
