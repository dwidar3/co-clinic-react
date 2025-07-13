import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, Box, Typography, TextField, Button, 
  List, ListItem, ListItemText, CircularProgress, 
  Avatar, IconButton, Alert 
} from '@mui/material';
import { Send, Refresh, ErrorOutline } from '@mui/icons-material';
import axios from '../utils/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const SelfChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch chat history on mount
  useEffect(() => {
    let response
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/self-chatbot/chats');
        const formattedMessages = response?.data?.data?.map(chat => ({
          id: chat._id,
          text: chat.question,
          isUser: true,
          timestamp: chat.createdAt
        })).concat(
          response.data.data.map(chat => ({
            id: `res-${chat._id}`,
            text: chat.response, 
            isUser: false,
            timestamp: chat.createdAt
          }))
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        setMessages(formattedMessages);
      } catch (err) {
        setError('Failed to load chat history');
      }
    };
    fetchChats();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a question');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setError('');
    
    try {
      // Add user message immediately
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        isUser: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      // Get bot response
      const response = await axios.post('http://localhost:3000/api/self-chatbot/ask', {
        question: inputValue
      });
      
      // Add bot response
      const botMessage = {
        id: `res-${Date.now()}`,
        text: response.data.response.output,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get response');
      // Add error message to chat
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRefresh = async () => {
    setError('');
    try {
      setIsLoading(true);
      const response = await axios.delete('http://localhost:3000/api/self-chatbot/delete-log');
      console.log(response.status)
      setMessages([]);
      toast.success('Messages Deleted Successfully')
    } catch (err) {
      setError('Failed to delete chat');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessages = (chats) => {
    return chats.map(chat => ({
      id: chat._id,
      text: chat.question,
      isUser: true,
      timestamp: chat.createdAt
    })).concat(
      chats.map(chat => ({
        id: `res-${chat._id}`,
        text: chat.response,
        isUser: false,
        timestamp: chat.createdAt
      }))
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };


  return (

    <div className='w-full h-full bg-[#f0faf7] '>
          <Container maxWidth="md" sx={{ py: 4, height: '100vh', display: 'flex', flexDirection: 'column' }} >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Health Assistant
        </Typography>
        <Button 
          variant="outlined"

          startIcon={<Refresh />}
          onClick={handleRefresh}
          disabled={isLoading}
          className='hover:!text-red-700 hover:!border-red-700 duration-50'
        >
          Delete History
        </Button>
      </Box>

      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        mb: 2, 
        p: 2, 
        borderRadius: 2, 
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider'
      }}>
        {messages.length === 0 ? (
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            textAlign: 'center',
            color: 'text.secondary'
          }}>
            <ErrorOutline sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h6">No conversation history</Typography>
            <Typography variant="body1">Ask your first question to get started</Typography>
          </Box>
        ) : (
          <List>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListItem sx={{ 
                    justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    py: 1.5
                  }}>
                    {!message.isUser && (
                      <Avatar sx={{ 
                        bgcolor: message.isError ? 'error.main' : 'primary.main', 
                        mr: 2,
                        mt: 0.5
                      }}>
                        H
                      </Avatar>
                    )}
                    
                    <ListItemText
                      sx={{
                        maxWidth: '75%',
                        bgcolor: message.isUser 
                          ? 'primary.light' 
                          : message.isError 
                            ? 'error.light' 
                            : 'grey.100',
                        color: message.isError ? 'error.contrastText' : 'inherit',
                        borderRadius: 4,
                        px: 3,
                        py: 2,
                        '& .MuiListItemText-primary': {
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }
                      }}
                      primary={message.text}
                      secondary={new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      secondaryTypographyProps={{
                        color: message.isError ? 'error.contrastText' : 'text.secondary',
                        fontSize: '0.75rem',
                        mt: 0.5
                      }}
                    />
                    
                    {message.isUser && (
                      <Avatar sx={{ 
                        bgcolor: 'grey.500', 
                        ml: 2,
                        mt: 0.5
                      }}>
                        U
                      </Avatar>
                    )}
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </List>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about your health concern..."
          variant="outlined"
          disabled={isLoading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          sx={{ height: 56, minWidth: 56 }}
        >
          {isLoading ? <CircularProgress size={24} /> : <Send />}
        </Button>
      </Box>
    </Container>
    </div>


  );
};

export default SelfChatbotPage;
