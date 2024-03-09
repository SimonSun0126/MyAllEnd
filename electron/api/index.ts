import { PostRequest } from '@/common/utils/types/func';
import { net } from 'electron';
import querystring from 'querystring';

const BASE_URL = 'http://google.com/';

export const requestPost: PostRequest = (
  url: string,
  data: any,
  cookies: string,
) => {
  return new Promise((resolve, reject) => {
    let dataStr = querystring.stringify(data);
    const request = net.request({
      method: 'POST',
      url: BASE_URL + url,
    });
    request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setHeader('Cookie', cookies);
    request.write(dataStr);

    request.on('response', response => {
      const headers = response.headers;
      let setCookie = '';
      if (headers['set-cookie']) {
        setCookie = headers['set-cookie'][0];
      }
      const chunks: Buffer[] = [];
      response.on('data', res => {
        chunks.push(res);
      });
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          res: buffer.toString(),
          netCode: response.statusCode,
          setCookie,
          err: undefined,
        });
      });
      response.on('error', (err: any) => {
        resolve({
          res: undefined,
          netCode: response.statusCode,
          setCookie,
          err,
        });
      });
    });

    request.on('abort', (err: any) => {
      resolve({
        res: undefined,
        netCode: 4041,
        setCookie: '',
        err,
      });
    });

    request.on('error', (err: any) => {
      resolve({
        res: undefined,
        netCode: 4042,
        setCookie: '',
        err,
      });
    });

    request.end();
  });
};
