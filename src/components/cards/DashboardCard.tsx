import React from 'react';
import { Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const DashboardCard = () => {
  const {t} = useTranslation()
  return (
    <InfoCard
      title={t('featured.coming_soon.dashboard.title')}
      icon={<DashboardIcon style={{ fontSize: 40, color: '#2196F3' }} />}
      description={t('featured.coming_soon.dashboard.description')}
      highlights={[
        {
          icon: <TrendingUpIcon style={{ fontSize: 30, color: '#4CAF50' }} />,
          text: t('featured.coming_soon.dashboard.benefits'),
        },
      ]}
      button={{ text: t('featured.coming_soon.dashboard.cta') }}
    />
  );
};

export default DashboardCard;
