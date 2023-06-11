// import React, { ReactNode } from 'react';
// import { StyleSheet } from 'react-native';
// import LinearGradient, {
//   LinearGradientProps,
// } from 'react-native-linear-gradient';
// import TouchRippleSingle from './TouchRippleSingle';

// interface IProps extends Omit<LinearGradientProps, 'colors'> {
//   children: ReactNode;
//   color?: any;
//   onPress: () => void;
//   disabled?: boolean;
// }
// type OProps = {};
// const LinearGradientButton = React.forwardRef<OProps, IProps>((props, ref) => {
//   const { children, color = ['#B455A0', '#62267B'], onPress, disabled } = props;
//   React.useImperativeHandle(ref, () => ({}));
//   return (
//     <TouchRippleSingle onPress={onPress} disabled={disabled}>
//       <LinearGradient
//         style={styles.linearGradient}
//         colors={color}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         {...props}
//       >
//         {children}
//       </LinearGradient>
//     </TouchRippleSingle>
//   );
// });
// export default React.memo(LinearGradientButton);
// const styles = StyleSheet.create({
//   linearGradient: { borderRadius: 8 },
// });
