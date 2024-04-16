import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';
function ThunderIcon({
  color,
  size,
  style,
}: {
  style?: ViewStyle;
  color: string;
  size: number;
}) {
  return (
    <Svg width={size} height={size} viewBox='0 0 16 16' style={style}>
      <Path
        d='M3.484 7.553l4.665-5.989c.365-.468 1.05-.177 1.05.447v4.636c0 .373.267.676.598.676h2.27c.515 0 .79.687.45 1.124L7.85 14.436c-.365.468-1.05.176-1.05-.447V9.352c0-.373-.267-.676-.598-.676h-2.27c-.515 0-.79-.687-.45-1.124z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default ThunderIcon;
