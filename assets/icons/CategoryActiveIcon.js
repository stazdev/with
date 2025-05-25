import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function CategoryActiveIcon(props) {
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
        d="M20.623 15.851l-8.625 5.03-8.625-5.03a.75.75 0 00-.75 1.296l9 5.25a.75.75 0 00.756 0l9-5.25a.75.75 0 10-.756-1.296z"
        fill="url(#paint0_linear_3941_3850)"
      />
      <Path
        d="M20.623 11.351l-8.625 5.03-8.625-5.03a.75.75 0 00-.75 1.296l9 5.25a.75.75 0 00.756 0l9-5.25a.75.75 0 10-.756-1.296z"
        fill="url(#paint1_linear_3941_3850)"
      />
      <Path
        d="M2.626 8.148l9 5.25a.75.75 0 00.756 0l9-5.25a.75.75 0 000-1.296l-9-5.25a.75.75 0 00-.756 0l-9 5.25a.75.75 0 000 1.296z"
        fill="url(#paint2_linear_3941_3850)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3941_3850"
          x1={2.93555}
          y1={9.53206}
          x2={23.1752}
          y2={15.9813}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_3941_3850"
          x1={2.93555}
          y1={5.03206}
          x2={23.1752}
          y2={11.4813}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_3941_3850"
          x1={2.90136}
          y1={-9.53558}
          x2={24.5315}
          y2={-5.65001}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF2803" />
          <Stop offset={1} stopColor="#FF7508" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default CategoryActiveIcon;
