import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="block w-full flex-1 rounded-md p-2 text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
