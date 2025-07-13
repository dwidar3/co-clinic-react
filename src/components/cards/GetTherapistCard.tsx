import React from 'react';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const GetTherapistCard = () => {
  const {t} = useTranslation()
  return (
    <InfoCard
      title={t('featured.get_doctor.title')}
      icon={<PersonIcon style={{ fontSize: 40, color: '#FF5722' }} />}
      description={t('featured.get_doctor.description')}
      highlights={[
        {
          icon: <EmojiObjectsIcon style={{ fontSize: 30, color: '#FF9800' }} />,
          text: t('featured.get_doctor.benefits'),
        },
      ]}
      button={{ text: t('featured.get_doctor.cta'), href: '/livechat' }}
    />
  );
};

export default GetTherapistCard;
