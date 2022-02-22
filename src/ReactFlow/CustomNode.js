import {
  faAddressCard,
  faCoffee,
  faCopy,
  faGlobeEurope,
  faStar,
  faTrash,
  faVoicemail,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useState } from "react";
import "./Trigger.css";
import mapping_data from "./Data";
import { useEffect } from "react";

const icon = {
  send_email: {
    icon: faStar,
  },
  send_sms: {
    icon: faCoffee,
  },
  send_push: {
    icon: faVoicemail,
  },
  enter_exit: {
    icon: faGlobeEurope,
  },
  specific_users: {
    icon: faAddressCard,
  },
};

const CustomNode = memo(({ data = {} }) => {
  const Handle = data?.Handle || null;
  const Position = data?.Position || null;
  const handleDelete = data?.removeElements || null;
  const handleCopy = data?.copyElement || null;

  const mappeddata = mapping_data?.find(
    (x) => x?.type?.trim() === data?.type?.trim()
  );

  console.log(data, "datatattat");

  const [handle, showhandles] = useState(false);

  const handleMouseOver = (event, data) => {
    showhandles(true);
  };
  const handleMouseLeave = (event, data) => {
    showhandles(false);
  };

  var fromAngle, toAngle, fromCoordX, fromCoordY, toCoordX, toCoordY, d;

  const getPathAttributes = (cx, cy, r, slices, currentSlice) => {
    fromAngle = (currentSlice * 180) / slices;
    toAngle = ((currentSlice + 1) * 180) / slices;
    fromCoordX = cx + r * Math.cos((fromAngle * Math.PI) / 180);
    fromCoordY = cy + r * Math.sin((fromAngle * Math.PI) / 180);
    toCoordX = cx + r * Math.cos((toAngle * Math.PI) / 180);
    toCoordY = cy + r * Math.sin((toAngle * Math.PI) / 180);
    d =
      "M" +
      cx +
      "," +
      cy +
      " L" +
      fromCoordX +
      "," +
      fromCoordY +
      " A" +
      r +
      "," +
      r +
      " 0 0,1 " +
      toCoordX +
      "," +
      toCoordY +
      "z";

    return {
      d,
    };
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={{
          height: "100px",
          // width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {handle && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete([data])}
            style={{
              height: "auto",
              width: "12px",
              color: "#ffff",
              padding: "5px",
              borderRadius: "50%",
              backgroundColor: "#ff4d4d",
              position: "absolute",
            }}
          />
        )}

        {handle && (
          <FontAwesomeIcon
            icon={faCopy}
            onClick={(event) => handleCopy(data)}
            style={{
              height: "auto",
              width: "12px",
              marginLeft: "25px",
              color: "white",
              padding: "5px",
              borderRadius: "50%",
              backgroundColor: "ThreeDFace",
              position: "absolute",
            }}
          />
        )}

        <div className={mappeddata?.grouping} style={{ display: "flex" }}>
          <FontAwesomeIcon
            icon={icon[data.label].icon}
            style={{
              height: "auto",
              width: "24px",
              color: "#ffff",
              padding: "8px",
              borderRadius: "50%",
              marginLeft: "-29px",
              backgroundColor: "#1E90FF",
              justifyContent: "flex-end",
            }}
          />

          <div className="left-handles">
            {Array(mappeddata?.handles?.left)
              ?.fill("")
              ?.map((_, index) => (
                <Handle
                  type="target"
                  position={Position?.Left}
                  id={`target_${index.toString()}`}
                  style={{
                    border: "0",
                    top: `${index * 10}%`,
                    marginTop: "30px",
                  }}
                ></Handle>
              ))}
          </div>

          <div className="text">{data.label || data.type}</div>

          {
            <div className="circle">
              {Array(mappeddata?.handles?.right)
                ?.fill("")
                ?.map((_, index) => {
                  const rotationDegree =
                    (180 / mappeddata?.handles?.right) * index;
                  return (
                    <Handle
                      type="source"
                      position={Position?.Right}
                      id={mappeddata?.handleRightData[index]}
                      className={`slice n_${mappeddata?.handles?.right}_${index}`}
                    >
                      {" "}
                    </Handle>
                  );
                })}
            </div>
          }
        </div>
      </div>

      <div>
        <FontAwesomeIcon
          icon={faBoxOpen}
          style={{
            height: "24px",
            width: "20px",
            marginTop: "40px",
            marginLeft: "-13px",
            backgroundColor: "white",
            backgroundRepeat: "no-repeat",
            color: "#1E90FF",
          }}
        />
      </div>
    </div>
  );
});

export default CustomNode;
