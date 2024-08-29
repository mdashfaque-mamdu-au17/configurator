import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer, Group } from "react-konva";

const initialBar = {
  id: "bar1",
  type: "Bar",
  x: 0,
  y: 0,
  width: 100,
  height: 20,
  stroke: "black",
  strokeWidth: 2,
};

const createLShape = (type, id, x, y) => {
  if (type === "L-Regular") {
    return {
      id,
      type,
      x,
      y,
      shapes: [
        { x: 0, y: 0, width: 100, height: 20 },
        { x: 80, y: 0, width: 20, height: 100 },
      ],
    };
  } else if (type === "L-Rectangle") {
    return {
      id,
      type,
      x,
      y,
      shapes: [
        { x: 0, y: 0, width: 100, height: 20 },
        { x: 0, y: 20, width: 20, height: 100 },
      ],
    };
  }
  return null;
};

const ShapeEditor = () => {
  const [shapes, setShapes] = useState([initialBar]);
  const [selectedId, setSelectedId] = useState(null);
  const [leftmost, setLeftmost] = useState(0);
  const [rightmost, setRightmost] = useState(100); // Width of the initial bar

  const layerRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (selectedId) {
      const stage = layerRef.current.getStage();
      const selectedNode = stage.findOne(`#${selectedId}`);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  const addShape = (type, position) => {
    let newShape;
    if (type === "Bar") {
      newShape = {
        id: `bar${shapes.length + 1}`,
        type: "Bar",
        x: position === "left" ? leftmost - 100 : rightmost,
        y: 0,
        width: 100,
        height: 20,
        stroke: "black",
        strokeWidth: 2,
      };
    } else if (type.startsWith("L-")) {
      newShape = createLShape(
        type,
        `${type}${shapes.length + 1}`,
        position === "left" ? leftmost - 100 : rightmost,
        0
      );
    }

    if (newShape) {
      setShapes((prevShapes) => [...prevShapes, newShape]);

      // Update the leftmost and rightmost positions
      if (position === "left") {
        setLeftmost(leftmost - 100); // Adjust by the width of a new shape
      } else {
        setRightmost(rightmost + 100);
      }
    }
  };

  const handleSelect = (e) => {
    const id = e.target.name();
    setSelectedId(id);
  };

  const renderShapes = () =>
    shapes.map((shape) => {
      if (shape.type === "Bar") {
        return (
          <Rect
            key={shape.id}
            id={shape.id}
            name={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            draggable={false}
            onClick={handleSelect}
            onTap={handleSelect}
          />
        );
      } else if (shape.type.startsWith("L-")) {
        return (
          <Group
            key={shape.id}
            id={shape.id}
            name={shape.id}
            x={shape.x}
            y={shape.y}
            draggable={false}
            onClick={handleSelect}
            onTap={handleSelect}
          >
            {shape.shapes.map((part, i) => (
              <Rect
                key={i}
                x={part.x}
                y={part.y}
                width={part.width}
                height={part.height}
                stroke="black"
                strokeWidth={2}
                rotation={part.rotation || 0}
              />
            ))}
          </Group>
        );
      }
      return null;
    });

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => addShape("Bar", "left")}
          style={{ marginRight: "10px" }}
        >
          Add Bar to Left
        </button>
        <button
          onClick={() => addShape("Bar", "right")}
          style={{ marginRight: "10px" }}
        >
          Add Bar to Right
        </button>
        <button
          onClick={() => addShape("L-Regular", "left")}
          style={{ marginRight: "10px" }}
        >
          Add L-Regular to Left
        </button>
        <button
          onClick={() => addShape("L-Regular", "right")}
          style={{ marginRight: "10px" }}
        >
          Add L-Regular to Right
        </button>
        <button
          onClick={() => addShape("L-Rectangle", "left")}
          style={{ marginRight: "10px" }}
        >
          Add L-Rectangle to Left
        </button>
        <button
          onClick={() => addShape("L-Rectangle", "right")}
          style={{ marginRight: "10px" }}
        >
          Add L-Rectangle to Right
        </button>
      </div>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layerRef}>
          <Group draggable>{renderShapes()}</Group>
          {selectedId && <Transformer ref={trRef} />}
        </Layer>
      </Stage>
    </div>
  );
};

export default ShapeEditor;
