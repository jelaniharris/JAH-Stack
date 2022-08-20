import React from "react";

type PanelContainerProps = {
  children: React.ReactNode;
};

export const PanelContainer = ({ children }: PanelContainerProps) => {
  return (
    <div className="flex flex-col max-w-sm mx-auto p-6 rounded-xl bg-white">
      {children}
    </div>
  );
};
