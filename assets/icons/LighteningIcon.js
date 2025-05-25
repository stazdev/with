import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LighteningIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={20}
      viewBox="0 0 10 20"
      fill="none"
      {...props}
    >
      <Path
        d="M1.976 0L0 10.764h5.04L3.347 20 10 6.578H5.202L6.37 0H1.976z"
        fill="#725FEC"
      />
    </Svg>
  );
}

export default LighteningIcon;
