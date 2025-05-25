import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function GenderActiveIcon(props) {
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
        d="M19.875 9.75a7.875 7.875 0 10-9 7.793v4.207a1.125 1.125 0 102.25 0v-4.207a7.887 7.887 0 006.75-7.793zM12 15.375a5.625 5.625 0 115.625-5.625A5.632 5.632 0 0112 15.375z"
        fill="url(#paint0_linear_3328_5963)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3328_5963"
          x1={4.64795}
          y1={-17.4392}
          x2={22.5593}
          y2={-15.9542}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default GenderActiveIcon;
