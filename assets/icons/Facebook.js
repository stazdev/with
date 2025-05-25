import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Facebook(props) {
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
        d="M11.546 20v-9.122h3.061l.46-3.556h-3.52v-2.27c0-1.03.284-1.731 1.761-1.731l1.882-.001V.14A25.512 25.512 0 0012.448 0C9.733 0 7.875 1.657 7.875 4.7v2.622h-3.07v3.556h3.07V20h3.671z"
        fill="#3D4DA6"
      />
    </Svg>
  );
}

export default Facebook;
