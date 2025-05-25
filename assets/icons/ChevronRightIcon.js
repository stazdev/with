import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ChevronRightIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <Path
        d="M11.529 9.03l-5 5a.751.751 0 01-1.063-1.062L9.936 8.5 5.467 4.03A.752.752 0 016.53 2.969l5 5a.752.752 0 01-.001 1.063z"
        fill="#000"
      />
    </Svg>
  );
}

export default ChevronRightIcon;
