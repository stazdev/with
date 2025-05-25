import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const BankIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Rect width={24} height={24} fill="url(#a)" rx={4.8} />
    <Path
      fill="#fff"
      d="M18.75 16.5a.45.45 0 0 1-.45.45H5.7a.45.45 0 1 1 0-.9h12.6a.45.45 0 0 1 .45.45ZM5.717 10.324a.45.45 0 0 1 .197-.506l5.85-3.6a.45.45 0 0 1 .472 0l5.85 3.6a.45.45 0 0 1-.236.834H16.5v3.6h.9a.45.45 0 0 1 0 .9H6.6a.45.45 0 1 1 0-.9h.9v-3.6H6.15a.45.45 0 0 1-.433-.328Zm7.183 3.478a.45.45 0 0 0 .9 0v-2.7a.45.45 0 1 0-.9 0v2.7Zm-2.7 0a.45.45 0 0 0 .9 0v-2.7a.45.45 0 1 0-.9 0v2.7Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0.797}
        x2={26.375}
        y1={-22.071}
        y2={-19.405}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF7508" />
        <Stop offset={1} stopColor="#1A2610" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default BankIcon;
