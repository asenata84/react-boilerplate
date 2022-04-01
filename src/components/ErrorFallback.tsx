import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { errorSelector, resetError } from 'store/slices/error';
import { useAppSelector, useAppDispatch } from 'app/hooks/hooks';
import { ErrorFallbackPropsType } from 'types/GeneralTypes';
import { logout } from 'store/slices/user';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackPropsType) => {
  const dispatch = useAppDispatch();
  const appError = useAppSelector(errorSelector);
  // const { t } = useTranslation(['errors', 'common']);

  const onClose = () => {
    dispatch(resetError());
    resetErrorBoundary && resetErrorBoundary();
  };

  useEffect(() => {
    // TODO
  }, [error, appError]);

  useEffect(() => {
    if (appError?.errorTitleKey === 'AUTHENTICATION_ERROR') {
      dispatch(logout());
    }
  }, [appError?.errorTitleKey]);

  return (
    <button type="button" onClick={onClose}>Some Error Component here ...</button>
  );
};

export default ErrorFallback;
