import React from 'react';
import { Button } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const CommunitySupportCard = () => {
  const {t} = useTranslation()
  return (


    <InfoCard
    title={t('featured.coming_soon.community.title')}
    icon={<GroupIcon style={{ fontSize: 40, color: '#673AB7' }} />}
    description={t('featured.coming_soon.community.description')}
    highlights={[
      {
        icon: <EmojiObjectsIcon style={{ fontSize: 30, color: '#FF9800' }} />,
        text: t('featured.coming_soon.community.benefits'),
      },
    ]}
    button={{ text: t('featured.coming_soon.community.cta') }}
  />
  );
};

export default CommunitySupportCard;
