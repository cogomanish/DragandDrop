import {
  faAddressCard,
  faCoffee,
  faGlobeEurope,
  faStar,
  faVoicemail,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Data = [
  {
    text: "Occurence of Event ",
    type: "send_email",
    grouping: "triggers",
    icon: faStar,
    border: "#1E90FF",
    handles: {
      left: 4,
      right: 5,
    },
    handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"],
    style: (
      <FontAwesomeIcon
        icon={faArrowCircleRight}
        style={{
          height: "18px",
          width: "38px",
          marginLeft: "57px",
          backgroundColor: "white",
        }}
      />
    ),
  },
  {
    text: "Enter/Exit/Is In Segment",
    type: "send_sms",
    grouping: "controls",
    icon: faCoffee,
    handles: {
      left: 2,
      right: 5,
    },
    handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"],
  },
  {
    text: "Change In User Attribute",
    type: "send_push",
    grouping: "Action",
    icon: faVoicemail,
    handles: {
      left: 2,
      right: 2,
    },
    handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"],
  },

  {
    text: "Enter/Exit Geo-fence",
    type: "enter_exit",
    grouping: "FlowControl",
    icon: faGlobeEurope,
    border: "#1E90FF",
    handles: {
      left: 4,
      right: 3,
    },
    handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"],
  },
  {
    text: "Enter/Exit Geo-fence",
    type: "specific_users",
    grouping: "triggers",
    icon: faAddressCard,
    border: "#1E90FF",
    handles: {
      left: 2,
      right: 4,
    },
    handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"],
  },
];

export default Data;
