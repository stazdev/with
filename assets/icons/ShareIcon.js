import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ShareIcon(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.501 4.166a3.333 3.333 0 11.59 1.893L7.308 8.88a3.327 3.327 0 01.025 2.169l5.75 2.904a3.333 3.333 0 11-.568 1.58l-6.093-3.077a3.333 3.333 0 11-.064-4.968l6.158-3.002a3.361 3.361 0 01-.015-.319zm5 0a1.667 1.667 0 10-3.333 0 1.667 1.667 0 003.333 0zm0 11.667a1.667 1.667 0 10-3.333 0 1.667 1.667 0 003.333 0zm-13.333-7.5a1.667 1.667 0 110 3.333 1.667 1.667 0 010-3.333z"
        fill="#939393"
      />
    </Svg>
  );
}

export default ShareIcon;
