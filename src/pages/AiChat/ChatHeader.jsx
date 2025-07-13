import React from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ language, setLanguage, onClear }) => {
  const {t} = useTranslation()
  return (
    <Box className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
      <div className="flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <Typography variant="h6" className="font-bold">
            {t('chat.medical')}
          </Typography>
        </motion.div>
        
        <div className="flex items-center gap-2">          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outlined" 
              color="inherit"
              onClick={onClear}
              size="small"
              sx={{ 
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.5)'
                }
              }}
            >
              {t('chat.new')}
            </Button>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-2 text-sm opacity-80"
      >
        {t('chat.powerd_by')}
      </motion.div>
    </Box>
  );
};

export default ChatHeader;