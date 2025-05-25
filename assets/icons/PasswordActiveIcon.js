import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function PasswordActiveIcon(props) {
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
        d="M4.5 5.25v13.5a1.125 1.125 0 01-2.25 0V5.25a1.125 1.125 0 012.25 0zm8.13 4.753l-1.38.448V9A1.125 1.125 0 109 9v1.451l-1.38-.448a1.125 1.125 0 10-.696 2.14l1.38.449-.853 1.173a1.125 1.125 0 101.82 1.323l.854-1.174.853 1.174a1.125 1.125 0 101.82-1.323l-.852-1.173 1.38-.45a1.124 1.124 0 10-.695-2.139zm10.793.722a1.124 1.124 0 00-1.417-.722l-1.381.448V9a1.125 1.125 0 10-2.25 0v1.451l-1.38-.448a1.126 1.126 0 10-.696 2.14l1.38.449-.853 1.173a1.125 1.125 0 101.82 1.323l.854-1.174.853 1.174a1.125 1.125 0 101.82-1.323l-.852-1.173 1.38-.45a1.122 1.122 0 00.722-1.417z"
        fill="url(#paint0_linear_3524_19501)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3524_19501"
          x1={2.95485}
          y1={-10.3594}
          x2={26.7345}
          y2={-6.81626}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default PasswordActiveIcon;
