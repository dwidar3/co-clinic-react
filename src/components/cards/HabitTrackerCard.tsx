import React from 'react';
import { Button } from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const HabitTrackerCard= () => {
  const {t} = useTranslation()
  return (
    <InfoCard 
      title={t('featured.tracker.title')}
      icon={<TrackChangesIcon style={{ fontSize: 40, color: '#607D8B' }} />}
      description={t('featured.tracker.description')}
      highlights={[
        {
          icon: <TrendingUpIcon style={{ fontSize: 30, color: '#4CAF50' }} />,
          text: t('featured.tracker.benefits'),
        },
      ]}
      button={{ text: t('featured.tracker.cta') }}
    />
  );
};

export default HabitTrackerCard;
