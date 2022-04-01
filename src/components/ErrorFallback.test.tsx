import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from 'components/test-utils';
import { store } from 'store';
import { initialState, setError } from 'store/slices/error';
import ErrorFallback from './ErrorFallback';

test('ErrorFallback should render correctly', async () => {
  store.dispatch(setError({
    message: 'ErrorMessage',
    errorTitle: 'ErrorTitle',
  }));

  render(<ErrorFallback />);

  const errorMessage = screen.getByText(/ErrorMessage/i);
  const errorTitle = screen.getByText(/ErrorMessage/i);

  expect(errorMessage).toBeInTheDocument();
  expect(errorTitle).toBeInTheDocument();
});

test('ErrorFallback should render correctly with props', async () => {
  const error = {
    name: 'ErrorName',
    message: 'PropsErrorMessage',
  };

  const handleReset = jest.fn();

  render(<ErrorFallback
    error={error}
    resetErrorBoundary={handleReset}
  />);

  const closeBtn = screen.getByRole('button', {
    name: /close/i,
  });

  const errorMessage = screen.getByText(/PropsErrorMessage/i);

  expect(errorMessage).toBeInTheDocument();

  fireEvent.click(closeBtn);

  await waitFor(() => {
    expect(handleReset).toHaveBeenCalled();
    expect(errorMessage).not.toBeInTheDocument();
    expect(store?.getState()?.error).toStrictEqual(initialState);
  });
});

test('ErrorFallback should render correctly with `resetErrorBoundary` undefined', async () => {
  const error = {
    name: 'ErrorName',
    message: 'PropsErrorMessage',
  };

  const handleReset = jest.fn();

  render(<ErrorFallback
    error={error}
    resetErrorBoundary={undefined}
  />);

  const closeBtn = screen.getByRole('button', {
    name: /close/i,
  });

  const errorMessage = screen.getByText(/PropsErrorMessage/i);

  expect(errorMessage).toBeInTheDocument();

  fireEvent.click(closeBtn);

  await waitFor(() => {
    expect(handleReset).not.toHaveBeenCalled();
    expect(errorMessage).not.toBeInTheDocument();
    expect(store?.getState()?.error).toStrictEqual(initialState);
  });
});

test('ErrorFallback should render correctly with AUTHENTICATION_ERROR', async () => {
  store.dispatch(setError({
    message: 'ErrorMessage',
    errorTitleKey: 'errors:errorCode.AUTHENTICATION_ERROR',
  }));

  render(<ErrorFallback />);

  await waitFor(() => {
    expect(store?.getState()?.user?.isAuthenticated).toBe(false);
  });
});
