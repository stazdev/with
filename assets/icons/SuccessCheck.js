import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SuccessCheck(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={120}
      height={120}
      viewBox="0 0 120 120"
      fill="none"
      {...props}
    >
      <Path
        d="M60 11.25A48.75 48.75 0 10108.75 60 48.803 48.803 0 0060 11.25zm21.403 40.153l-26.25 26.25a3.748 3.748 0 01-5.306 0l-11.25-11.25a3.752 3.752 0 115.306-5.306l8.597 8.601 23.597-23.601a3.752 3.752 0 115.306 5.306z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SuccessCheck;
