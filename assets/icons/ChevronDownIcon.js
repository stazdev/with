import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ChevronDownIcon(props) {
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
        d="M16.912 8.164l-6.25 6.25a.937.937 0 01-1.328 0l-6.25-6.25a.94.94 0 111.328-1.329l5.587 5.587 5.586-5.587a.94.94 0 111.328 1.328h-.001z"
        fill="#1C1C1C"
        fillOpacity={0.2}
      />
    </Svg>
  );
}

export default ChevronDownIcon;
