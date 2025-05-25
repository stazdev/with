import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const GradientLocationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Rect width={36} height={36} fill="url(#a)" rx={18} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M10.918 16.598c0-3.833 3.203-6.931 7.078-6.931 3.885 0 7.089 3.098 7.089 6.931 0 1.932-.703 3.725-1.86 5.245a18.387 18.387 0 0 1-4.617 4.284c-.405.265-.77.285-1.215 0a18.035 18.035 0 0 1-4.616-4.284c-1.157-1.52-1.859-3.313-1.859-5.245Zm4.745.216c0 1.284 1.048 2.294 2.333 2.294 1.286 0 2.343-1.01 2.343-2.294 0-1.274-1.057-2.333-2.343-2.333a2.344 2.344 0 0 0-2.333 2.333Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1.195}
        x2={39.562}
        y1={-33.107}
        y2={-29.108}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF7508" />
        <Stop offset={1} stopColor="#1A2610" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default GradientLocationIcon;
