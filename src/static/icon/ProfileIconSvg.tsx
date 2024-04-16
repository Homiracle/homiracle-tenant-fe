import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ProfileIconSvg = (props: React.SVGProps<SVGElement>) => (
  <Svg
    width={props.width}
    height={props.height}
    color={props.color}
    viewBox='0 0 20 22'
    fill='none'
  >
    <Path
      d='M4.4776 14.4816C3.06283 15.324 -0.646611 17.0441 1.61269 19.1966C2.71633 20.248 3.94552 21 5.49089 21H14.3092C15.8545 21 17.0837 20.248 18.1874 19.1966C20.4467 17.0441 16.7372 15.324 15.3224 14.4816C12.0048 12.5061 7.79521 12.5061 4.4776 14.4816Z'
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      d='M14.4 5.5C14.4 7.98528 12.3853 10 9.90002 10C7.41474 10 5.40002 7.98528 5.40002 5.5C5.40002 3.01472 7.41474 1 9.90002 1C12.3853 1 14.4 3.01472 14.4 5.5Z'
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
export default ProfileIconSvg;
