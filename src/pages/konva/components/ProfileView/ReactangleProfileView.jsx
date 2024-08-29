import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const baseLength = 2400;

const KonvaRectangleProfileView = ({
  selectedLength,
  selectedWidth,
  handleNextStep,
  handlePreviousStep,
}) => {
  const [activeBar, setActiveBar] = useState(0);

  const barWidth = 30;
  const barHeight = 10;

  const numBarsLength = Math.ceil(selectedLength / baseLength);
  const numBarsWidth = Math.ceil(selectedWidth / baseLength);

  const stageWidth = window.innerWidth * 0.8;
  const stageHeight = window.innerHeight * 0.8;

  const totalWidth = stageWidth * 0.8;
  const totalHeight = stageHeight * 0.8;

  const scaledLength = (selectedLength / baseLength) * totalWidth;
  const scaledWidth = (selectedWidth / baseLength) * totalHeight;

  const generateBars = () => {
    const bars = [];
    let currentIndex = 0;

    // Top horizontal bars
    for (let i = 0; i < numBarsLength; i++) {
      const width =
        i === numBarsLength - 1 ? scaledLength % totalWidth : totalWidth;
      const x = i * width;
      const y = 0;

      bars.push(
        <Rect
          key={`top-bar-${i}`}
          x={x}
          y={y}
          width={width}
          height={barHeight}
          fill={currentIndex === activeBar ? "orange" : "#fff"}
          stroke="#333"
          strokeWidth={1}
          onClick={() => setActiveBar(currentIndex)}
        />
      );
      bars.push(
        <Text
          key={`top-bar-text-${i}`}
          text={`${currentIndex + 1}`}
          x={x + width / 2 - 5}
          y={y + barHeight / 2 - 5}
          fontSize={14}
          fill="#333"
        />
      );
      currentIndex++;
    }

    // Right vertical bars
    for (let i = 0; i < numBarsWidth; i++) {
      const height =
        i === numBarsWidth - 1 ? scaledWidth % totalHeight : totalHeight;
      const x = totalWidth - barWidth;
      const y = i * height;

      bars.push(
        <Rect
          key={`right-bar-${i}`}
          x={x}
          y={y}
          width={barWidth}
          height={height}
          fill={currentIndex === activeBar ? "orange" : "#fff"}
          stroke="#333"
          strokeWidth={1}
          onClick={() => setActiveBar(currentIndex)}
        />
      );
      bars.push(
        <Text
          key={`right-bar-text-${i}`}
          text={`${currentIndex + 1}`}
          x={x + barWidth / 2 - 5}
          y={y + height / 2 - 5}
          fontSize={14}
          fill="#333"
        />
      );
      currentIndex++;
    }

    // Bottom horizontal bars
    for (let i = 0; i < numBarsLength; i++) {
      const width =
        i === numBarsLength - 1 ? scaledLength % totalWidth : totalWidth;
      const x = totalWidth - (i + 1) * width;
      const y = totalHeight - barHeight;

      bars.push(
        <Rect
          key={`bottom-bar-${i}`}
          x={x}
          y={y}
          width={width}
          height={barHeight}
          fill={currentIndex === activeBar ? "orange" : "#fff"}
          stroke="#333"
          strokeWidth={1}
          onClick={() => setActiveBar(currentIndex)}
        />
      );
      bars.push(
        <Text
          key={`bottom-bar-text-${i}`}
          text={`${currentIndex + 1}`}
          x={x + width / 2 - 5}
          y={y + barHeight / 2 - 5}
          fontSize={14}
          fill="#333"
        />
      );
      currentIndex++;
    }

    // Left vertical bars
    for (let i = 0; i < numBarsWidth; i++) {
      const height =
        i === numBarsWidth - 1 ? scaledWidth % totalHeight : totalHeight;
      const x = 0;
      const y = totalHeight - (i + 1) * height;

      bars.push(
        <Rect
          key={`left-bar-${i}`}
          x={x}
          y={y}
          width={barWidth}
          height={height}
          fill={currentIndex === activeBar ? "orange" : "#fff"}
          stroke="#333"
          strokeWidth={1}
          onClick={() => setActiveBar(currentIndex)}
        />
      );
      bars.push(
        <Text
          key={`left-bar-text-${i}`}
          text={`${currentIndex + 1}`}
          x={x + barWidth / 2 - 5}
          y={y + height / 2 - 5}
          fontSize={14}
          fill="#333"
        />
      );
      currentIndex++;
    }

    return bars;
  };

  return (
    <div className="flex h-[95vh]">
      <div className="w-[300px] flex flex-col items-center border-r border-r-gray-300 shadow-lg">
        {[...Array((numBarsLength + numBarsWidth) * 2)].map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveBar(index)}
            className={`p-2 text-center cursor-pointer ${
              index === activeBar ? "bg-gray-200" : ""
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>{generateBars()}</Layer>
        </Stage>
        <div className="flex gap-6 mt-4">
          <button
            onClick={handlePreviousStep}
            className="px-4 py-2 bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={handleNextStep}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonvaRectangleProfileView;
