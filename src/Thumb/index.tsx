import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { Box } from '../Box';

interface ThumbFallbackProps extends Omit<FastImageProps, 'source'> {
  //   sourceFallback?: string;
}

export interface ThumbProps extends FastImageProps {
  sourceFallback?: ImageSourcePropType;
  loadingColor?: string;
}

/**
 * component để hiển thị nền khi ảnh bị lỗi không load đc
 * @param props
 */
export const ThumbFallback: React.FC<ThumbFallbackProps> = (props: any) => {
  return (
    <Image {...props} source={props?.sourceFallback} resizeMode="contain" />
  );
};

/**
 * component thay thế hiển thị ảnh của app
 * sử dụng lại FastImage để hiển thị
 * handler loading + error
 * @param props
 */
const Thumb: React.FC<ThumbProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { style, onError, onLoad, children } = props;
  const {
    borderRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    borderTopLeftRadius,
  } = StyleSheet.flatten(style || {});

  const { source, loadingColor = '#62267B' } = props;

  useEffect(() => {
    if (Platform.OS === 'android') {
      // @ts-ignore
      if (source?.uri === '') {
        setLoading(false);
        // setError(true)
      }
    }
    return () => {
      setError(false);
      // setLoading(true)
    };
  }, [source]);

  const mouted = useRef<boolean>(true);
  useEffect(() => {
    mouted.current = true;
    return () => {
      mouted.current = false;
    };
  }, []);

  return (
    <Box style={style}>
      {error && !loading ? <ThumbFallback {...props} /> : null}
      {error ? null : (
        <FastImage
          {...props}
          onLoad={(e: any) => {
            setLoading(false);
            if (typeof onLoad === 'function') onLoad(e);
          }}
          onError={() => {
            setError(true);
            setLoading(false);
            if (typeof onError === 'function') onError();
          }}
        />
      )}
      {loading ? (
        <Box
          style={{
            borderRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            borderTopLeftRadius,
          }}
          center
          middle
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          color="rgba(0,0,0,0.4)"
        >
          <ActivityIndicator color={loadingColor} size="small" />
        </Box>
      ) : null}
      {children}
    </Box>
  );
};

export default React.memo(Thumb);
