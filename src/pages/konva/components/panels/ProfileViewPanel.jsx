import React from "react";
import LineProfielView from "../ProfileView/LineProfielView";
import LProfileView from "../ProfileView/LProfileView";
import KonvaRectangleProfileView from "../ProfileView/ReactangleProfileView";

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
          <KonvaRectangleProfileView
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
