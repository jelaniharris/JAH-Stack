import React from "react";

type PanelContainerProps = {
  children: React.ReactNode;
  actionPanel?: React.ReactNode;
};

export const PanelContainer = ({
  children,
  actionPanel,
}: PanelContainerProps) => {
  if (actionPanel) {
    return (
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="flex flex-col mx-autospace-y-6 bg-white px-4 py-5 sm:p-6">
          {children}
        </div>
        <div className="bg-gray-100 px-4 py-3 text-right sm:px-6">
          {actionPanel}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col max-w-sm mx-auto p-6 rounded-xl bg-white">
        {children}
      </div>
    );
  }
};
