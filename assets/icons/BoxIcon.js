import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const BoxIcon = (props) => (
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
      d="M27.409 16.274a3.75 3.75 0 0 0-2.818 0l-2.19.888 9.592 3.73 3.374-1.303a1.747 1.747 0 0 0-.46-.275l-7.498-3.04ZM36 20.952l-9.25 3.574v10.923c.224-.045.444-.112.659-.2l7.498-3.04A1.75 1.75 0 0 0 36 30.589v-9.636ZM25.25 35.449V24.526L16 20.952v9.637a1.75 1.75 0 0 0 1.093 1.62l7.498 3.04c.215.088.435.154.659.2Zm-8.617-15.86L26 23.208l3.917-1.514-9.543-3.71-3.281 1.33c-.17.069-.324.162-.46.275Z"
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
export default BoxIcon;
