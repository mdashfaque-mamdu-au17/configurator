import React, { useState } from "react";
import ProfileCard from "../cards/ProfileCard";
import Button from "../Button";

const baseLength = 1800; // Base length for one bar
const barWidth = 80; // Width of each bar in pixels
const barHeight = 3; // Height of each bar in pixels
const barSpacing = 0; // Spacing between bars

const generateBars = (numBars, activeBar, setActiveBar) => {
  const bars = [];

  for (let i = 0; i < numBars; i++) {
    const x = i * (barWidth + barSpacing);
    const isActive = i === activeBar;

    bars.push(
      <g key={i} onClick={() => setActiveBar(i)} style={{ cursor: "pointer" }}>
        {/* Bar */}
        <polygon
          points={`0,0 ${barWidth},0 ${barWidth},${barHeight} 0,${barHeight}`}
          stroke={isActive ? "orange" : "#333"}
          strokeWidth="0.5"
          fill={isActive ? "orange" : "#fff"}
          transform={`translate(${x}, 0)`}
        />
        {/* Indexing text */}
        <text
          x={x + barWidth / 2} // Center the text horizontally
          y={-3} // Position the text just above the bar
          fontSize="4" // Adjust the font size
          textAnchor="middle"
          fill="#333"
        >
          {i + 1}
        </text>
      </g>
    );
  }

  return bars;
};

export default function LineProfielView({
  selectedLength,
  handleNextStep,
  handlePreviousStep,
}) {
  const [activeBar, setActiveBar] = useState(0); // State to manage active bar
  const numBars = Math.ceil(selectedLength / baseLength);
  const totalWidth = numBars * (barWidth + barSpacing);

  return (
    <div className="flex h-[95vh]">
      {/* Left Section - Profiles */}
      <div className="w-[300px] flex flex-col items-center border-r border-r-gray-300 shadow-lg">
        {[...Array(numBars)].map((_, index) => (
          <ProfileCard
            key={index}
            index={index + 1}
            isActive={index === activeBar}
            onClick={() => setActiveBar(index)} // Update active bar on click
          />
        ))}
      </div>

      {/* Right Section - Bars */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <svg
          className="visualization"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${totalWidth} ${barHeight - 0}`}
          aria-labelledby="Name"
          role="presentation"
          style={{ width: "80%", height: "80%" }}
        >
          {/* Arrow line */}
          <defs>
            <marker
              id="arrow-left"
              markerWidth="5" // Adjust the arrow size
              markerHeight="5"
              refX="2.5"
              refY="2.5"
              orient="auto"
            >
              <path d="M 5 0 L 0 2.5 L 5 5 z" fill="#333" />{" "}
              {/* Left-pointing arrow */}
            </marker>
            <marker
              id="arrow-right"
              markerWidth="5" // Adjust the arrow size
              markerHeight="5"
              refX="2.5"
              refY="2.5"
              orient="auto"
            >
              <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#333" />{" "}
              {/* Right-pointing arrow */}
            </marker>
          </defs>

          {/* Total width text */}
          <text
            x={totalWidth / 2}
            y={barHeight - 25} // Adjusted to be above the arrow
            fontSize="5" // Adjusted font size
            textAnchor="middle"
            fill="#333"
          >
            {selectedLength} mm
          </text>

          <line
            x1="1"
            y1={barHeight - 20} // Adjusted to be below the text
            x2={totalWidth - 1}
            y2={barHeight - 20} // Adjusted to be below the text
            stroke="#333"
            strokeWidth="0.5"
            markerStart="url(#arrow-left)" // Left-pointing arrow
            markerEnd="url(#arrow-right)" // Right-pointing arrow
          />

          {/* Bars */}
          {generateBars(numBars, activeBar, setActiveBar)}
        </svg>

        <div className="flex gap-6">
          <Button variant="secondary" onClick={handlePreviousStep}>
            Return
          </Button>
          <Button onClick={handleNextStep}>Next Step</Button>
        </div>
      </div>
    </div>
  );
}
