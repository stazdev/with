import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function ProfileActiveIcon(props) {
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
        d="M16.125 11.25a4.125 4.125 0 11-8.25 0 4.125 4.125 0 018.25 0zm5.625.75A9.75 9.75 0 1112 2.25 9.76 9.76 0 0121.75 12zm-1.5 0a8.258 8.258 0 00-8.575-8.243c-4.416.17-7.937 3.848-7.925 8.266a8.217 8.217 0 002.085 5.453 7.475 7.475 0 012.04-1.998.375.375 0 01.453.03 5.609 5.609 0 007.339 0 .374.374 0 01.452-.03 7.474 7.474 0 012.043 1.998A8.214 8.214 0 0020.25 12z"
        fill="url(#paint0_linear_3941_3812)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3941_3812"
          x1={2.89746}
          y1={-15.683}
          x2={24.9563}
          y2={-13.2445}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default ProfileActiveIcon;
