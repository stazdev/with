import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const RadioButtonUncheckIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={8.5} stroke="#FFD4B2" strokeWidth={3} />
  </Svg>
);
export default RadioButtonUncheckIcon;
