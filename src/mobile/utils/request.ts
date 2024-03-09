import { saveAllCookies } from '@/common/utils/cookies';
import { PostRequest } from '@/common/utils/types/func';
import querystring from 'querystring';
const BaseUrl = 'https://google.com/';
export const postRequest: PostRequest = (url, data, cookies) => {
  return new Promise(async (resolve, reject) => {
    fetch(BaseUrl + url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        cookie: cookies,
      },
      body: querystring.stringify(data),
    })
      .then(res => {
        const setCookies = res.headers.get('Set-Cookie') || '';
        saveAllCookies(setCookies);
        resolve({
          res: res.json(),
          netCode: res.status,
          setCookie: setCookies,
          err: undefined,
        });
      })
      .catch(err => {
        resolve({
          res: undefined,
          netCode: 0,
          setCookie: '',
          err: err,
        });
      });
  });
};
