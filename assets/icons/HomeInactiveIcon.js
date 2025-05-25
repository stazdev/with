import * as React from "react";
import Svg, { Path } from "react-native-svg";

function HomeInactiveIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21.326 9.923l-7.5-7.5a1.875 1.875 0 00-2.652 0l-7.5 7.5a1.862 1.862 0 00-.549 1.327v9a1.125 1.125 0 001.125 1.125h6a1.125 1.125 0 001.125-1.125v-4.875h2.25v4.875a1.125 1.125 0 001.125 1.125h6a1.125 1.125 0 001.125-1.125v-9a1.862 1.862 0 00-.55-1.327zm-1.701 9.202h-3.75V14.25a1.125 1.125 0 00-1.125-1.125h-4.5a1.125 1.125 0 00-1.125 1.125v4.875h-3.75v-7.72L12.5 4.28l7.125 7.125v7.72z"
        fill="#FFF1E6"
      />
    </Svg>
  );
}

export default HomeInactiveIcon;
