import React, { useState } from "react";
import ProfileCard from "../cards/ProfileCard";
import Button from "../Button";

const baseLength = 2100;
const barWidth = 80;
const barHeight = 3;
const barSpacing = 0;
const paddingTop = 20;

const generateBars = (numBarsLength, numBarsWidth, activeBar, setActiveBar) => {
  const bars = [];

  for (let i = 0; i < numBarsWidth; i++) {
    const x = 0;
    const y = paddingTop + i * (barWidth + barSpacing);
    const isActive = i === activeBar;

    bars.push(
      <g
        key={`width-${i}`}
        onClick={() => setActiveBar(i)}
        style={{ cursor: "pointer" }}
      >
        <polygon
          points={`0,0 ${barHeight},0 ${barHeight},${barWidth} 0,${barWidth}`}
          stroke={isActive ? "orange" : "#333"}
          strokeWidth="0.5"
          fill={isActive ? "orange" : "#fff"}
          transform={`translate(${x}, ${y})`}
        />
        <text
          x={x - 10}
          y={y + barWidth / 2}
          fontSize="4"
          textAnchor="middle"
          fill="#333"
        >
          {i + 1}
        </text>
      </g>
    );
  }

  for (let i = 0; i < numBarsLength; i++) {
    const x = i * (barWidth + barSpacing);
    const y = paddingTop + numBarsWidth * (barWidth + barSpacing);
    const isActive = i + numBarsWidth === activeBar;

    bars.push(
      <g
        key={`length-${i}`}
        onClick={() => setActiveBar(i + numBarsWidth)}
        style={{ cursor: "pointer" }}
      >
        <polygon
          points={`0,0 ${barWidth},0 ${barWidth},${barHeight} 0,${barHeight}`}
          stroke={isActive ? "orange" : "#333"}
          strokeWidth="0.5"
          fill={isActive ? "orange" : "#fff"}
          transform={`translate(${x}, ${y})`}
        />
        <text
          x={x + barWidth / 2}
          y={y + barHeight + 10}
          fontSize="4"
          textAnchor="middle"
          fill="#333"
        >
          {i + 1 + numBarsWidth}
        </text>
      </g>
    );
  }

  return bars;
};

const generateArrows = (
  totalWidth,
  totalHeight,
  selectedLength,
  selectedWidth,
  numBarsWidth
) => {
  return (
    <>
      <g>
        <line
          x1="0"
          y1="10"
          x2={totalWidth}
          y2="10"
          stroke="#333"
          strokeWidth="0.5"
          markerEnd="url(#arrowhead-right)"
          markerStart="url(#arrowhead-left)"
        />
        <text
          x={totalWidth / 2}
          y="5"
          fontSize="4"
          textAnchor="middle"
          fill="#333"
        >
          {`Length: ${selectedLength}mm`}
        </text>
      </g>

      <g>
        <line
          x1={totalWidth + 5}
          y1={paddingTop}
          x2={totalWidth + 5}
          y2={paddingTop + numBarsWidth * (barWidth + barSpacing)}
          stroke="#333"
          strokeWidth="0.5"
          markerEnd="url(#arrowhead-down)"
          markerStart="url(#arrowhead-up)"
        />
        <text
          x={totalWidth + 10}
          y={(paddingTop + numBarsWidth * (barWidth + barSpacing)) / 2}
          fontSize="4"
          textAnchor="middle"
          fill="#333"
          transform={`rotate(-90, ${totalWidth + 10}, ${
            (paddingTop + numBarsWidth * (barWidth + barSpacing)) / 2
          })`}
        >
          {`Width: ${selectedWidth}mm`}
        </text>
      </g>
    </>
  );
};

export default function LProfileView({
  selectedLength,
  selectedWidth,
  handleNextStep,
  handlePreviousStep,
}) {
  const [activeBar, setActiveBar] = useState(0);

  const numBarsLength = Math.ceil(selectedLength / baseLength);
  const numBarsWidth = Math.ceil(selectedWidth / baseLength);
  const totalWidth = numBarsLength * (barWidth + barSpacing);
  const totalHeight =
    paddingTop + numBarsWidth * (barWidth + barSpacing) + barWidth;

  return (
    <div className="flex h-[95vh]">
      <div className="w-[300px] flex flex-col items-center border-r border-r-gray-300 shadow-lg">
        {[...Array(numBarsLength + numBarsWidth)].map((_, index) => (
          <ProfileCard
            key={index}
            index={index + 1}
            isActive={index === activeBar}
            onClick={() => setActiveBar(index)}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <svg
          className="visualization"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${totalWidth + 20} ${totalHeight + 20}`}
          aria-labelledby="Name"
          role="presentation"
          style={{ width: "80%", height: "80%" }}
        >
          <defs>
            <marker
              id="arrowhead-right"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
            </marker>

            <marker
              id="arrowhead-left"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="10 0, 0 3.5, 10 7" fill="#333" />
            </marker>

            <marker
              id="arrowhead-up"
              markerWidth="7"
              markerHeight="10"
              refX="3.5"
              refY="0"
              orient="auto"
            >
              <polygon points="0 10, 3.5 0, 7 10" fill="#333" />
            </marker>

            <marker
              id="arrowhead-down"
              markerWidth="7"
              markerHeight="10"
              refX="3.5"
              refY="10"
              orient="auto"
            >
              <polygon points="0 0, 3.5 10, 7 0" fill="#333" />
            </marker>
          </defs>

          {generateBars(numBarsLength, numBarsWidth, activeBar, setActiveBar)}
          {generateArrows(
            totalWidth,
            totalHeight,
            selectedLength,
            selectedWidth,
            numBarsWidth
          )}
        </svg>

        <div className="flex gap-6 mt-4">
          <Button variant="secondary" onClick={handlePreviousStep}>
            Return
          </Button>
          <Button onClick={handleNextStep}>Next Step</Button>
        </div>
      </div>
    </div>
  );
}
