import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment';

const ChatMessage = ({ message, isUser, language }) => {
  // Use 'timestamp' for client-side messages, 'date' for backend response, fallback to 'Unknown time'
  const formattedDate = message.timestamp 
    ? moment(message.timestamp).format('LLL') 
    : message.date 
    ? moment(message.date).format('LLL') 
    : 'Unknown time';

  return (
    <Box 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 max-w-[85%]`}
      >
        {!isUser && (
          <Avatar 
            sx={{ bgcolor: 'primary.main' }} 
            className="w-10 h-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Avatar>
        )}
        {isUser && (
          <Avatar 
            sx={{ bgcolor: 'secondary.main' }} 
            className="w-10 h-10"
          >
            {message.name?.charAt(0) || 'U'}
          </Avatar>
        )}
        <div className={`rounded-2xl px-4 py-3 ${isUser ? 'bg-blue-100 rounded-tr-none' : 'bg-gray-100 rounded-tl-none'}`}>
          <Typography 
            variant="body1" 
            className={`whitespace-pre-wrap ${message.isStreaming ? 'blinking-cursor' : ''}`}
            sx={{ 
              fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Abel', sans-serif",
              fontSize: language === 'ar' ? '1.1rem' : '1rem',
              lineHeight: 1.6
            }}
          >
            {message.content}
            {message.isStreaming && <span className="inline-block ml-1 w-2 h-4 bg-gray-500 animate-pulse"></span>}
          </Typography>
          <Typography 
            variant="caption" 
            display="block" 
            className={`text-gray-500 mt-1 ${isUser ? 'text-left' : 'text-right'}`}
          >
            {formattedDate}
          </Typography>
        </div>
      </motion.div>
    </Box>
  );
};

export default ChatMessage;