import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function TabCartIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <Path
        d="M36.46 9.698a1.25 1.25 0 00-.96-.448H10.294l-.95-5.223A1.25 1.25 0 008.114 3H4.25a1.25 1.25 0 000 2.5h2.813l3.993 21.92a3.75 3.75 0 00.833 1.761 4.375 4.375 0 106.938 1.319h7.096a4.375 4.375 0 103.952-2.5h-15.13a1.25 1.25 0 01-1.23-1.027l-.495-2.723h18.125a3.75 3.75 0 003.69-3.08l1.9-10.447a1.25 1.25 0 00-.276-1.025zM16.75 32.375a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm15 0a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z"
        fill="url(#paint0_linear_3941_3818)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3941_3818"
          x1={4.12073}
          y1={-28.0412}
          x2={42.3037}
          y2={-23.8202}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default TabCartIcon;
