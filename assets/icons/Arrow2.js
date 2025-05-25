import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Arrow2({ width }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={13}
      viewBox="0 0 124 13"
      fill="none"
    >
      <Path
        d="M114 7.5l10 4.774V.726L114 5.5v2zM0 7.5h115v-2H0v2z"
        fill="#BAC0B6"
      />
    </Svg>
  );
}

export default Arrow2;
