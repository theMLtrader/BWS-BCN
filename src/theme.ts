import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    accentOutlines: '#374151',
    errorDark: '#EF4444',
    placeholder: '#9CA3AF',
    'cod-gray': {
      '50': '#707070',
      '100': '#666666',
      '200': '#515151',
      '300': '#3D3D3D',
      '400': '#282828',
      '500': '#141414',
      '600': '#000000',
      '700': '#000000',
      '800': '#000000',
      '900': '#000000',
    },
    flamingo: {
      '50': '#FDEDED',
      '100': '#FCDADA',
      '200': '#F9B5B5',
      '300': '#F58F8F',
      '400': '#F26A6A',
      '500': '#EF4444',
      '600': '#E71414',
      '700': '#B30F0F',
      '800': '#800B0B',
      '900': '#4C0707',
    },
    paleSky: {
      '50': '#CDD0D5',
      '100': '#C2C5CC',
      '200': '#ACB0BA',
      '300': '#969BA7',
      '400': '#7F8694',
      '500': '#6B7280',
      '600': '#515761',
      '700': '#383C43',
      '800': '#1E2024',
      '900': '#050506',
    },
    purple: {
      50: '#FAF5FF',
      300: '#B794F4',
      600: '#6B46C1',
      900: '#322659',
    },
  },
  fonts: {
    body: "'Inter', sans-serif",
  },
  fontSizes: {
    'xs-11': '0.6875rem', // 11px
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },
  styles: {
    global: {},
  },
});

export default theme;
