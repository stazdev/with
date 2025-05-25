import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CartIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21.576 5.52A.75.75 0 0021 5.25H5.876l-.57-3.134a.75.75 0 00-.738-.616H2.25a.75.75 0 000 1.5h1.688l2.396 13.152c.07.39.243.755.5 1.057a2.625 2.625 0 104.162.791h4.258a2.625 2.625 0 102.37-1.5H8.548a.75.75 0 01-.738-.616l-.297-1.634h10.875a2.25 2.25 0 002.214-1.848l1.14-6.268a.75.75 0 00-.165-.615zM9.75 19.124a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm9 0a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm.375-6.99a.75.75 0 01-.74.615H7.238l-1.09-6h13.952l-.976 5.384z"
        fill="#1C1C1C"
        fillOpacity={0.5}
      />
    </Svg>
  );
}

export default CartIcon;
