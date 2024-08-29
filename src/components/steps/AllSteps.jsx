import React from "react";
import StepView from "./StepView";

export default function AllSteps({ activeStep }) {
  return (
    <div>
      <StepView stepCount={1} activeStep={activeStep} label="Layout" />
      <StepView stepCount={2} activeStep={activeStep} label="Profile" />
      <StepView stepCount={3} activeStep={activeStep} label="Live end" isLast />
    </div>
  );
}
