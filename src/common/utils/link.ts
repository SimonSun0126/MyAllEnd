import { Alert, Linking, Platform } from 'react-native';

export const openMarket = ({ androidAddress = '', iOSAddress = '' }) => {
  const linkingUrl =
    Platform.OS === 'ios'
      ? `itms-apps://itunes.apple.com/cn/app/${iOSAddress}`
      : `market://details?id=${androidAddress}`;
  Linking.canOpenURL(linkingUrl).then(async supported => {
    if (supported) {
      Linking.openURL(linkingUrl);
    } else {
    }
  });
};

export const openWebBrowser = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
    }
  });
};
