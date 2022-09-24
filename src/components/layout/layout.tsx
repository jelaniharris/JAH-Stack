import React from "react";
import { ToastContainer } from "react-toastify";
import { NavBar } from "../navigation/navBar";
import "react-toastify/dist/ReactToastify.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="container mx-auto px-4 py-2">{children}</div>
    </>
  );
};

export default Layout;
