import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function PlusFilledIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 5v14m7-7H5"
        stroke="url(#paint0_linear_4062_2846)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_4062_2846"
          x1={5.46484}
          y1={-7.875}
          x2={21.3019}
          y2={-6.12427}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default PlusFilledIcon;
