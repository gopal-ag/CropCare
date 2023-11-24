import React from "react";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import MainLogo from "../images/agro-logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";

function TopBar({ setSidebarOpen }) {
  const userNavigation = [{ name: "Sign out", href: "/signin" }];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin", { replace: true });
  };

  return (
    <div
      style={{ background: "rgb(255 255 255 / 0.5)" }}
      className="sticky top-0 z-10 flex-shrink-0 flex h-16 shadow"
    >
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex"></div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src={MainLogo} alt="" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
