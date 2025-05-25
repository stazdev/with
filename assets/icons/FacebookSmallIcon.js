import * as React from "react";
import Svg, { Path } from "react-native-svg";
const FacebookSmallIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#1E40AF"
      d="M16.313 9a7.324 7.324 0 0 1-6.438 7.26.281.281 0 0 1-.313-.28v-5.292h1.688a.561.561 0 0 0 .563-.6.575.575 0 0 0-.58-.525h-1.67V7.875a1.125 1.125 0 0 1 1.124-1.125h1.126a.562.562 0 0 0 .562-.6.575.575 0 0 0-.582-.525h-1.105a2.25 2.25 0 0 0-2.25 2.25v1.688H6.75a.563.563 0 0 0-.563.6.574.574 0 0 0 .582.525h1.668v5.293a.281.281 0 0 1-.312.281 7.323 7.323 0 0 1-6.433-7.537c.141-3.797 3.216-6.883 7.016-7.031A7.32 7.32 0 0 1 16.312 9Z"
    />
  </Svg>
);
export default FacebookSmallIcon;
