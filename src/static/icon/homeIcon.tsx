import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const HomeIconSvg = (props: React.SVGProps<SVGElement>) => (
  <Svg
    width={props.width}
    height={props.height}
    color={props.color}
    viewBox='0 0 23 22'
    fill='none'
  >
    <Path
      d='M14.7002 16C13.9006 16.6224 12.8504 17 11.7002 17C10.5499 17 9.49969 16.6224 8.70016 16M6.72115 3.6L5.2813 4.64106C3.35419 6.03443 2.39063 6.73112 1.95633 7.74938C1.52203 8.76763 1.69854 9.91624 2.05156 12.2135L2.35259 14.1724C2.85303 17.4289 3.10325 19.0572 4.27116 20.0286C5.43907 21 7.1465 21 10.5614 21H12.839C16.2538 21 17.9613 21 19.1292 20.0286C20.2971 19.0572 20.5473 17.4289 21.0477 14.1724L21.3488 12.2135C21.7018 9.91624 21.8783 8.76763 21.444 7.74938C21.0097 6.73112 20.0461 6.03443 18.119 4.64106L16.6792 3.6C14.2819 1.86667 13.0832 1 11.7002 1C10.3171 1 9.11846 1.86667 6.72115 3.6Z'
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
export default HomeIconSvg;
