import { isDev } from '@/common/utils';
import { message } from 'antd';
import i18next from 'i18next';
import { machineIdSync } from 'node-machine-id';
import pkg from '../../../package.json';

const t = i18next.t;

export function addErrorListener() {
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    if (
      typeof msg === 'string' &&
      msg.includes('ResizeObserver loop limit exceeded')
    ) {
      return;
    }
    if (!isDev()) {
      let deviceId = machineIdSync();
      const version = pkg.version;
    }
  };
}
