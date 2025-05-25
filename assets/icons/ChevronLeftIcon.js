import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ChevronLeftIcon(props) {
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
        d="M15.796 18.704a1.127 1.127 0 11-1.594 1.594l-7.5-7.5a1.125 1.125 0 010-1.594l7.5-7.5a1.127 1.127 0 111.594 1.594L9.094 12l6.702 6.704z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ChevronLeftIcon;
