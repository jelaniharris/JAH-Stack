import React from "react";
import Spinner from "./spinner";

type LoadingButtonProps = {
  loading: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  btnColor = "primary",
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={`btn btn-${btnColor} ${loading ? "btn-loading" : ""}`}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-slate-500">Loading...</span>
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};
