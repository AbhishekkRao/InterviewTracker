import React, { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  setValue,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="textInputDiv flex flex-col space-y-2 w-full">
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type="password"
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
