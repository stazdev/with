import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ArrowUpIcon(props) {
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
        d="M15.936 5v8.125a.938.938 0 01-1.875 0v-5.86l-8.4 8.398a.94.94 0 01-1.327-1.328l8.399-8.398h-5.86a.937.937 0 110-1.875h8.125a.937.937 0 01.938.938z"
        fill="#14AE5C"
      />
    </Svg>
  );
}

export default ArrowUpIcon;
