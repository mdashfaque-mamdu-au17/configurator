import React from "react";
import Button from "../Button";

export default function StartPanel({ handleNextStep }) {
  return (
    <div className="h-full flex items-center px-20">
      <div className="w-[650px]">
        <h2 className="text-3xl text-black font-bold">
          Invia 48V configurator
        </h2>

        <p className="text-sm text-black/75 mt-6 mb-6">
          The modular light structure for your linear lighting tasks. Plan your
          layout as a line, L-shape or rectangle with individual light
          distribution.
        </p>

        <Button onClick={handleNextStep}>Start Configuration</Button>
      </div>
    </div>
  );
}
