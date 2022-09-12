import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="flex flex-col mx-auto">{children}</div>;
};
