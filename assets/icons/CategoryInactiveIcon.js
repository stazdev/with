import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CategoryInactiveIcon(props) {
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
        d="M22.473 15.938a1.125 1.125 0 01-.409 1.534l-9 5.25a1.125 1.125 0 01-1.134 0l-9-5.25a1.125 1.125 0 011.133-1.944l8.438 4.92 8.438-4.92a1.125 1.125 0 011.534.41zm-1.534-4.91l-8.437 4.92-8.433-4.92a1.125 1.125 0 00-1.13 1.944l9 5.25a1.125 1.125 0 001.134 0l9-5.25a1.126 1.126 0 10-1.134-1.944zM2.377 7.5a1.125 1.125 0 01.562-.972l9-5.25a1.13 1.13 0 011.134 0l9 5.25a1.124 1.124 0 010 1.944l-9 5.25a1.125 1.125 0 01-1.134 0l-9-5.25a1.125 1.125 0 01-.562-.972zm3.358 0l6.767 3.948L19.268 7.5l-6.766-3.948L5.735 7.5z"
        fill="#FFF1E6"
      />
    </Svg>
  );
}

export default CategoryInactiveIcon;
