import classNames from "classnames";
import React, { useState } from "react";
import { LIcon, LineIcon, RectangleIcon } from "../icons/icons";
import Select from "../select/Select";

export default function LayoutCard({
  id,
  layoutType,
  lengthOptions,
  widthOptions,
  onLayoutSelect,
  isSelected,
  selectedLength,
  selectedWidth,
  onLengthSelect,
  onWidthSelect,
}) {
  const [length, setLength] = useState("Please Select");
  const [width, setWidth] = useState("Please Select");

  function getIconBasedOnShape() {
    if (layoutType === "Line") {
      return <LineIcon />;
    } else if (layoutType === "L-shape") {
      return <LIcon />;
    } else if (layoutType === "Rectangle") {
      return <RectangleIcon />;
    }
  }

  function applyBorderStyle() {
    return isSelected
      ? "border-orange-500 border-2"
      : "border-gray-400/75 border";
  }

  const handleCardClick = () => {
    onLayoutSelect({
      layoutType,
      lengthOptions,
      widthOptions,
      selectedLength: length !== "Please Select" ? length : null,
      selectedWidth:
        layoutType !== "Line" && width !== "Please Select" ? width : null,
    });
  };
  const canRenderLengthOptions = lengthOptions?.length > 0;
  const canRenderWidthOptions = widthOptions?.length > 0;

  return (
    <aside
      className={classNames("w-[250px] mb-2", applyBorderStyle())}
      onClick={handleCardClick}
    >
      <div className="w-full h-[236px] bg-white">{getIconBasedOnShape()}</div>
      <div className="w-full h-[236px] bg-gray-300/50 px-4 py-6">
        <p className="text-black/75 text-base">{layoutType}</p>

        {(canRenderLengthOptions || canRenderWidthOptions) && (
          <div className="mt-6 flex flex-col gap-4">
            <div>
              {canRenderLengthOptions && (
                <Select
                  label="Length"
                  options={lengthOptions}
                  selected={selectedLength}
                  onSelect={onLengthSelect}
                  lengthForParent={length}
                  setLengthForParent={setLength}
                />
              )}
            </div>
            <div>
              {canRenderWidthOptions && (
                <Select
                  label="Width"
                  options={widthOptions}
                  selected={selectedWidth}
                  onSelect={onWidthSelect}
                  lengthForParent={width}
                  setLengthForParent={setWidth}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
