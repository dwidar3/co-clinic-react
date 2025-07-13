import React from 'react';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ChatInput = ({ value, onChange, onKeyPress, language, disabled }) => {
  const {t} = useTranslation()
  return (
    <TextField
      fullWidth
      multiline
      minRows={1}
      maxRows={4}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      disabled={disabled}
      placeholder={t('chat.type_here')}
      
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '50px',
          padding: '8px 20px',
          fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Abel', sans-serif",
          fontSize: language === 'ar' ? '1.1rem' : '1rem',
          direction: language === 'ar' ? 'rtl' : 'ltr',
          '& fieldset': {
            borderColor: '#e2e8f0',
          },
          '&:hover fieldset': {
            borderColor: '#cbd5e0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#4299e1',
            boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
          },
        },
      }}
    />
  );
};

export default ChatInput;