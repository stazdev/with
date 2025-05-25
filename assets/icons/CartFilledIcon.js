import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function CartFilledIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      {...props}
    >
      <Path
        d="M21.576 6.02A.75.75 0 0021 5.75H5.876l-.57-3.134A.75.75 0 004.568 2H2.25a.75.75 0 000 1.5h1.688l2.396 13.152c.07.39.243.755.5 1.057a2.625 2.625 0 104.162.791h4.258a2.625 2.625 0 102.37-1.5H8.548a.75.75 0 01-.738-.616l-.297-1.634h10.875a2.25 2.25 0 002.214-1.848l1.14-6.268a.75.75 0 00-.165-.615zM9.75 19.624a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm9 0a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
        fill="url(#paint0_linear_3325_9772)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3325_9772"
          x1={2.17244}
          y1={-16.6247}
          x2={25.0822}
          y2={-14.0921}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default CartFilledIcon;
