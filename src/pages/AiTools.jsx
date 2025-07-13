import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Typography, Grid, Button, 
  Card, CardContent, CardMedia, useMediaQuery, 
  useTheme, Chip, Slide, Grow, Fade, Zoom
} from '@mui/material';
import { 
  LocalHospital, Chat, CloudUpload, 
  SmartToy, Psychology, MedicalServices 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

const AIToolsShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState(null);
  
  const aiTools = [
    {
      id: 'gemini-doctor',
      title: 'Gemini Doctor',
      description: 'AI-powered medical diagnosis assistant that provides preliminary assessments based on your symptoms and medical history.',
      icon: <LocalHospital fontSize="large" />,
      color: '#0f3d3e',
      image: '/gemini-doctor.png',
      features: ['Symptom analysis', 'Condition matching', 'Recommendations', 'Medical insights'],
      path: '/gemini'
    },
    {
      id: 'self-bot',
      title: 'Self Health Bot',
      description: 'Personal health companion that answers your health questions, tracks your wellness journey, and provides personalized advice.',
      icon: <Chat fontSize="large" />,
      color: '#8dbbb4',
      image: '/health-bot.png',
      features: ['24/7 availability', 'Personalized advice', 'Health tracking', 'Wellness tips'],
      path: '/self-bot'
    },
    {
      id: 'pneumonia-checker',
      title: 'Pneumonia Checker',
      description: 'Advanced image analysis tool that detects signs of pneumonia in chest X-rays with medical-grade accuracy.',
      icon: <CloudUpload fontSize="large" />,
      color: '#6d9c94',
      image: '/pneumonia-checker.png',
      features: ['Image analysis', 'Instant results', 'Medical-grade accuracy', 'History tracking'],
      path: '/pneumonia'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTool(prev => {
        if (prev === null) return 0;
        return (prev + 1) % aiTools.length;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 800, 
            mb: 2,
            background: 'linear-gradient(45deg, #0f3d3e 30%, #6d9c94 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          AI-Powered Health Tools
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Harness the power of artificial intelligence for better health insights, diagnosis, and personal wellness
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
        {aiTools.map((tool, index) => (
          <Grid item xs={12} md={4} key={tool.id}>
            <motion.div
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderLeft: `4px solid ${tool.color}`,
                  position: 'relative',
                  overflow: 'visible',
                  bgcolor: activeTool === index ? '#f8f9fa' : 'background.paper'
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -20, 
                    left: 20, 
                    bgcolor: tool.color, 
                    color: 'white', 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: 3
                  }}
                >
                  {tool.icon}
                </Box>
                
                <CardContent sx={{ pt: 7, pb: 3, flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {tool.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {tool.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2, mb: 3 }}>
                    {tool.features.map((feature, i) => (
                      <Chip 
                        key={i} 
                        label={feature} 
                        size="small" 
                        sx={{ 
                          mr: 1, 
                          mb: 1, 
                          bgcolor: `${tool.color}22`,
                          color: tool.color,
                          fontWeight: 500 
                        }} 
                      />
                    ))}
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: tool.color, 
                      '&:hover': { bgcolor: `${tool.color}cc` },
                      mt: 'auto'
                    }}
                    onClick={() => navigate(tool.path)}
                  >
                    Try {tool.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ 
        bgcolor: '#f8f9fa', 
        borderRadius: 4, 
        p: 4, 
        mb: 8,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          width: '50%', 
          height: '100%', 
          bgcolor: '#0f3d3e', 
          opacity: 0.05,
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
          zIndex: 0
        }} />
        
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              How Our AI Tools Work
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Our AI-powered health tools combine cutting-edge technology with medical expertise to provide you with reliable health insights.
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                bgcolor: '#0f3d3e', 
                color: 'white', 
                width: 36, 
                height: 36, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
              }}>
                1
              </Box>
              <Box>
                <Typography variant="h6">Input Your Data</Typography>
                <Typography variant="body2" color="text.secondary">
                  Provide symptoms, questions, or upload medical images
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                bgcolor: '#0f3d3e', 
                color: 'white', 
                width: 36, 
                height: 36, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
              }}>
                2
              </Box>
              <Box>
                <Typography variant="h6">AI Analysis</Typography>
                <Typography variant="body2" color="text.secondary">
                  Our algorithms process your input with medical knowledge
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                bgcolor: '#0f3d3e', 
                color: 'white', 
                width: 36, 
                height: 36, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
              }}>
                3
              </Box>
              <Box>
                <Typography variant="h6">Get Insights</Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive personalized, actionable health insights
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              position: 'relative', 
              height: 300,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
              {/* This would be an animated demo in a real app */}
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: '#e9f5f1'
              }}>
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <SmartToy sx={{ fontSize: 100, color: '#6d9c94' }} />
                </motion.div>
                
                <Box sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  left: 20, 
                  bgcolor: 'white', 
                  p: 1.5, 
                  borderRadius: 2,
                  boxShadow: 1
                }}>
                  <Typography variant="body2" fontWeight={500}>
                    Analyzing health data...
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 20, 
                  right: 20, 
                  bgcolor: '#0f3d3e', 
                  color: 'white', 
                  p: 1.5, 
                  borderRadius: 2
                }}>
                  <Typography variant="body2" fontWeight={500}>
                    Results ready!
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Trusted by Medical Professionals
        </Typography>
        
        <Grid container justifyContent="center" spacing={4} sx={{ mt: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item key={item}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box sx={{ 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  bgcolor: '#e9f5f1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto'
                }}>
                  <MedicalServices sx={{ fontSize: 50, color: '#0f3d3e' }} />
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Dr. {['Ali', 'Mohammed', 'Sarah', 'Fatima'][item-1]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {['Cardiologist', 'Radiologist', 'General Practitioner', 'Pulmonologist'][item-1]}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AIToolsShowcase;