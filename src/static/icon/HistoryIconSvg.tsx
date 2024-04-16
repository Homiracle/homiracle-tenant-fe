import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const HistoryIconSvg = (props: React.SVGProps<SVGElement>) => (
  <Svg
    width={props.width}
    height={props.height}
    color={props.color}
    viewBox='0 0 21 22'
    fill='none'
  >
    <Path
      d='M15.5 16V10M5.5 16V12M10.5 16L10.5 6M10.5 20.5C6.02166 20.5 3.78249 20.5 2.39124 19.1088C1 17.7175 1 15.4783 1 11C1 6.52166 1 4.28249 2.39124 2.89124C3.78249 1.5 6.02166 1.5 10.5 1.5C14.9783 1.5 17.2175 1.5 18.6088 2.89124C20 4.28249 20 6.52166 20 11C20 15.4783 20 17.7175 18.6088 19.1088C17.2175 20.5 14.9783 20.5 10.5 20.5Z'
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
export default HistoryIconSvg;
