import * as React from "react";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
const RadioButtonCheckIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={8.5} stroke="url(#a)" strokeWidth={3} />
    <Circle cx={9.997} cy={10} r={5.833} fill="url(#b)" />
    <Defs>
      <LinearGradient
        id="a"
        x1={0.664}
        x2={23.288}
        y1={-18.393}
        y2={-15.892}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF2803" />
        <Stop offset={1} stopColor="#FF7508" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={4.551}
        x2={17.749}
        y1={-6.562}
        y2={-5.103}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF2803" />
        <Stop offset={1} stopColor="#FF7508" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default RadioButtonCheckIcon;
