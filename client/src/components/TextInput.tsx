import React, { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  placeholder?: string;
  className?: string;
  value: string;
  setValue: (value: string) => void;
  labelClassName?: string;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  className = "",
  value,
  setValue,
  labelClassName = "",
  type = "text",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
      <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="text-black p-3 border border-gray-400 border-solid rounded placeholder-gray-500"
        id={label}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
