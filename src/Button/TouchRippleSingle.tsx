import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  PressableProps,
  StyleSheet,
} from 'react-native';
import TouchRipple from './TouchRipple';
import TouchSingle from './TouchSingle';

const defaultHislop = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

const styles = StyleSheet.create({
  touch: {
    overflow: 'hidden',
  },
});

export interface TouchRippleSingleProps {
  onPress?: null | ((event: GestureResponderEvent) => void);
  touchProps?: PressableProps;
  delay?: number;
  children: ReactNode;
  disabled?: boolean;
}
type TouchRippleSingleMethods = {};
/**
 * component kết hợp cả ripple và single lại làm 1
 * @param props
 */
const TouchRippleSingle = React.forwardRef<
  TouchRippleSingleMethods,
  TouchRippleSingleProps
>((props, ref) => {
  const { children, onPress, touchProps, delay, disabled } = props;
  React.useImperativeHandle(ref, () => ({}));
  return (
    <TouchRipple
      disabled={disabled}
      style={styles.touch}
      {...touchProps}
      renderTouchComponent={(p) => <TouchSingle delay={delay || 300} {...p} />}
      hitSlop={defaultHislop}
      onPress={onPress}
    >
      {children}
    </TouchRipple>
  );
});

export default React.memo(TouchRippleSingle);
