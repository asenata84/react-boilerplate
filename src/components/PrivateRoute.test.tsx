import { screen } from '@testing-library/react';
import { mountComponent } from 'components/test-utils';
import { createHashHistory } from 'history';
import { store } from 'store';
import { setUser } from 'store/slices/user';
import { AccessUnit } from './Access/Access';
import PrivateRoute from './PrivateRoute';

const PATH = '/';
const history = createHashHistory();

beforeAll(() => {
  // eslint-disable-next-line max-len
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL3NxdWlycmVsbm9ucHJvZC5iMmNsb2dpbi5jb20vODUyYTI4YzgtMjg4OC00ZmM4LThhMzYtZWQyYjYyMDI4YjU3L3YyLjAvIiwiZXhwIjoxNjQ0NDQ3NjUyLCJuYmYiOjE2NDQ0MTE2NTIsImF1ZCI6IjY1NjU5ODYyLTMzYWEtNGM5Zi04MDUyLTkwY2NhNmMzOTAwOSIsIm9pZCI6IjRmMGNlZDUzLWMyNjQtNDYzOS04NDJhLWVmOGI0ZWE3NTRmMSIsInN1YiI6IjRmMGNlZDUzLWMyNjQtNDYzOS04NDJhLWVmOGI0ZWE3NTRmMSIsIm5hbWUiOiJXeW1hbiBMYXJraW4gUUEgQWRtaW4iLCJleHRlbnNpb25fRmluc2VydlVzZXJUeXBlIjoiQmFja09mZmljZSIsImV4dGVuc2lvbl9GaW5zZXJ2Um9sZXMiOiJUcmVhc3VyeU1hbmFnZXIsRkJPTWFuYWdlciIsInRmcCI6IkIyQ18xX0FkbWluX0xvZ2luX0RFViIsIm5vbmNlIjoiZjhlNTQxMmItYWVhYy00ZGY2LWEzZTAtYjIwNmY3MzA1ZmY0Iiwic2NwIjoiYWRtaW4ud3JpdGUiLCJhenAiOiIxMjllZTI2NS1hMmE4LTQyMzItYTJiNS03ZWM0YjM0YWQ3YjEiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2NDQ0MTE2NTJ9.b9q9Ge87f8pdk79OQcMFORJsh0oyHRPb3-ee-e9FMY65_4aG-h_unH4lcw-EFZLOIt0F7vfAj4yacHoM2N0lQdWSBlcl5PsB0kD6mkXP-Yo1711fJJcs3IQw_5J0Of2xl21geFPtpSm_N2IH1_20IH0oMciqX5vVtIiCUAJyKUAn0t7b3vU_aB-UsUBjcb9dKp7_u8dnLkEve3ngqX1yydzD4Z-HnrI1xBl05-NALqXoazVuGIe0HLycG88fGIBeHozOYRE8G3owecSViVds7T5--qAwdifhNT-qcQ8oxEgBh9r8Ypa_Bt2oyNRsisvoHqVzgh-alHQbS-hH8e7Jmw';
  const payload = {
    name: 'FirstName',
    email: 'email@gmail.com',
    isAuthenticated: true,
    accessToken,
  };
  store.dispatch(setUser(payload));
});

test('PrivateRoute should render correctly', async () => {
  history.replace(PATH);

  mountComponent(
    <PrivateRoute
      hasToken
    >
      <>SomeText</>
    </PrivateRoute>,
    PATH,
  );

  const childrenText = screen.getByText(/SomeText/i);

  expect(childrenText).toBeInTheDocument();
});

test('PrivateRoute should render correctly with hasToken=false', async () => {
  history.replace(PATH);

  mountComponent(
    <PrivateRoute
      hasToken={false}
    >
      <>SomeText</>
    </PrivateRoute>,
    PATH,
  );

  const childrenText = screen.queryByText(/SomeText/i);

  expect(childrenText).not.toBeInTheDocument();
});

test('PrivateRoute should render correctly with accessUnits', async () => {
  history.replace(PATH);

  mountComponent(
    <PrivateRoute
      hasToken
      all={[AccessUnit.CAN_READ_ALL]}
      oneOf={[AccessUnit.CAN_WRITE_ALL]}
    >
      <>SomeText</>
    </PrivateRoute>,
    PATH,
  );

  const childrenText = screen.queryByText(/SomeText/i);

  expect(childrenText).toBeInTheDocument();
});

test('PrivateRoute should render correctly with accessUnits and `not` property', async () => {
  history.replace(PATH);

  mountComponent(
    <PrivateRoute
      hasToken
      not
      all={[AccessUnit.CAN_READ_ALL]}
    >
      <>SomeText</>
    </PrivateRoute>,
    PATH,
  );

  const childrenText = screen.queryByText(/SomeText/i);

  expect(childrenText).toBeInTheDocument();
});
