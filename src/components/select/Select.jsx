import React, { useEffect, useState } from "react";

export default function Select({
  label,
  options,
  selected,
  onSelect,
  lengthForParent,
  setLengthForParent,
}) {
  const [localSelected, setLocalSelected] = useState("Please Select");

  const onOptionChangeHandler = (event) => {
    const value = event.target.value;
    // Check for the default option to skip state update
    if (value !== "Please Select") {
      setLocalSelected(value);
      setLengthForParent(value);
      onSelect(value);
    }
  };

  return (
    <div className="">
      <p className="mb-1 text-black/75 text-sm">{label}</p>
      <select
        onChange={onOptionChangeHandler}
        value={localSelected}
        className="w-full bg-white py-2 px-2 border border-black/30 focus:border-black outline-none"
        aria-label={label}
      >
        <option value="Please Select">Please Select</option>
        {options.map((option, index) => {
          return (
            <option
              key={index}
              value={option}
              className="text-black/75 text-base"
            >
              {option} mm
            </option>
          );
        })}
      </select>
    </div>
  );
}
