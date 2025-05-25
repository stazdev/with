import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function CheckIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.5 0h-15A1.5 1.5 0 000 1.5v15A1.5 1.5 0 001.5 18h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0016.5 0zm-3.22 7.28l-5.25 5.25a.748.748 0 01-1.06 0l-2.25-2.25a.75.75 0 111.06-1.06l1.72 1.72 4.72-4.72a.751.751 0 011.06 1.06z"
        fill="url(#paint0_linear_3524_19514)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3524_19514"
          x1={0.597656}
          y1={-16.5536}
          x2={19.781}
          y2={-14.5538}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF7508" />
          <Stop offset={1} stopColor="#1A2610" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default CheckIcon;
