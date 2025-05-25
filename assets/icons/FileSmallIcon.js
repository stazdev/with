import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const FileSmallIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="M11.8393 4.3468L8.7768 1.2843C8.71585 1.22328 8.64348 1.17487 8.56381 1.14183C8.48414 1.1088 8.39874 1.0918 8.3125 1.0918H3.0625C2.77242 1.0918 2.49422 1.20703 2.2891 1.41215C2.08398 1.61727 1.96875 1.89547 1.96875 2.18555V11.8105C1.96875 12.1006 2.08398 12.3788 2.2891 12.5839C2.49422 12.7891 2.77242 12.9043 3.0625 12.9043H10.9375C11.2276 12.9043 11.5058 12.7891 11.7109 12.5839C11.916 12.3788 12.0312 12.1006 12.0312 11.8105V4.81055C12.0312 4.63664 11.9622 4.46984 11.8393 4.3468ZM8.75 3.11523L10.0078 4.37305H8.75V3.11523ZM3.28125 11.5918V2.4043H7.4375V5.0293C7.4375 5.20335 7.50664 5.37027 7.62971 5.49334C7.75278 5.61641 7.9197 5.68555 8.09375 5.68555H10.7188V11.5918H3.28125Z"
      fill="url(#paint0_linear_3211_2520)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_3211_2520"
        x1={2.30286}
        y1={-9.77148}
        x2={13.7236}
        y2={-8.69601}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF2803" />
        <Stop offset={1} stopColor="#FF7508" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default FileSmallIcon;
