// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from 'test/server';

window.scroll = jest.fn();
jest.setTimeout(30000);
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: any) => {
      switch (key) {
        case 'dateFormats:date-picker.standard':
          return 'yyyy/MM/dd';

        default:
          return key;
      }
    },
    i18n: { changeLanguage: () => { } },
  }),
}));

beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
