import React, { useState, useRef, useCallback } from "react";
import "./main.css";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
  Handle,
  Position,
  isNode,
} from "react-flow-renderer";

import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";
import data1 from "./Data";
import dagre from "dagre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripHorizontal,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

const initialElements = [];

let id = 0;
function getId() {
  return `State_${id++}`;
}

const nodeTypes = {
  send_sms: CustomNode,
  send_email: CustomNode,
  send_push: CustomNode,
  enter_exit: CustomNode,
  specific_users: CustomNode,
};

const DragAndDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [panOnScroll, setPanOnScroll] = useState(initialElements);

  const [deletedElements, setDeletedElements] = useState([]);

  const onConnect = (params) => {
    params.label = params?.sourceHandle;
    setElements((els) => addEdge({ ...params, type: "arrowclosed" }, els));
  };

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const id = getId();
    const newNode = {
      id: id,
      type,
      position,
      data: {
        label: type,
        type: type,
        id: id,
        positionCoordinates: position,
        Handle,
        Position,
        icon: type,
        removeElements: onElementsRemove,
        copyElement: onCopyElement,
        data1: data1,
      },
    };

    setElements((es) => es.concat(newNode));
  };

  const onElementsRemove = (data = {}) => {
    console.log("data::::::", data);
    const vv = window.confirm("delete this");
    if (vv) {
      setDeletedElements(data);
      setElements((els) => removeElements(data, els));
      console.log("deletedElements:::::", deletedElements);
    }
  };

  const onCopyElement = async (data) => {
    const position = reactFlowInstance.project({
      x: data?.positionCoordinates?.x + 50,
      y: data?.positionCoordinates?.y + 50,
    });

    const id = getId();
    const newNode = {
      id,
      type: data?.label,
      position: position,
      data: {
        label: data?.label,
        id: id,
        positionCoordinates: position,
        Handle,
        Position,
        icon: data?.type,
        removeElements: data?.removeElements,
        copyElement: data?.copyElement,
        data1: data?.data1,
        type: data?.type,
        parentElement: document.querySelector(`[data-id=${data?.id}]`),
      },
    };

    setElements((es) => es.concat(newNode));
  };

  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 200;

  const nodeHeight = 200;

  const getLayoutedElements = (elements, direction = "TB") => {
    const isHorizontal = direction === "LR";

    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);

        el.targetPosition = isHorizontal ? "left" : "top";

        el.sourcePosition = isHorizontal ? "right" : "bottom";

        el.position = {
          x: nodeWithPosition.x - nodeWithPosition.width / 2,

          y: nodeWithPosition.y - nodeWithPosition.height / 2,
        };
      }

      return el;
    });
  };

  const layoutedElements = getLayoutedElements(initialElements);

  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);

      setElements(layoutedElements);
    },

    [elements]
  );

  return (
    <div className="dndflow" style={{ display: "flex" }}>
      <Sidebar onDrop={onDrop} />
      <div onDrag={(event) => setPanOnScroll(event.target)}></div>

      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            panOnScroll={panOnScroll}
            arrowheadtype="arrowclosed"
          >
            <Controls />
            <MiniMap
              nodeColor={(data) => {
                switch (data.label) {
                  default:
                    return "#eee";
                  case data.label:
                    return "yellow";
                }
              }}
              nodeClassName={(data) => {}}
              nodeStrokeWidth={3}
            ></MiniMap>

            <div>
              <Background variant="dots" gap={15} size={0.5} color="" />
            </div>
          </ReactFlow>
        </div>

        <div style={{ width: "100px", height: "50px", display: "flex" }}>
          <FontAwesomeIcon
            icon={faGripHorizontal}
            onClick={() => onLayout("TB")}
            style={{ height: "auto", width: "30px", margin: "10px" }}
          />

          <FontAwesomeIcon
            icon={faGripVertical}
            onClick={() => onLayout("LR")}
            style={{ height: "auto", width: "17px", margin: "10px" }}
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DragAndDrop;
