import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function SearchActiveIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.5 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
        stroke="url(#paint0_linear_3941_2833)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 22l-2-2"
        stroke="url(#paint1_linear_3941_2833)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3941_2833"
          x1={-1.95563}
          y1={14.01}
          x2={20.993}
          y2={16.0277}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF7508" />
          <Stop offset={0.59523} stopColor="#FF4804" />
          <Stop offset={1} stopColor="#FE0000" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_3941_2833"
          x1={19.5836}
          y1={21.2642}
          x2={21.9993}
          y2={21.4766}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF7508" />
          <Stop offset={0.59523} stopColor="#FF4804" />
          <Stop offset={1} stopColor="#FE0000" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SearchActiveIcon;
