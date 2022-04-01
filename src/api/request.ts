import axios, { Method } from 'axios';
import environment from 'environment';

interface RequestParams {
  token?: string, url: string, method?: Method, payload?: any
}
const axiosInstance = axios.create({});

const request = async ({
  token,
  url,
  method = 'GET',
  payload,
}: RequestParams): Promise<any> => {
  const { data } = await axiosInstance.request({
    baseURL: environment.baseURL,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    data: payload,
  });

  return data;
};

export default request;
