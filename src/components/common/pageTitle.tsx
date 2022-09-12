import React from "react";

type PageTitleProps = {
  title: string;
};

export const PageTitle = ({ title }: PageTitleProps) => {
  return <h2 className="text-2xl font-bold font-fjalla leading-7">{title}</h2>;
};
