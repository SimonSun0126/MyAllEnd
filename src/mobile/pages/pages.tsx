import '@/common/locales/index';
import {
  mobileAntdTheme,
  mobileStatusBarColor,
  useMobileBaseTheme,
} from '@/common/utils/const/theme';
import { PageType } from '@/common/utils/types';
import { Store } from '@/common/utils/types/state';
import { Provider } from '@ant-design/react-native';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './mainPage';
import { useHooks } from './useHooks';

export default () => {
  const state = useSelector((store: Store) => store.appDataState);
  const appConfig = useSelector((store: Store) => store.appConfigState);
  const dispatch = useDispatch();
  const styles = useMobileBaseTheme(rawStyles);
  const { onSafeAreaLayout } = useHooks();

  return (
    <Provider theme={mobileAntdTheme(appConfig.isDark)}>
      <View style={styles.pages}>
        <StatusBar barStyle={mobileStatusBarColor(appConfig.isDark)} />
        {/* zIndex=1 */}
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.pagesWrap} onLayout={onSafeAreaLayout}>
            {state.nowPage === PageType.Main && (
              <MainPage />
            )}
          </View>
        </SafeAreaView>
      </View>
    </Provider>
  );
};

const rawStyles = StyleSheet.create({
  pagesWrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
  pages: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
  safeArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
});
