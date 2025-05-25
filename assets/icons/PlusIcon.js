import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PlusIcon(props) {
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
        d="M17.813 10a.938.938 0 01-.938.938h-5.938v5.937a.938.938 0 01-1.874 0v-5.938H3.125a.938.938 0 010-1.874h5.938V3.125a.937.937 0 111.874 0v5.938h5.938a.937.937 0 01.938.937z"
        fill="#fff"
      />
    </Svg>
  );
}

export default PlusIcon;
