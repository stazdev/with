import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BellIcon(props) {
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
        d="M20.793 16.494c-.52-.896-1.294-3.432-1.294-6.744a7.5 7.5 0 00-15 0c0 3.313-.774 5.848-1.295 6.744A1.5 1.5 0 004.5 18.75h3.826a3.75 3.75 0 007.348 0h3.826a1.5 1.5 0 001.294-2.256zm-8.794 3.756a2.25 2.25 0 01-2.12-1.5h4.24a2.25 2.25 0 01-2.12 1.5z"
        fill="#223315"
      />
    </Svg>
  );
}

export default BellIcon;
