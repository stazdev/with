import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const BusIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={52}
    fill="none"
    {...props}
  >
    <Rect width={52} height={52} fill="url(#a)" rx={26} />
    <Path
      fill="#fff"
      d="m37.82 24.012-4.27-4.975a1.5 1.5 0 0 0-1.15-.537H17a1.5 1.5 0 0 0-1.5 1.5v10.5A1.5 1.5 0 0 0 17 32h1.594a3 3 0 0 0 5.812 0h4.688a3 3 0 0 0 5.812 0H36.5a1.5 1.5 0 0 0 1.5-1.5v-6a.75.75 0 0 0-.18-.488ZM17 23.75V20h5.25v3.75H17Zm4.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm7.5-9h-5.25V20H29v3.75Zm3 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-1.5-9V20h1.9l3.218 3.75H30.5Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1.727}
        x2={57.145}
        y1={-47.821}
        y2={-42.044}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF7508" />
        <Stop offset={1} stopColor="#1A2610" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default BusIcon;
