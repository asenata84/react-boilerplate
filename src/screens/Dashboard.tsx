import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const isAuthenticated = true; // TODO check
  const { t } = useTranslation();

  return (
    <div>
      {isAuthenticated && (
        <h1>{t('dashboard')}</h1>
      )}
    </div>
  );
};

export default memo(Dashboard);
