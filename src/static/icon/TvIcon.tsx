import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function TvIcon() {
  return (
    <Svg width={40} height={40} viewBox='0 0 40 40' fill='none'>
      <Circle opacity={0.05} cx={20} cy={20} r={20} fill='#0FB9B1' />
      <Path
        d='M12 14v9h16v-9H12zm-2 0c0-1.103.897-2 2-2h16c1.103 0 2 .897 2 2v9c0 1.103-.897 2-2 2H12c-1.103 0-2-.897-2-2v-9zm4 12h12a.999.999 0 110 2H14a.999.999 0 110-2z'
        fill='#0FB9B1'
      />
    </Svg>
  );
}

export default TvIcon;
