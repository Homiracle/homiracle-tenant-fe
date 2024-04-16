import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const RoomIconSvg = (props: React.SVGProps<SVGElement>) => (
  <Svg
    width={props.width}
    height={props.height}
    color={props.color}
    viewBox='0 0 18 20'
    fill='none'
  >
    <Path
      d='M13.1 2H15.9572C16.5884 2 17.1 2.50368 17.1 3.125V17.875M8.10004 10V11.125M1.10004 17.875V2.125C1.10004 1.50368 1.61171 1 2.24289 1H8.95718C9.58836 1 10.1 1.50368 10.1 2.125V17.875C10.1 18.4963 9.58836 19 8.95718 19H2.24289C1.61171 19 1.10004 18.4963 1.10004 17.875Z'
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap='round'
    />
  </Svg>
);
export default RoomIconSvg;
