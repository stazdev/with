import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ChevronGreyLeftIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M13.162 15.587a.94.94 0 01-1.328 1.328l-6.25-6.25a.938.938 0 010-1.328l6.25-6.25a.94.94 0 011.329 1.328L7.576 10l5.585 5.587z"
        fill="#1C1C1C"
        fillOpacity={0.6}
      />
    </Svg>
  );
}

export default ChevronGreyLeftIcon;
