import React from 'react';
import { Text as RNText } from 'react-native';
import type { RefText, TextBaseProps } from '../types';
import { equal, useTextProps } from '../Utils';
// import { fontSizeLine } from '../Responsive';
// const getFont: (weight: TextBaseProps['weight']) => string = (weight) => {
//   // if (Platform.OS === 'android') {
//   switch (weight) {
//     case '100':
//       return 'SF-Pro-Display-Ultralight';
//     case '200':
//       return 'SF-Pro-Display-Thin';
//     case '300':
//       return 'SF-Pro-Display-Light';
//     case 'normal':
//     case '400':
//       return 'SF-Pro-Display-Regular';
//     case '500':
//       return 'SF-Pro-Display-Medium';
//     case '600':
//       return 'SF-Pro-Display-Semibold';
//     case '700':
//       return 'SF-Pro-Display-Bold';
//     case '800':
//       return 'SF-Pro-Display-Heavy';
//     case '900':
//       return 'SF-Pro-Display-Black';
//     case 'bold':
//       return 'SF-Pro-Display-Bold';
//     default:
//       return 'SF-Pro-Display-Medium';
//   }
//   // }
//   // return 'AvertaStd-Regular'
// };

export const Text = React.memo(
  React.forwardRef<RefText, TextBaseProps>((props, ref) => {
    const custom_props = useTextProps(props);
    return <RNText ref={ref} {...custom_props} />;
  }),
  equal
);

// export const Text = React.forwardRef<RefText, TextBaseProps>((props, ref) => {
//   const { weight, ...rest } = props;
//   return (
//     <TextRN
//       weight={Platform.OS === 'ios' ? weight : undefined}
//       // weight={weight}
//       lineHeight={props.size + fontSizeLine(4)}
//       fontFamily={getFont(weight)}
//       {...rest}
//       ref={ref}
//     />
//   );
// });

Text.displayName = 'Text';
