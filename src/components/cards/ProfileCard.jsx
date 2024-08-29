import classNames from "classnames";
import React from "react";

export default function ProfileCard({ index, isActive, onClick }) {
  return (
    <div
      className={classNames(
        "py-4 px-4 w-full cursor-pointer",
        isActive ? "border border-orange-400" : "border-b"
      )}
      onClick={onClick}
    >
      <div className="flex gap-2 items-center">
        <div className="h-10 w-10 bg-gray-200"></div>
        <p>Profile {index}</p>
      </div>
    </div>
  );
}
