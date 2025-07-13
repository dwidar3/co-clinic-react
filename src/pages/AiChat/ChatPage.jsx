import React from 'react';
import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import ChatContainer from '../AiChat/ChatContainer';
import { useSelector } from 'react-redux';

const ChatPage = () => {
//   const { userInfo } = useSelector(state => state?.auth || {
//     Token: "pla pla pla"
//   });
  

    const userInfo = {
        token: "pla pla pla"
    }
  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50"
>
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="flex-1 flex"
  >
    <ChatContainer user={userInfo} />
  </motion.div>
</motion.div>

  );
};

export default ChatPage;