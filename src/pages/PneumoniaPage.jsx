import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, Box, Typography, Grid, Button, 
  CircularProgress, Card, CardMedia, CardContent, 
  Chip, Alert, IconButton 
} from '@mui/material';
import { CloudUpload, History, Cancel } from '@mui/icons-material';
import axios from '../utils/axiosInstance';
import { motion } from 'framer-motion';

const PneumoniaPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [scans, setScans] = useState([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Fetch scan history on mount
  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pneumonia/scans');
        setScans(response.data.scans);
      } catch (err) {
        setError('Failed to load scan history');
      }
    };
    fetchScans();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select a valid image file (JPEG, PNG)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleScan = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:3000/api/pneumonia/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setResult(response.data.result);
      setScans(prev => [response.data.scan, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className='w-full h-full bg-[#f0faf7] '>
    <Container maxWidth="lg" sx={{ py: 4 }} className='!bg-[#f0faf7]'>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Pneumonia Scan
      </Typography>

      <Grid container spacing={4}>
        {/* Scan Section */}
        <Grid item xs={12} md={6}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              sx={{
                border: '2px dashed',
                borderColor: previewUrl ? 'transparent' : 'primary.main',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                bgcolor: previewUrl ? 'transparent' : 'action.hover',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {previewUrl ? (
                <>
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <CardMedia
                      component="img"
                      image={previewUrl}
                      alt="Scan preview"
                      sx={{ 
                        borderRadius: 2,
                        maxHeight: 300,
                        objectFit: 'contain'
                      }}
                    />
                    <IconButton 
                      onClick={handleClear}
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'grey.200' }
                      }}
                    >
                      <Cancel />
                    </IconButton>
                  </Box>
                  
                  {result && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Chip
                        label={`Result: ${result}`}
                        color={result === 'NORMAL' ? 'success' : 'error'}
                        sx={{ 
                          mt: 2, 
                          fontSize: '1rem',
                          fontWeight: 700,
                          px: 3,
                          py: 1
                        }}
                      />
                    </motion.div>
                  )}
                </>
              ) : (
                <>
                  <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Upload Chest X-Ray Image
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Supported formats: JPEG, PNG (Max 5MB)
                  </Typography>
                  
                  <Button 
                    variant="contained"
                    component="label"
                    sx={{ mb: 2 }}
                  >
                    Select File
                    <input 
                      type="file" 
                      hidden 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Button>
                </>
              )}
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleScan}
                disabled={!selectedFile || isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
                fullWidth
              >
                {isLoading ? 'Analyzing...' : 'Scan for Pneumonia'}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleClear}
                disabled={!selectedFile || isLoading}
                fullWidth
              >
                Clear
              </Button>
            </Box>
          </motion.div>
        </Grid>

        {/* History Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <History sx={{ mr: 1 }} /> Scan History
          </Typography>
          
          {scans.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No previous scans found
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {scans.map((scan) => (
                <Grid item xs={12} sm={6} key={scan._id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        image={scan.imageUrl}
                        alt="Scan result"
                        sx={{ height: 140, objectFit: 'contain' }}
                      />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Chip
                          label={scan.prediction}
                          color={scan.prediction === 'NORMAL' ? 'success' : 'error'}
                          size="small"
                        />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          {new Date(scan.createdAt).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default PneumoniaPage;