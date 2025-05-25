import * as React from "react";
import Svg, { Path } from "react-native-svg";

function InactiveEnvelopIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21 4.125H3A1.125 1.125 0 001.875 5.25V18a1.875 1.875 0 001.875 1.875h16.5A1.875 1.875 0 0022.125 18V5.25A1.125 1.125 0 0021 4.125zm-9 7.849L5.892 6.375h12.216L12 11.974zM8.7 12l-4.575 4.192V7.808L8.699 12zm1.664 1.526l.876.804a1.125 1.125 0 001.52 0l.876-.804 4.472 4.099H5.892l4.472-4.099zM15.301 12l4.574-4.192v8.384L15.301 12z"
        fill="#1C1C1C"
      />
    </Svg>
  );
}

export default InactiveEnvelopIcon;
