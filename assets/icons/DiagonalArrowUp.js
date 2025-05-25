import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DiagonalArrowUp = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M15.625 5v8.125a.626.626 0 0 1-1.067.442l-3.62-3.62-5.495 5.495a.625.625 0 0 1-.885-.884l5.496-5.495-3.62-3.62a.625.625 0 0 1 .441-1.068H15a.625.625 0 0 1 .625.625Z"
    />
  </Svg>
);
export default DiagonalArrowUp;
