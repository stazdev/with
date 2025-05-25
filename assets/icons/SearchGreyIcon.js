import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SearchGreyIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <Path
        d="M8.625 16.25a7.125 7.125 0 100-14.25 7.125 7.125 0 000 14.25zM16.5 17L15 15.5"
        stroke="#939393"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SearchGreyIcon;
