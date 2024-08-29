import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Group } from "react-konva";

const initialShapes = [
  {
    id: "shape1",
    x: 150,
    y: 150,
    width: 200,
    height: 20,
    type: "Bar",
    connections: { left: null, right: null },
    shapesAllowed: ["LConnectorUp", "LConnectorDown", "Bar"],
  },
];

const KonvaNewStart = () => {
  const [shapes, setShapes] = useState(initialShapes);
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

  const handlePlusClick = (shapeId, end) => {
    setSelectedEnd({ shapeId, end });
  };

  const handleShapeSelect = (shapeType) => {
    if (!selectedEnd) return;

    const { shapeId, end } = selectedEnd;
    const shape = shapes.find((shape) => shape.id === shapeId);
    if (!shape) return;

    let newShape = null;

    if (shapeType === "Bar") {
      // Creating Bar shape logic remains unchanged
      const newShapeX = end === "left" ? shape.x - 100 : shape.x + shape.width;
      const newShapeY = shape.y;
      newShape = {
        id: `shape${shapes.length + 1}`,
        x: newShapeX,
        y: newShapeY,
        width: 100,
        height: 20,
        type: "Bar",
        connections: {
          left: end === "right" ? shape.id : null,
          right: end === "left" ? shape.id : null,
        },
        shapesAllowed: ["LConnectorUp", "LConnectorDown", "Bar"],
      };
    } else if (shapeType === "LConnectorDown" || shapeType === "LConnectorUp") {
      const isDown = shapeType === "LConnectorDown";
      const newShapeX = end === "left" ? shape.x - 20 : shape.x + shape.width;
      const newShapeY = shape.y;
      const horizontalPartWidth = 20;
      const verticalPartHeight = 100;
      const verticalY = isDown
        ? shape.y + shape.height
        : shape.y - verticalPartHeight;

      newShape = {
        id: `shape${shapes.length + 1}`,
        x: newShapeX,
        y: newShapeY,
        width: horizontalPartWidth,
        height: shape.height,
        type: shapeType,
        connections: {
          // Only one open end
          [isDown ? "bottom" : "top"]: null, // Open end on vertical part
        },
        shapesAllowed: ["vBar"],
        components: [
          {
            x: newShapeX,
            y: newShapeY,
            width: horizontalPartWidth,
            height: shape.height,
          }, // Horizontal part
          {
            x: newShapeX,
            y: verticalY,
            width: horizontalPartWidth,
            height: verticalPartHeight,
          }, // Vertical part
        ],
      };
    } else if (
      shapeType === "LConnectorLeft" ||
      shapeType === "LConnectorRight"
    ) {
      const isRight = shapeType === "LConnectorRight";
      const newShapeX = shape.x;
      const newShapeY = end === "top" ? shape.y - 20 : shape.y + shape.height;
      const verticalPartHeight = 20;
      const horizontalPartWidth = 100;
      const horizontalX = isRight
        ? shape.x + shape.width
        : shape.x - horizontalPartWidth;

      newShape = {
        id: `shape${shapes.length + 1}`,
        x: newShapeX,
        y: newShapeY,
        width: shape.width,
        height: verticalPartHeight,
        type: shapeType,
        connections: {
          [isRight ? "right" : "left"]: null, // Open end on horizontal part
        },
        shapesAllowed: ["Bar"],
        components: [
          {
            x: newShapeX,
            y: newShapeY,
            width: shape.width,
            height: verticalPartHeight,
          }, // Vertical part
          {
            x: horizontalX,
            y: newShapeY,
            width: horizontalPartWidth,
            height: verticalPartHeight,
          }, // Horizontal part
        ],
      };
    } else if (shapeType === "vBar") {
      // Vertical Bar logic
      const newShapeX = shape.x;
      const newShapeY = end === "top" ? shape.y - 100 : shape.y + shape.height;
      newShape = {
        id: `shape${shapes.length + 1}`,
        x: newShapeX,
        y: newShapeY,
        width: 20,
        height: 100,
        type: "vBar",
        connections: {
          top: end === "bottom" ? shape.id : null,
          bottom: end === "top" ? shape.id : null,
        },
        shapesAllowed: ["LConnectorLeft", "LConnectorRight", "vBar"], // No further shapes for now
      };
    }

    if (newShape) {
      setShapes((prevShapes) => {
        const updatedShapes = prevShapes.map((s) => {
          if (s.id === shapeId) {
            return {
              ...s,
              connections: { ...s.connections, [end]: newShape.id },
            };
          }
          return s;
        });
        return [...updatedShapes, newShape];
      });

      setSelectedEnd(null);
    }
  };

  // Render shapes and dynamically calculate positions for plus buttons
  // Render shapes and dynamically calculate positions for plus buttons
  const renderShapesAndButtons = () => (
    <Group draggable>
      {shapes.map((shape) => (
        <React.Fragment key={shape.id}>
          {shape.components ? (
            shape.components.map((component, index) => (
              <Rect
                key={index}
                x={component.x}
                y={component.y}
                width={component.width}
                height={component.height}
                fill="lightgrey"
                stroke="black"
                strokeWidth={2}
              />
            ))
          ) : (
            <Rect
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill="lightgrey"
              stroke="black"
              strokeWidth={2}
            />
          )}
          {Object.entries(shape.connections).map(([end, connection]) => {
            if (connection !== null) return null; // Button only for open ends

            // Button position logic for each shape type
            let plusX = shape.x;
            let plusY = shape.y;

            if (shape.type === "Bar") {
              plusX =
                end === "left"
                  ? shape.x - 15
                  : end === "right"
                  ? shape.x + shape.width + 15
                  : shape.x + shape.width / 2;
              plusY =
                end === "top"
                  ? shape.y - 15
                  : end === "bottom"
                  ? shape.y + shape.height + 15
                  : shape.y + shape.height / 2;
            } else if (
              shape.type === "LConnectorUp" ||
              shape.type === "LConnectorDown"
            ) {
              const verticalEndY =
                shape.type === "LConnectorUp"
                  ? shape.y - 15 // Top end open
                  : shape.y + shape.components[1].height + 15; // Bottom end open

              plusX = shape.x + shape.components[0].width / 2; // Horizontal center
              plusY = end === "top" ? verticalEndY : shape.y + shape.height / 2; // Place button correctly
            } else if (
              shape.type === "LConnectorLeft" ||
              shape.type === "LConnectorRight"
            ) {
              const horizontalEndX =
                shape.type === "LConnectorLeft"
                  ? shape.x - 15 // Left end open
                  : shape.x + shape.components[1].width + 15; // Right end open

              plusX =
                end === "left" ? horizontalEndX : shape.x + shape.width / 2;
              plusY = shape.y + shape.components[0].height / 2; // Vertical center
            } else if (shape.type === "vBar") {
              plusX = shape.x + shape.width / 2; // Center horizontally
              plusY =
                end === "top" ? shape.y - 15 : shape.y + shape.height + 15;
            }

            return (
              <Circle
                key={`${shape.id}-${end}`}
                x={plusX}
                y={plusY}
                radius={10}
                fill="green"
                onClick={() => handlePlusClick(shape.id, end)}
              />
            );
          })}
        </React.Fragment>
      ))}
    </Group>
  );

  const currentlySelectedShape = shapes.find(
    (item) => item?.id === selectedEnd?.shapeId
  );

  return (
    <div>
      {currentlySelectedShape &&
        currentlySelectedShape?.shapesAllowed.length > 0 && (
          <div className="flex gap-2 bg-gray-300">
            {currentlySelectedShape?.shapesAllowed?.map((shape, index) => (
              <button
                key={index}
                onClick={() => handleShapeSelect(shape)}
                className="mx-2"
              >
                {shape}
              </button>
            ))}
          </div>
        )}
      <Stage width={canvasSize.width} height={canvasSize.height}>
        <Layer>{renderShapesAndButtons()}</Layer>
      </Stage>
    </div>
  );
};

export default KonvaNewStart;
