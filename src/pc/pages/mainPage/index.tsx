import { Store } from '@/common/utils/types/state';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
React.version;

export default () => {
  const appConfig = useSelector((store: Store) => store.appConfigState);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="main-page">
      <div className='flex center bg-red-500'>
        <Button>click me</Button>
      </div>
    </div>
  );
};
