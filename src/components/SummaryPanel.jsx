import React from "react";
import AllSteps from "./steps/AllSteps";

export default function SummaryPanel({ activeStep }) {
  return (
    <div className="w-1/6 p-6 overflow-y-auto shadow-lg">
      <div>
        <p className="text-sm text-gray-600">
          Plan your layout as a line, L-shape or rectangle with individual light
          distribution.
        </p>
      </div>

      {/* Summary Steps */}
      <div className="mt-6">
        <AllSteps activeStep={activeStep} />
      </div>
    </div>
  );
}
