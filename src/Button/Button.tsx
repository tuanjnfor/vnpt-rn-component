import React from 'react';
import type { TouchRippleSingleProps } from './TouchRippleSingle';
import { Box } from '../Box';
import { Text } from '../Text';
import type { TextBaseProps, BoxProps } from '../types';
import TouchRippleSingle from './TouchRippleSingle';
import { heightLize, widthLize } from '../Responsive';
export interface IButton extends Omit<TouchRippleSingleProps, 'children'> {
  lable: string;
  lableStyle?: Omit<TextBaseProps, 'children'>;
  viewStyle?: BoxProps;
}
export type OButton = {};
const Button = React.forwardRef<OButton, IButton>((props, ref) => {
  const { lable, lableStyle, viewStyle, ...restProp } = props;
  React.useImperativeHandle(ref, () => ({}), []);
  return (
    <TouchRippleSingle {...restProp}>
      <Box
        padding={[widthLize(8), heightLize(8)]}
        color={'#EBECED'}
        radius={10}
        {...viewStyle}
      >
        <Text
          textAlign="center"
          size={14}
          numberOfLines={1}
          {...(lableStyle && {})}
        >
          {lable}
        </Text>
      </Box>
    </TouchRippleSingle>
  );
});

export default React.memo(Button);
