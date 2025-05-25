import * as React from "react";
import Svg, { Path } from "react-native-svg";

function TrashIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={21}
      viewBox="0 0 19 21"
      fill="none"
      {...props}
    >
      <Path
        d="M15.889 8.554c0 8.02 1.154 11.644-6.61 11.644S2.693 16.573 2.693 8.554M17.365 5.48H1.215M12.714 5.48s.528-3.766-3.426-3.766c-3.953 0-3.425 3.766-3.425 3.766"
        stroke="#FF7508"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TrashIcon;
