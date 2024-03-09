import _ from 'lodash';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../types/state';
React.version;

export function mobileStatusBarColor(isDark: boolean) {
  return isDark ? 'light-content' : 'dark-content';
}

export function mobileBackgroundColor(isDark: boolean) {
  return isDark ? 'rgb(17, 17, 17)' : 'white';
}

export function mobileAntdTheme(isDark: boolean) {
  return {};
}
export function mobileHeaderTextColor(isDark: boolean) {
  return isDark ? 'rgb(150, 150, 150)' : 'rgba(89, 106, 123, 0.8)';
}

export function mobileItemAttachBackgroundColor(isDark: boolean) {
  return isDark ? 'rgb(29, 29, 29)' : 'rgb(244, 244, 244)';
}

export function mobileUserDividerColor(isDark: boolean) {
  return isDark ? '#222222' : '#f1f1f1';
}

export function mobileUserBottomBorderColor(isDark: boolean) {
  return isDark ? '#333333' : '#e4e4e4';
}

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

function mobileBaseTheme<T extends { [key: string]: any }>(
  styles: NamedStyles<T>,
  isDark: boolean,
): NamedStyles<T> {
  const baseStyle: ViewStyle | TextStyle | ImageStyle = {
    color: isDark ? '#eeeeee' : 'black',
  };
  const newStyles: any = {};
  for (const key of Object.keys(styles)) {
    if (styles[key]) {
      const existBackgroundColor = styles[key].backgroundColor;
      newStyles[key] = { ...baseStyle, ...styles[key] };
      if (
        existBackgroundColor === mobileBackgroundColor(true) ||
        existBackgroundColor === mobileBackgroundColor(false)
      ) {
        newStyles[key].backgroundColor = mobileBackgroundColor(isDark);
      }
    }
  }
  return newStyles;
}

export function useMobileBaseTheme<T extends { [key: string]: any }>(
  styles: NamedStyles<T>,
) {
  const isDark = useSelector((store: Store) => store.appConfigState.isDark);
  const [newStyles, setNewStyles] = React.useState<NamedStyles<T>>(
    mobileBaseTheme(styles, isDark),
  );

  React.useEffect(() => {
    setNewStyles(mobileBaseTheme(styles, isDark));
  }, [isDark]);

  return newStyles;
}
