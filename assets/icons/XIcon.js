import * as React from "react";
import Svg, { Path } from "react-native-svg";
const XIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M15.383 15.832a.563.563 0 0 1-.492.292h-3.375a.562.562 0 0 1-.475-.26l-2.847-4.475-4.137 4.55a.562.562 0 0 1-.832-.756l4.343-4.781-4.402-6.913a.562.562 0 0 1 .475-.865h3.375a.562.562 0 0 1 .475.26l2.847 4.475 4.137-4.55a.563.563 0 0 1 .832.756l-4.343 4.778 4.402 6.917a.563.563 0 0 1 .017.572Z"
    />
  </Svg>
);
export default XIcon;
