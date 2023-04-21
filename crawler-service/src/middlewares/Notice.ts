import { NOTICE_API } from '@config/Envs';
import got from 'got';

const saveNotice = async (data): Promise<boolean> => {
  const result = await got.post(`${NOTICE_API}/notice`, data).json();
  return !!result;
};

export {
  saveNotice,
};
