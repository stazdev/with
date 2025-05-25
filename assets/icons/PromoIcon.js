import * as React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
const PromoIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={83}
    height={80}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Rect width={52} height={52} x={15} y={12} fill="url(#b)" rx={26} />
      <Path
        fill="#fff"
        d="M37.75 35.563a.813.813 0 1 1 0-1.627.813.813 0 0 1 0 1.627Zm6.5 4.874a.813.813 0 1 0 0 1.627.813.813 0 0 0 0-1.627ZM52.375 38c0 1.06-.763 1.855-1.436 2.557-.383.4-.78.813-.928 1.175-.139.333-.147.883-.155 1.416-.015.991-.031 2.115-.812 2.896-.781.78-1.904.797-2.896.812-.533.008-1.084.017-1.416.155-.362.149-.774.545-1.175.928-.702.673-1.497 1.436-2.557 1.436-1.06 0-1.855-.763-2.557-1.436-.4-.383-.813-.78-1.175-.928-.333-.139-.883-.147-1.416-.155-.991-.015-2.115-.031-2.896-.812-.78-.781-.797-1.904-.812-2.896-.008-.533-.017-1.084-.155-1.416-.149-.362-.545-.774-.928-1.175-.673-.702-1.436-1.497-1.436-2.557 0-1.06.763-1.855 1.436-2.557.383-.4.78-.813.928-1.175.138-.333.147-.883.155-1.416.015-.991.031-2.115.812-2.896.781-.78 1.904-.797 2.896-.812.533-.008 1.084-.016 1.416-.155.362-.149.774-.545 1.175-.928.702-.673 1.497-1.436 2.557-1.436 1.06 0 1.855.763 2.557 1.436.4.383.813.78 1.175.928.333.139.883.147 1.416.155.991.015 2.115.031 2.896.812.78.781.797 1.904.812 2.896.008.533.017 1.084.155 1.416.149.362.545.774.928 1.175.673.702 1.436 1.497 1.436 2.557Zm-14.625-.813a2.438 2.438 0 1 0 0-4.875 2.438 2.438 0 0 0 0 4.876Zm7.887-2.675a.813.813 0 1 0-1.15-1.15l-8.124 8.126a.813.813 0 1 0 1.15 1.15l8.124-8.126Zm1.05 6.738a2.438 2.438 0 1 0-4.875 0 2.438 2.438 0 0 0 4.876 0Z"
      />
      <Circle cx={79.5} cy={12.5} r={3.5} fill="#FF7508" />
      <Circle cx={8.5} cy={4.5} r={4.5} fill="url(#c)" />
      <Circle cx={4} cy={59} r={2} fill="url(#d)" />
      <Circle cx={68} cy={58} r={2} fill="#C6D8D3" />
      <Circle cx={73} cy={71} r={1} fill="#95A4FC" />
      <Circle cx={7} cy={17} r={1} fill="#A6BCC0" />
      <Circle cx={74} cy={23} r={1} fill="#8CD5F2" />
      <Circle cx={47} cy={2} r={1} fill="#331832" />
      <Circle cx={27.5} cy={78.5} r={1.5} fill="#223315" />
      <Circle cx={54.5} cy={76.5} r={0.5} fill="#1E40AF" />
      <Circle cx={76} cy={49} r={1} fill="#EF4444" />
      <Circle cx={0.5} cy={33.5} r={0.5} fill="#C6D8D3" />
      <Circle cx={66.5} cy={9.5} r={0.5} fill="#725FEC" />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={16.727}
        x2={72.145}
        y1={-35.821}
        y2={-30.044}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF7508" />
        <Stop offset={1} stopColor="#1A2610" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={4.299}
        x2={14.48}
        y1={-8.277}
        y2={-7.151}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF2803" />
        <Stop offset={1} stopColor="#FF7508" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={2.133}
        x2={6.396}
        y1={53.321}
        y2={53.766}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF7508" />
        <Stop offset={1} stopColor="#1A2610" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h83v80H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PromoIcon;
