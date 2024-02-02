import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //   IconLookup,
  IconDefinition,
  //   findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";

function RoundButton({
  icon,
  handleClick,
}: {
  icon: IconDefinition;
  handleClick: React.MouseEventHandler;
}) {
  return (
    <button
      className="rounded-full border w-5 h-5 flex items-center justify-center"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default RoundButton;
