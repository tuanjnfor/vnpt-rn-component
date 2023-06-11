import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from 'react-native';
import React from 'react';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { Input } from '../index';
import Thumb from '../../Thumb';
import type { ITextInputBaseProps, RefInput } from '../../types';
import { fontSizeLine, heightLize, widthLize } from '../../Responsive';
import { TouchRippleSingle } from '../../Button';
import { Icons } from '../../Icon';

export interface IInputWithLable extends ITextInputBaseProps {
  label: string;
  borderColor?: string;
  inputPadding?: number | number[];
  color?: string;
  regex?: RegExp;
  messageError?: string;
}
export type OInputWithLable = {};
const InputWithLable = React.forwardRef<OInputWithLable, IInputWithLable>(
  (props, ref) => {
    const {
      color = '#fff',
      label,
      borderColor = '#2196F3',
      inputPadding = 10,
      onFocus,
      onBlur,
      value,
      onChangeText,
      regex,
      messageError,
      ...rest
    } = props;
    const [valueInput, setValueInput] = React.useState<string | undefined>(
      value
    );
    const [selected, setSelected] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [showError, setShowError] = React.useState<boolean>(false);
    const refInput = React.useRef<RefInput>(null);
    React.useImperativeHandle(ref, () => ({}));
    const onFocusHandle = React.useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setSelected(true);
        onFocus?.(e);
      },
      [onFocus]
    );
    const onBlurHandle = React.useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setShowDelete(false);
        setSelected(false);
        onBlur?.(e);
      },
      [onBlur]
    );
    const onChangeTextHandle = React.useCallback(
      (e: string) => {
        setValueInput(e);
        setShowError(false);
        onChangeText?.(e);
        if (e && selected) {
          setShowDelete(true);
        }
      },
      [onChangeText, selected]
    );
    const clearInput = React.useCallback(() => {
      refInput?.current?.clear();
    }, []);
    React.useEffect(() => {
      if (selected && valueInput && !showDelete) {
        setShowDelete(true);
      }
    }, [selected, showDelete, value, valueInput]);
    React.useEffect(() => {
      if (!selected && value && regex) {
        const rs = regex.test(value);
        setShowError(!rs);
      }
    }, [regex, selected, value]);
    return (
      <Box>
        <Box
          borderColor={
            showError ? 'red' : selected ? borderColor : 'transparent'
          }
          borderWidth={1}
          radius={5}
          padding={inputPadding}
          width={'100%'}
          color={!selected ? color : 'transparent'}
          row
          center
        >
          <Box flex={1}>
            <Text size={12} marginBottom={heightLize(8)}>
              {label}
            </Text>

            <Input
              ref={refInput}
              numberOfLines={1}
              {...rest}
              padding={0}
              backgroundColor={!selected ? color : 'transparent'}
              value={valueInput}
              onChangeText={onChangeTextHandle}
              onFocus={onFocusHandle}
              onBlur={onBlurHandle}
            />
          </Box>
          <Box>
            {showDelete && (
              <TouchRippleSingle onPress={clearInput}>
                <Thumb
                  source={{
                    uri: Icons.ic_close_24,
                  }}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
              </TouchRippleSingle>
            )}
          </Box>
        </Box>
        {showError && messageError && (
          <Text
            size={fontSizeLine(12)}
            color={'red'}
            marginLeft={widthLize(14)}
            marginTop={heightLize(4)}
          >
            {messageError}
          </Text>
        )}
      </Box>
    );
  }
);

export default React.memo(InputWithLable);

const styles = StyleSheet.create({
  icon: {
    width: widthLize(12),
    height: heightLize(12),
  },
});
