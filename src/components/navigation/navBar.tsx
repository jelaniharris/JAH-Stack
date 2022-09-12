import { Popover, Menu, Transition } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import { useState, Fragment } from "react";
import React from "react";
import { usePopper } from "react-popper";
import { NavButton } from "./navButton";
import { useRouter } from "next/router";

export const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const NavUserOptionsComponent = () => {
    const [referenceElement, setReferenceElement] =
      useState<HTMLButtonElement | null>();
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
    let { styles, attributes } = usePopper(referenceElement, popperElement);

    if (status !== "authenticated" || !session) {
      return <></>;
    }

    const menuItemStyle = "block px-4 py-2 text-sm text-gray-700";
    const activeMenuItemStyle = "bg-gray-100 text-gray-500";
    const disabledMenuItemStyle = "opacity-40";

    return (
      <Menu as="div" className="relative">
        <Menu.Button className="focus:outline-none focus:ring-2 focus:ring-offset-2 ring-black rounded-full">
          <img
            className="rounded-full w-8 h-8"
            src={session.user?.image ?? ""}
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 divide-y origin-top-right bg-white rounded-md shadow-lg border">
            <div className="px-1 py-1 text-black">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${menuItemStyle} ${
                      active && activeMenuItemStyle
                    }`}
                    href="#"
                  >
                    My Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${menuItemStyle}  ${
                      active && activeMenuItemStyle
                    }`}
                    href="#"
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item disabled>
                {({ active, disabled }) => (
                  <a
                    className={`${menuItemStyle}  ${
                      active && activeMenuItemStyle
                    }
                  ${disabled && disabledMenuItemStyle}`}
                    href="#"
                  >
                    Help
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => signOut()}
                    className={`${menuItemStyle}  ${
                      active && activeMenuItemStyle
                    }`}
                    href="#"
                  >
                    Sign Out
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );

    /*return (
      <Popover className="relative">
        <Popover.Button ref={setReferenceElement}>
          <img
            className="rounded-full w-8 mr-4"
            src={session.user?.image ?? ""}
          />
        </Popover.Button>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className=""
        >
          <div className="right-0 bg-white rounded-md shadow-lg border w-48">
            <div className="grid grid-cols-2">
              <span className="text-gray-500 mr-4">{session.user?.name}</span>
              <span className="text-gray-500 mr-4">Log Out</span>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    );*/
  };

  const NavActionComponent = () => {
    if (status === "loading") {
      return <div>Loading</div>;
    }

    return (
      <>
        {status === "authenticated" && session && (
          <div className="flex flex-row items-end">
            <NavUserOptionsComponent />
          </div>
        )}

        {status === "unauthenticated" && (
          <>
            <div>
              <a href="/signin" className="inline-block btn btn-primary">
                Sign In
              </a>
            </div>
            <div>
              <a
                href="/api/auth/signin"
                className="inline-block btn btn-secondary"
              >
                Sign Up
              </a>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          JAH Boilerplate
        </span>
      </div>
      <div className="ml-10 flex items-baseline space-x-4">
        <NavButton href="/" active={router.pathname == "/"}>
          Home
        </NavButton>
        <NavButton href="/notes" active={router.pathname == "/notes"}>
          Notes
        </NavButton>
        <NavButton href="/users" active={router.pathname == "/users"}>
          Users
        </NavButton>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-teal-200 hover:border-teal-200">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        <NavActionComponent />
      </div>
    </nav>
  );
};
