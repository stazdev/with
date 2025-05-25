import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LocationGreyIcon(props) {
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
        d="M12.5 5.625a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zm0 6a1.875 1.875 0 110-3.75 1.875 1.875 0 010 3.75zm0-10.5A8.634 8.634 0 003.875 9.75c0 7.253 7.654 12.694 7.98 12.922a1.125 1.125 0 001.29 0 24.287 24.287 0 003.954-3.657c2.634-3.024 4.026-6.23 4.026-9.265A8.635 8.635 0 0012.5 1.125zm2.934 16.38a23.38 23.38 0 01-2.934 2.828 23.378 23.378 0 01-2.934-2.829C8 15.691 6.125 12.873 6.125 9.75a6.375 6.375 0 0112.75 0c0 3.123-1.875 5.94-3.44 7.754z"
        fill="#1C1C1C"
        fillOpacity={0.2}
      />
    </Svg>
  );
}

export default LocationGreyIcon;
