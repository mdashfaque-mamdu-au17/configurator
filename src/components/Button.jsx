import React from "react";
import classNames from "classnames";

export default function Button({
  variant = "primary",
  type = "button",
  children,
  onClick,
  disabled,
}) {
  const applyVariantStyle = () => {
    if (variant === "primary") {
      return "bg-black hover:bg-black/75 text-white border border-black/75";
    }
    if (variant === "secondary") {
      return "bg-inherit border border-black hover:bg-gray-200";
    }
  };
  return (
    <button
      className={classNames(
        "py-2 px-4 text-base",
        applyVariantStyle(),
        disabled && "cursor-not-allowed !opacity-30"
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
