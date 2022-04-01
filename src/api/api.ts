import request from './request';

export const fetchExampleRequest = (
  token: string,
) => request({
  token,
  url: '/some/endpoint',
});

export const saveExampleRequest = (
  token: string,
  data: any,
) => request({
  token,
  method: 'POST',
  payload: data,
  url: 'some/endpoint',
});

export function fetchCountRequest(amount = 1) {
  return new Promise<{ data: number }>((resolve) => {
    setTimeout(() => resolve({ data: amount }), 500);
  });
}
