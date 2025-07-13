import React from 'react';
import { Button } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const PersonalizedRecoveryCard = () => {
  const {t} = useTranslation()
  return (

    <InfoCard
      title={t('featured.recovery.title')}
      icon={<HealingIcon style={{ fontSize: 40, color: '#FFEB3B' }} />}
      description={t('featured.recovery.description')}
      highlights={[
        {
          icon: <EmojiObjectsIcon style={{ fontSize: 30, color: '#FF9800' }} />,
          text: t('featured.recovery.benefits')
        }
      ]}
      button={{text: t('featured.recovery.cta')}}
    >

    </InfoCard>
  );
};

export default PersonalizedRecoveryCard;
