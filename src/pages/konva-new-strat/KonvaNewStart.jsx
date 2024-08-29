import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";

// Initial bar configuration
const initialBars = [
  {
    id: "bar1",
    x: 150,
    y: 150,
    width: 200,
    height: 20,
  },
];

const KonvaNewStart = () => {
  const [bars, setBars] = useState(initialBars);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlusClick = (barId, end) => {
    setSelectedEnd({ barId, end });
  };

  const handleShapeSelect = (shapeType, length = 100) => {
    if (!selectedEnd) return;

    const { barId, end } = selectedEnd;
    const bar = bars.find((bar) => bar.id === barId);
    let newBar = null;

    if (shapeType === "Bar") {
      const newBarX = end === "left" ? bar.x - length : bar.x + bar.width;
      const newBarY = bar.y;
      newBar = {
        id: `bar${bars.length + 1}`,
        x: newBarX,
        y: newBarY,
        width: length,
        height: 20,
      };
    }

    if (newBar) {
      setBars((prevBars) => [...prevBars, newBar]);
      setSelectedEnd(null);
    }
  };

  const getBoundingBox = () => {
    if (bars.length === 0) return { left: 0, right: 0 };

    const leftmost = Math.min(...bars.map((bar) => bar.x));
    const rightmost = Math.max(...bars.map((bar) => bar.x + bar.width));

    return { left: leftmost, right: rightmost };
  };

  const renderBars = () =>
    bars.map((bar) => (
      <Rect
        key={bar.id}
        x={bar.x}
        y={bar.y}
        width={bar.width}
        height={bar.height}
        fill="lightgrey"
        stroke="black"
        strokeWidth={2}
      />
    ));

  const renderPlusButtons = () => {
    const { left, right } = getBoundingBox();

    return (
      <>
        <Circle
          x={left - 15}
          y={bars[0].y + bars[0].height / 2}
          radius={10}
          fill="green"
          onClick={() => handlePlusClick(bars[0].id, "left")}
        />
        <Circle
          x={right + 15}
          y={bars[0].y + bars[0].height / 2}
          radius={10}
          fill="green"
          onClick={() => handlePlusClick(bars[0].id, "right")}
        />
      </>
    );
  };

  return (
    <div>
      {selectedEnd && (
        <div style={{ marginBottom: "10px" }}>
          <button onClick={() => handleShapeSelect("Bar", 100)}>Add Bar</button>
        </div>
      )}

      <Stage width={canvasSize.width} height={canvasSize.height}>
        <Layer>
          {renderBars()}
          {renderPlusButtons()}
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaNewStart;
