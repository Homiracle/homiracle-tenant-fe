import FigmaTheme from './theme.json';
import {
  MD3LightTheme as DefaultTheme,
  useTheme,
  customText,
  configureFonts,
} from 'react-native-paper';
import { Font } from 'react-native-paper/lib/typescript/types';

// Use this instead of importing `Text` from `react-native-paper`
export const Text = customText<'customVariant'>();

const fontConfig: Record<string, any> = {
  // Thêm cấu hình cho displayLarge vào đây
  ['displayLarge']: {
    ...FigmaTheme.styles.display.large,
  },
  ['displayMedium']: {
    ...FigmaTheme.styles.display.medium,
  },
  ['displaySmall']: {
    ...FigmaTheme.styles.display.small,
  },
  ['headlineLarge']: {
    ...FigmaTheme.styles.headline.large,
  },
  ['headlineMedium']: {
    ...FigmaTheme.styles.headline.medium,
  },
  ['headlineSmall']: {
    ...FigmaTheme.styles.headline.small,
  },
  ['bodyLarge']: {
    ...FigmaTheme.styles.body.large,
  },
  ['bodyMedium']: {
    ...FigmaTheme.styles.body.medium,
  },
  ['bodySmall']: {
    ...FigmaTheme.styles.body.small,
  },
  ['labelLarge']: {
    ...FigmaTheme.styles.label.large,
  },
  ['labelMedium']: {
    ...FigmaTheme.styles.label.medium,
  },
  ['labelSmall']: {
    ...FigmaTheme.styles.label.small,
  },
};

// paper theme
const theme = {
  ...DefaultTheme,
  ...FigmaTheme, // Copy it from the color codes scheme from figma and then use it here
  colors: {
    ...DefaultTheme.colors,
    ...FigmaTheme.schemes.light,
  },
  fonts: configureFonts({ config: fontConfig }),
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
export default theme;
