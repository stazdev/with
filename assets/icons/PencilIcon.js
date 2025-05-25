import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PencilIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF7508"
      d="m21.311 6.878-4.19-4.188a1.5 1.5 0 0 0-2.121 0L3.44 14.25A1.487 1.487 0 0 0 3 15.31v4.19A1.5 1.5 0 0 0 4.5 21h15.75a.75.75 0 1 0 0-1.5h-9.439L21.311 9a1.5 1.5 0 0 0 0-2.122ZM18 10.19 13.811 6l2.25-2.25 4.189 4.19L18 10.19Z"
    />
  </Svg>
);
export default PencilIcon;
