import React from "react";
import classNames from "classnames";
import { RightIcon } from "../icons/icons";
import Dot from "./Dot";

export default function StepView({
  stepCount,
  activeStep,
  label,
  isLast = false,
}) {
  function applyLabelColor() {
    if (activeStep < stepCount) {
      return "text-gray-400";
    }
    if (activeStep === stepCount) {
      return "text-black";
    }
    if (activeStep > stepCount) {
      return "text-black/75";
    }
  }
  return (
    <div>
      <div className="flex gap-4 items-center">
        {activeStep < stepCount && (
          <div className={classNames("w-3 h-3 rounded-full bg-gray-200")}></div>
        )}

        {activeStep === stepCount && (
          <div
            className={classNames("w-3 h-3 rounded-full bg-orange-500")}
          ></div>
        )}

        {activeStep > stepCount && (
          <div>
            <RightIcon />
          </div>
        )}

        <p className={classNames("text-sm", applyLabelColor())}>{label}</p>
      </div>

      {/* dots to separte */}
      {!isLast && (
        <div className="flex flex-col gap-[3px] mt-1 mb-1 ml-1">
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
        </div>
      )}
    </div>
  );
}
