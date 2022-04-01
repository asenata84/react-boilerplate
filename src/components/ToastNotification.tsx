import { useEffect } from 'react';
import { notificationSelector } from 'store/slices/notification';
import { useAppSelector, useAppDispatch } from 'app/hooks/hooks';
import { useTranslation } from 'react-i18next';
import { resetNotification } from 'store/events';

const ToastNotification = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['notifications']);
  const appNotification = useAppSelector(notificationSelector);
  const {
    isOpen,
    // type = 'INFO',
    titleKey,
    text,
    textKey,
    title,
    autoHideDuration = 0,
  } = appNotification || {};

  // const colors = {
  //   INFO: { background: '#95b4ed', color: '#0f2c60' },
  //   WARNING: { background: '#efdcb7', color: '#674d1b' },
  //   SUCCESS: { background: '#679f85', color: '#fff' },
  //   ERROR: { background: '#c57272', color: '#5a0a00' },
  // };

  const handleClose = () => {
    dispatch(resetNotification());
  };

  useEffect(() => {
    autoHideDuration > 0 && setTimeout(() => handleClose(), autoHideDuration);
  }, [autoHideDuration]);

  return !isOpen ? null : (
    <button
      type="button"
      onClick={handleClose}
    >
      {(title || titleKey) && <h3>{title || (titleKey && t(`notifications:${titleKey}`))}</h3>}
      {(text || textKey) && <p>{text || (textKey && t(`notifications:${textKey}`))}</p>}
    </button>
  );
};

export default ToastNotification;
