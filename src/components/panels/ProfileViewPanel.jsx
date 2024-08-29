import React from "react";
import LineProfielView from "../ProfileView/LineProfielView";
import LProfileView from "../ProfileView/LProfileView";
import ReactangleProfileView from "../ProfileView/ReactangleProfileView";
import RectangleProfileView from "../ProfileView/ReactangleProfileView";

export default function ProfileViewPanel({
  selectedLayout,
  handleNextStep,
  handlePreviousStep,
  selectedLength,
  selectedWidth,
}) {
  return (
    <div>
      <div>
        {selectedLayout === "Line" && (
          <LineProfielView
            selectedLength={selectedLength}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}
        {selectedLayout === "L-shape" && (
          <LProfileView
            selectedLength={selectedLength}
            selectedWidth={selectedWidth}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}
        {selectedLayout === "Rectangle" && (
          <RectangleProfileView
            selectedLength={selectedLength}
            selectedWidth={selectedWidth}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}
      </div>
    </div>
  );
}
