import { ipcRenderer } from 'electron';
import { PostRequest } from '@/common/utils/types/func';
export const postRequest: PostRequest = (url, data, cookies) => {
  return new Promise((resolve, reject) => {
    ipcRenderer
      .invoke('request-post', { url, data, cookies })
      .then(arg => {
        const { res, err, netCode, setCookie } = arg || {};
        let resObj;
        try {
          resObj = JSON.parse(res);
        } catch (e) {
          resObj = undefined;
        }
        resolve({
          res: resObj,
          err,
          netCode,
          setCookie,
        });
      })
      .catch(err => {
        resolve({
          res: undefined,
          err,
          netCode: 0,
          setCookie: '',
        });
      });
  });
};
