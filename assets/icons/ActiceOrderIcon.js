import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const ActiveOrderIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M9.25 2v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 1.5 0Zm5.25 5.25h-2a.75.75 0 1 0 0 1.5h2a.75.75 0 1 0 0-1.5Zm-2.641 3.048a.751.751 0 0 0-1.063 1.063l1.415 1.414a.751.751 0 1 0 1.062-1.063l-1.414-1.414ZM8.5 11.25a.75.75 0 0 0-.75.75v2a.75.75 0 1 0 1.5 0v-2a.75.75 0 0 0-.75-.75Zm-3.359-.952-1.414 1.415a.751.751 0 1 0 1.062 1.062l1.415-1.414a.751.751 0 1 0-1.063-1.063ZM5.25 8a.75.75 0 0 0-.75-.75h-2a.75.75 0 0 0 0 1.5h2A.75.75 0 0 0 5.25 8Zm-.463-4.773a.751.751 0 1 0-1.062 1.062l1.416 1.413a.751.751 0 0 0 1.063-1.063L4.787 3.227Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={2.198}
        x2={16.586}
        y1={-11.165}
        y2={-9.665}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF7508" />
        <Stop offset={1} stopColor="#1A2610" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default ActiveOrderIcon;
