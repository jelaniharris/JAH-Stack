import React from "react";
import Link from "next/link";

type NavButtonType = {
  href: URL | string;
  children: React.ReactNode;
  active?: Boolean;
};

export const NavButton = ({ href, children, active }: NavButtonType) => {
  return (
    <Link href={href}>
      <a
        className={`text-gray-300 ${
          active ? "bg-gray-800" : "hover:bg-gray-600"
        } hover:text-white px-3 py-2 rounded-md text-base font-medium`}
      >
        {children}
      </a>
    </Link>
  );
};
