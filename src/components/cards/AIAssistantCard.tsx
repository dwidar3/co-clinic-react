import React from 'react';
import { Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoCard from '../global/InfoCard';
import { useTranslation } from 'react-i18next';

const AIAssistantCard= () => {

  const {t} = useTranslation()

  return (
    <InfoCard
    title={t('featured.ai_assistant.title')}
    icon={<ChatIcon style={{ fontSize: 40, color: '#4CAF50' }} />}
    description={t('featured.ai_assistant.description')}
    highlights={[
      {
        icon: <EmojiObjectsIcon style={{ fontSize: 30, color: '#FF9800' }} />,
        text: t('featured.ai_assistant.benefits'),
      },
    ]}
    button={{ text: t('featured.ai_assistant.cta'), href: '/aichat' }}
  />
  );
};

export default AIAssistantCard;
