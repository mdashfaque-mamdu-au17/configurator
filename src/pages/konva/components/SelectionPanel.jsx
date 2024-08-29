import React from "react";
import StartPanel from "./panels/StartPanel";
import LayoutSelectionPanel from "./panels/LayoutSelectionPanel";
import ProfileViewPanel from "./panels/ProfileViewPanel";
import LiveEndPanel from "./panels/LiveEndPanel";

export default function SelectionPanel({
  handleNextStep,
  handlePreviousStep,
  activeStep,
  onLayoutSelect,
  onLengthSelect,
  onWidthSelect,
  selectedLength,
  selectedWidth,
  selectedLayout,
}) {
  return (
    <div className="w-5/6 h-full bg-gray-100">
      {activeStep === 0 && <StartPanel handleNextStep={handleNextStep} />}
      {activeStep === 1 && (
        <LayoutSelectionPanel
          onLayoutSelect={onLayoutSelect}
          onLengthSelect={onLengthSelect}
          onWidthSelect={onWidthSelect}
          selectedLength={selectedLength}
          selectedWidth={selectedWidth}
          selectedLayout={selectedLayout}
          handleNextStep={handleNextStep}
        />
      )}
      {activeStep === 2 && (
        <ProfileViewPanel
          selectedLayout={selectedLayout}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          selectedLength={selectedLength}
          selectedWidth={selectedWidth}
        />
      )}
      {activeStep === 3 && <LiveEndPanel />}
    </div>
  );
}
