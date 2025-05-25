import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DropDownIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M20.295 9.796l-7.5 7.5a1.125 1.125 0 01-1.594 0l-7.5-7.5a1.127 1.127 0 011.594-1.594l6.704 6.704 6.704-6.705a1.127 1.127 0 011.594 1.594h-.002z"
        fill="#1C1C1C"
        fillOpacity={0.4}
      />
    </Svg>
  );
}

export default DropDownIcon;
