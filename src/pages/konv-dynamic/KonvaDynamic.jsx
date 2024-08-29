import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer, Group } from "react-konva";

// Helper function to create connectors (like L, X, Y)
const createConnector = (type, id, x, y) => {
  switch (type) {
    case "L":
      return {
        id,
        type: "L",
        x,
        y,
        shapes: [
          { x: 0, y: 0, width: 100, height: 20 },
          { x: 80, y: 0, width: 20, height: 100 },
        ],
      };
    case "X":
      return {
        id,
        type: "X",
        x,
        y,
        shapes: [
          { x: 0, y: 0, width: 100, height: 20 },
          { x: 40, y: -40, width: 20, height: 100 },
        ],
      };
    case "Y":
      return {
        id,
        type: "Y",
        x,
        y,
        shapes: [
          { x: 40, y: 0, width: 20, height: 80 }, // Vertical stem
          { x: -10, y: 40, width: 60, height: 20, rotation: 45 }, // Left arm
          { x: -10, y: 40, width: 60, height: 20, rotation: -45 }, // Right arm
        ],
      };
    case "VerticalBar":
      return {
        id,
        type: "VerticalBar",
        x,
        y,
        shapes: [{ x: 0, y: 0, width: 20, height: 100 }],
      };
    default:
      return null;
  }
};

const KonvaDynamic = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
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

  const addBar = () => {
    const newShape = {
      id: `bar${shapes.length + 1}`,
      type: "Bar",
      x: 50,
      y: 60,
      width: 100,
      height: 20,
      stroke: "black",
      strokeWidth: 2,
    };
    setShapes([...shapes, newShape]);
  };

  const addConnector = (type) => {
    const newConnector = createConnector(
      type,
      `${type}${shapes.length + 1}`,
      150,
      150
    );
    if (newConnector) {
      setShapes([...shapes, newConnector]);
    }
  };

  const handleSelect = (e) => {
    const id = e.target.name();
    setSelectedId(id);
  };

  const handleDragMove = (e, id) => {
    const { x, y } = e.target.position();
    const updatedShapes = shapes.map((shape) =>
      shape.id === id ? { ...shape, x, y } : shape
    );
    setShapes(updatedShapes);
  };

  const handleTransform = (e, id) => {
    const node = e.target;
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return {
          ...shape,
          x: node.x(),
          y: node.y(),
          width: node.width() * node.scaleX(),
          height: node.height() * node.scaleY(),
          rotation: node.rotation(),
        };
      }
      return shape;
    });
    setShapes(updatedShapes);
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
            draggable
            onClick={handleSelect}
            onTap={handleSelect}
            onDragMove={(e) => handleDragMove(e, shape.id)}
            onTransformEnd={(e) => handleTransform(e, shape.id)}
          />
        );
      } else if (
        shape.type === "L" ||
        shape.type === "X" ||
        shape.type === "Y" ||
        shape.type === "VerticalBar"
      ) {
        return (
          <Group
            key={shape.id}
            id={shape.id}
            name={shape.id}
            x={shape.x}
            y={shape.y}
            draggable
            onClick={handleSelect}
            onTap={handleSelect}
            onDragMove={(e) => handleDragMove(e, shape.id)}
            onTransformEnd={(e) => handleTransform(e, shape.id)}
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
        <button onClick={addBar} style={{ marginRight: "10px" }}>
          Add Bar
        </button>
        <button
          onClick={() => addConnector("L")}
          style={{ marginRight: "10px" }}
        >
          Add L Connector
        </button>
        <button
          onClick={() => addConnector("Y")}
          style={{ marginRight: "10px" }}
        >
          Add Y Connector
        </button>
        <button
          onClick={() => addConnector("X")}
          style={{ marginRight: "10px" }}
        >
          Add X Connector
        </button>
        <button
          onClick={() => addConnector("VerticalBar")}
          style={{ marginRight: "10px" }}
        >
          Add Vertical Bar
        </button>
      </div>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layerRef}>
          {renderShapes()}
          {selectedId && <Transformer ref={trRef} />}
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaDynamic;
