import React, { useEffect } from "react";
import { layoutSelectionData } from "../../utils/data";
import LayoutCard from "../cards/LayoutCard";
import Button from "../Button";

export default function LayoutSelectionPanel({
  onLayoutSelect,
  onLengthSelect,
  onWidthSelect,
  selectedLength,
  selectedWidth,
  selectedLayout,
  handleNextStep,
}) {
  useEffect(() => {
    if (!selectedLayout) {
      onLayoutSelect({
        layoutType: layoutSelectionData[0]?.layoutType,
        lengthOptions: layoutSelectionData[0]?.lengthOptions,
        widthOptions: layoutSelectionData[0]?.widthOptions,
        selectedLength: null,
        selectedWidth: null,
      });
    }
  }, []);
  return (
    <div className="px-6 mt-14">
      <h3 className="text-base text-gray-800/80">Select the right layout: </h3>

      {/* LAYOUT CARDS */}
      <div className="mt-6 flex gap-5">
        {layoutSelectionData.map((item, index) => {
          const { id, layoutType, lengthOptions, widthOptions } = item;
          return (
            <LayoutCard
              key={item?.id}
              id={id}
              layoutType={layoutType}
              lengthOptions={lengthOptions}
              widthOptions={widthOptions}
              onLayoutSelect={onLayoutSelect}
              isSelected={layoutType === selectedLayout}
              selectedLength={selectedLength}
              selectedWidth={selectedWidth}
              onLengthSelect={onLengthSelect}
              onWidthSelect={onWidthSelect}
            />
          );
        })}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-10">
        {/* <Button variant="secondary">Return</Button> */}
        <Button onClick={handleNextStep}>Next Step</Button>
      </div>
    </div>
  );
}
