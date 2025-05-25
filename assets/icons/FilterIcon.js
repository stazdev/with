import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FilterIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M16.5 4.875H12M4.5 4.875h-3M7.5 7.5a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25zM16.5 13.125h-3M6 13.125H1.5M10.5 15.75a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z"
        stroke="#939393"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FilterIcon;
