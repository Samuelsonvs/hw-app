import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useUser } from "@/context/Context";

const navigation = [
  ["Home", "/"],
  ["Students", "/students"],
  ["Teachers", "/teachers"]
];
const classNames  = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { session, userDetails, signOut } = useUser();
  const [bool, setBool] = useState(false);

  const logOut = async () => {
    await signOut();
    console.log("log out");
  };

  const handleNavButton = () => {
    setBool(!bool);
  };

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 py-2 sm:px-4 md:px-2 lg:px-15">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item, itemIdx) =>
                      itemIdx === 0 ? (
                        <Fragment key={item[0]}>
                          <Link href={item[1]}>
                            <a
                              onClick={handleNavButton}
                              className="button-mode px-3 py-2 rounded-md text-sm font-medium transition duration-100 ease-in-out"
                            >
                              {item[0]}
                            </a>
                          </Link>
                        </Fragment>
                      ) : (
                        <a
                          onClick={handleNavButton}
                          key={item[0]}
                          href={item[1]}
                          className="button-mode px-3 py-2 rounded-md text-sm font-medium transition duration-100 ease-in-out"
                        >
                          {item[0]}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex mr-2">
                  {/* Theme Provider  */}
                  {/* Theme Provider Finish */}
                  {!session && (
                    <Link passHref href="/signin">
                        <a
                        className="button-mode button-active-effect font-semibold focus:outline-none px-2 py-1 rounded-md"
                        >
                        Sign in
                        </a>
                    </Link>
                  )}
                  {session && (
                    <div className="hidden md:block">
                      <div className="ml-3 flex items-center md:ml-3">
                        <button className="bg-gray-800 hidden p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">View notifications</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          {({ open }) => (
                            <div className="flex space-x-2">
                            <div className="m-auto">
                              {userDetails?.username}
                            </div>
                              <div>
                                <Menu.Button className="max-w-xs bg-gray-200 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                  <div className="rounded-full border border-yellow-200 overflow-hidden w-10 h-10 m-1 relative">
                                  <Image
                                    layout="fill"
                                    alt="profilpic"
                                    src="/static/images/navbar/mockprofile.png"
                                    />
                                    </div>
                                </Menu.Button>
                              </div>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute right-0 mt-14 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <Menu.Item>
                                      {({ active }) =>
                                        <>
                                          <a
                                            href={userDetails?.teacher ? "/myhomeworks" : "/mystudents"}
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                          >
                                            {userDetails?.teacher ? "Homeworks" : "Students"}
                                          </a>
                                          <a
                                            onClick={() => signOut()}
                                            href="#"
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                          >
                                            Sign out
                                          </a>
                                        </>
                                          
                                      }
                                    </Menu.Item>
                                  
                                </Menu.Items>
                              </Transition>
                            </div>
                          )}
                        </Menu>
                      </div>
                    </div>
                  )}
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="button-mode inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <Fragment key={item[0]}>
                    <Link href={item[1]}>
                      <a className="button-mode block px-3 py-2 rounded-md text-base font-medium transition duration-100 ease-in-out">
                        {item[0]}
                      </a>
                    </Link>
                  </Fragment>
                ) : (
                  <a
                    key={item[0]}
                    href={item[1]}
                    className="button-mode block px-3 py-2 rounded-md text-base font-medium transition duration-100 ease-in-out"
                  >
                    {item[0]}
                  </a>
                )
              )}
            </div>
            {session && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex space-x-2 items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="rounded-full border border-yellow-200 w-10 h-10 m-1 relative"> 
                        <Image
                            layout="fill"
                            alt="profilpic"
                            src="/static/images/navbar/mockprofile.png"
                        />
                    </div>
                  </div>
                  {/* <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-600 dark:text-gray-200">
                      {session.user.username}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {session.user.full_name}
                    </div>
                  </div> */}
                  <button className="ml-auto hidden bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <div>
                    {userDetails?.username}
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                <a
                  href={userDetails?.teacher ? "/myhomeworks" : "/mystudents"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  {userDetails?.teacher ? "Homeworks" : "Students"}
                </a>
                  <a
                    onClick={() => logOut()}
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
