import React from 'react';
import { Button } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const EducationalResourcesCard = () => {
  const {t} = useTranslation()
  return (
    <InfoCard
      title={t('featured.resources.title')}
      icon={<MenuBookIcon style={{ fontSize: 40, color: '#FFC107' }} />}
      description={t('featured.resources.description')}
      highlights={[
        {
          icon: <EmojiObjectsIcon style={{ fontSize: 30, color: '#FF9800' }} />,
          text: t('featured.resources.benefits'),
        },
      ]}
      button={{ text: t('featured.resources.benefits'), href: '/resource' }}
    />
  );
};

export default EducationalResourcesCard;
