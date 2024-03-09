import { PageType } from '@/common/utils/types';
import { Store } from '@/common/utils/types/state';
import { ConfigProvider, theme } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import MainPage from './mainPage';
React.version;
console.log('【process】', process);

function Pages() {
  const state = useSelector((store: Store) => store.appDataState);
  const appConfig = useSelector((store: Store) => store.appConfigState);
  const dispatch = useDispatch();

  return (
    <ConfigProvider
      theme={{
        algorithm: appConfig.isDark
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
        token: {
          colorPrimary: appConfig.isDark ? '#cccccc' : 'red',
        },
      }}>
      <div className="pages">
        {state.nowPage === PageType.Main && <MainPage />}
        {/* <Update /> */}
      </div>
    </ConfigProvider>
  );
}

export default Pages;
