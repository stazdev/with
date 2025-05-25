import * as React from "react";
import Svg, { Path } from "react-native-svg";
const StarIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#A2845E"
      d="m21.967 10.767-4.22 3.64 1.286 5.445a1.537 1.537 0 0 1-2.297 1.67l-4.734-2.914-4.737 2.914a1.538 1.538 0 0 1-2.294-1.67l1.29-5.445-4.22-3.64a1.543 1.543 0 0 1 .875-2.705l5.53-.446 2.135-5.164a1.534 1.534 0 0 1 2.838 0l2.132 5.164 5.531.446a1.543 1.543 0 0 1 .879 2.706h.006Z"
    />
  </Svg>
);
export default StarIcon;
