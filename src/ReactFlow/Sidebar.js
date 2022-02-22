import React from "react";
import "./Sidebar.css";
import { useState } from "react";
import Triigers from "./Triigers";
import Action from "./Action";
import FlowControl from "./FlowControl";
import Controls from "./Controls";
import "./Trigger.css";
function Sidebar() {
  const [show, setShow] = useState({
    trigger: true,
    Action: false,
    FlowControl: false,
    Controls: false,
  });

  return (
    <div>
      <aside style={{ width: "300px" }}>
        <div style={{ backgroundColor: "#3d404e", height: "70px" }}>
          <input
            type="text"
            placeholder="Search  Controls"
            style={{
              width: "260px",
              height: "10px",
              borderRadius: "3px",
              border: "1px solid black",
              padding: "10px",
              margin: "20px 0px 20px 10px",
            }}
          />
        </div>

        <Triigers show={show} setShow={setShow} />
        <Action show={show} setShow={setShow} />
        <Controls show={show} setShow={setShow} />
        <FlowControl show={show} setShow={setShow} />
      </aside>
    </div>
  );
}
export default Sidebar;
