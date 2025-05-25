import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ChevronUpIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#1C1C1C"
      fillOpacity={0.8}
      d="M13.354 10.854a.498.498 0 0 1-.707 0L8 6.207l-4.646 4.647a.5.5 0 0 1-.707-.708l5-5a.5.5 0 0 1 .707 0l5 5a.5.5 0 0 1 0 .708Z"
    />
  </Svg>
);
export default ChevronUpIcon;
