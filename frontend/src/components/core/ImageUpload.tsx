'use client';

import { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  Stack,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Alert
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
}

// Custom styled components
const UploadArea = styled(Paper)(({ theme }) => ({
  border: '2px dashed',
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
  '&:hover': {
    borderColor: '#D4AF37',
    background: 'linear-gradient(135deg, #fef7e0 0%, #f8fafc 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.15)',
  },
  '&.drag-active': {
    borderColor: '#D4AF37',
    background: 'linear-gradient(135deg, #fef7e0 0%, #f8fafc 100%)',
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.2)',
  },
}));

const ImagePreviewCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
  border: '2px solid #10b981',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
  },
}));

export default function ImageUpload({ onImageSelect, selectedImage }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    onImageSelect(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onImageSelect(null as unknown as File);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {previewUrl ? (
        <ImagePreviewCard>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: '#10b981', color: 'white' }}>
                <CheckIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6" fontWeight={600} color="#065f46">
                Image Selected Successfully
              </Typography>
            }
            subheader={`${selectedImage?.name} (${selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB)`}
            action={
              <IconButton onClick={removeImage} color="error" size="large">
                <DeleteIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                src={previewUrl}
                alt="Preview"
                sx={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  objectFit: 'contain',
                }}
              />
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                <Chip
                  icon={<CheckIcon />}
                  label="Valid Image"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  label={`${selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB`}
                  color="primary"
                  variant="outlined"
                />
              </Stack>
            </Box>
          </CardContent>
        </ImagePreviewCard>
      ) : (
        <UploadArea
          className={dragActive ? 'drag-active' : ''}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <Stack spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: dragActive ? '#D4AF37' : 'grey.100',
                color: dragActive ? '#0A1F44' : 'grey.600',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <UploadIcon sx={{ fontSize: 40 }} />
            </Avatar>
            
            <Box>
              <Typography variant="h6" fontWeight={600} color="#0A1F44" gutterBottom>
                {dragActive ? 'Drop your image here' : 'Click to upload or drag and drop'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PNG, JPG, JPEG, WebP (max 10MB)
              </Typography>
            </Box>

            <StyledButton
              variant="outlined"
              startIcon={<ImageIcon />}
              sx={{
                borderColor: '#0A1F44',
                color: '#0A1F44',
                '&:hover': {
                  bgcolor: '#0A1F44',
                  color: 'white',
                }
              }}
            >
              Choose Image
            </StyledButton>
          </Stack>
        </UploadArea>
      )}

      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleChange}
      />

      {!selectedImage && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Tip:</strong> Use high-quality images (minimum 500x500 pixels) for the best NFT presentation.
          </Typography>
        </Alert>
      )}
    </Box>
  );
}
