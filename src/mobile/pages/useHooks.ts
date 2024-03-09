import { setIsDark } from '@/common/redux/state/appConfig';
import { setAppData } from '@/common/redux/state/appData';
import React, { useEffect } from 'react';
import {
  LayoutChangeEvent,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';

export function useHooks() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

  useEffect(() => {
    dispatch(setIsDark(colorScheme === 'dark'));
  }, [colorScheme]);

  useEffect(() => {
    height && dispatch(setAppData({ allAreaHeight: height }));
  }, [height]);

  const onSafeAreaLayout = (event: LayoutChangeEvent) => {
    const { width, height: h, x, y } = event.nativeEvent.layout;
    h && dispatch(setAppData({ safeAreaHeight: h, safeAreaTop: y }));
  };

  return { onSafeAreaLayout };
}
