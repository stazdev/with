import * as React from "react";
import Svg, {
  Rect,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
const BikeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={52}
    fill="none"
    {...props}
  >
    <Rect width={52} height={52} fill="url(#a)" rx={26} />
    <G clipPath="url(#b)">
      <Path
        fill="#fff"
        d="M34.25 25.25a3.84 3.84 0 0 0-.62.052l-.545-1.42a5.214 5.214 0 0 1 1.164-.132.75.75 0 1 0 0-1.5h-1.792l-1.258-3.27a.75.75 0 0 0-.7-.48h-3a.75.75 0 0 0 0 1.5h2.486l.865 2.25h-2.6c-1.735 0-3.141.404-4.067 1.168a1.5 1.5 0 0 1-1.571.194c-.992-.45-6.87-2.824-6.919-2.837a.75.75 0 0 0-.468 1.424s5.203 2.057 6.237 3.088c.803.8 1.324 1.84 1.484 2.963h-1.522a3.75 3.75 0 1 0 0 1.5h4.887a2.991 2.991 0 0 0 2.881-2.166 5.248 5.248 0 0 1 2.493-3.16l.546 1.418a3.75 3.75 0 1 0 2.018-.592Zm-16.5 4.5h2.12a2.25 2.25 0 1 1 0-1.5h-2.12a.75.75 0 0 0 0 1.5Zm16.5 1.5a2.25 2.25 0 0 1-1.461-3.96l.76 1.98a.75.75 0 0 0 1.4-.54l-.76-1.98h.06a2.25 2.25 0 1 1 0 4.5Z"
      />
    </G>
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
      <ClipPath id="b">
        <Path fill="#fff" d="M14 14h24v24H14z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BikeIcon;
