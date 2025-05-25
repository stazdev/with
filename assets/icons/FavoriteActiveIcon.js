import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function FavoriteActiveIcon(props) {
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
        d="M23 9.563c0 6.562-9.73 11.874-10.145 12.093a.75.75 0 01-.71 0C11.73 21.436 2 16.125 2 9.563A5.82 5.82 0 017.813 3.75c1.935 0 3.63.832 4.687 2.24 1.057-1.408 2.752-2.24 4.688-2.24A5.819 5.819 0 0123 9.563z"
        fill="url(#paint0_linear_3941_1261)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3941_1261"
          x1={2.69727}
          y1={-12.7997}
          x2={26.3496}
          y2={-9.7485}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default FavoriteActiveIcon;
