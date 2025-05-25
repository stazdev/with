import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CloseIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      d="M3.75 3.75L14.2493 14.2493"
      stroke="#939393"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.75071 14.2493L14.25 3.75"
      stroke="#939393"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CloseIcon;
