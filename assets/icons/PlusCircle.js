import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PlusCircle(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <Path
        d="M16 3a13 13 0 1013 13A13.013 13.013 0 0016 3zm0 24a11 11 0 1111-11 11.012 11.012 0 01-11 11zm6-11a1 1 0 01-1 1h-4v4a1 1 0 01-2 0v-4h-4a1 1 0 010-2h4v-4a1 1 0 012 0v4h4a1 1 0 011 1z"
        fill="#1C1C1C"
        fillOpacity={0.8}
      />
    </Svg>
  );
}

export default PlusCircle;
