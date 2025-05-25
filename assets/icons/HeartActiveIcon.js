import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const HeartActiveIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Rect width={24} height={24} fill="#fff" rx={12} />
    <Path
      fill="#FF2803"
      d="M19 10.375c0 4.375-6.487 7.916-6.763 8.063a.5.5 0 0 1-.474 0C11.487 18.29 5 14.75 5 10.374A3.88 3.88 0 0 1 8.875 6.5c1.29 0 2.42.555 3.125 1.493.704-.938 1.834-1.493 3.125-1.493A3.88 3.88 0 0 1 19 10.375Z"
    />
  </Svg>
);
export default HeartActiveIcon;
