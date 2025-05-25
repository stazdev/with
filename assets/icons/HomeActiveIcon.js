import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function HomeActiveIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21.5 11.25v9a.75.75 0 01-.75.75H15.5a.75.75 0 01-.75-.75v-4.875a.375.375 0 00-.375-.375h-3.75a.375.375 0 00-.375.375v4.875a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-9c0-.398.158-.78.44-1.06l7.5-7.5a1.5 1.5 0 012.12 0l7.5 7.5a1.5 1.5 0 01.44 1.06z"
        fill="url(#paint0_linear_3941_157)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3941_157"
          x1={4.09766}
          y1={-14.9922}
          x2={24.4789}
          y2={-12.8292}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default HomeActiveIcon;
