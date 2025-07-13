import React from 'react';
import { Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const CrisisSupportCard = () => {
  const {t} = useTranslation()
  return (
    <InfoCard
    title={t('featured.coming_soon.crisis.title')}
    icon={<PhoneIcon style={{ fontSize: 40, color: '#F44336' }} />}
    description={t('featured.coming_soon.crisis.description')}
    highlights={[
      {
        icon: <EmojiObjectsIcon style={{ fontSize: 30, color: '#FF9800' }} />,
        text: t('featured.coming_soon.crisis.benefits'),
      },
    ]}
    button={{ text: t('featured.coming_soon.crisis.cta') }}
  />
  );
};

export default CrisisSupportCard;
