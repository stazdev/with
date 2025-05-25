import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Arrow1({ width }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={13}
      viewBox="0 0 124 13"
      fill="none"
    >
      <Path
        d="M10 5.5L0 .726v11.547L10 7.5v-2zm-1 2h115v-2H9v2z"
        fill="#BAC0B6"
      />
    </Svg>
  );
}

export default Arrow1;
