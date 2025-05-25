import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function CheckFilledIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
    >
      <Path
        d="M13 0a13 13 0 1013 13A13.013 13.013 0 0013 0zm5.707 10.707l-7 7a1.001 1.001 0 01-1.415 0l-3-3a1 1 0 111.416-1.415L11 15.587l6.293-6.293a1 1 0 111.415 1.415z"
        fill="url(#paint0_linear_3325_8929)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3325_8929"
          x1={0.863281}
          y1={-23.9107}
          x2={30.2751}
          y2={-20.6594}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default CheckFilledIcon;
