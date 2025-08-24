'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Paper,
  Avatar,
  Alert,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import React from 'react'; // Added missing import for React.useEffect

interface Attribute {
  trait_type: string;
  value: string;
}

interface MetadataFormProps {
  metadata: {
    name: string;
    description: string;
    external_url: string;
    attributes: Attribute[];
  };
  onMetadataChange: (metadata: {
    name: string;
    description: string;
    external_url: string;
    attributes: Attribute[];
  }) => void;
}

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-1px)',
  },
}));

const AttributeRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.5),
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#D4AF37',
    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.1)',
  },
}));

export default function MetadataForm({ metadata, onMetadataChange }: MetadataFormProps) {
  const [newAttribute, setNewAttribute] = useState({ trait_type: '', value: '' });
  
  const [attributeErrors, setAttributeErrors] = useState<{[key: number]: {trait_type?: boolean, value?: boolean}}>({});
  const [newAttributeErrors, setNewAttributeErrors] = useState<{trait_type?: boolean, value?: boolean}>({});

  const handleInputChange = (field: string, value: string) => {
    onMetadataChange({
      ...metadata,
      [field]: value,
    });
  };

  const addAttribute = () => {
    const errors = validateAttribute(newAttribute.trait_type, newAttribute.value);
    setNewAttributeErrors(errors);
    
    if (!errors.trait_type && !errors.value) {
      const attribute: Attribute = {
        trait_type: newAttribute.trait_type.trim(),
        value: newAttribute.value.trim(),
      };
      
      onMetadataChange({
        ...metadata,
        attributes: [...metadata.attributes, attribute],
      });
      
      setNewAttribute({ trait_type: '', value: '' });
      setNewAttributeErrors({});
    }
  };

  const removeAttribute = (index: number) => {
    const newAttributes = metadata.attributes.filter((_, i) => i !== index);
    onMetadataChange({
      ...metadata,
      attributes: newAttributes,
    });
  };

  const validateAttribute = (trait_type: string, value: string) => {
    return {
      trait_type: !trait_type.trim(),
      value: !value.trim(),
    };
  };

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newAttributes = [...metadata.attributes];
    newAttributes[index] = { ...newAttributes[index], [field]: value };
    
    // Validate the updated attribute
    const errors = validateAttribute(newAttributes[index].trait_type, newAttributes[index].value);
    setAttributeErrors(prev => ({
      ...prev,
      [index]: errors
    }));
    
    onMetadataChange({
      ...metadata,
      attributes: newAttributes,
    });
  };

  // Initialize default attributes if none exist
  React.useEffect(() => {
    if (metadata.attributes.length === 0) {
      const defaultAttributes: Attribute[] = [
        { trait_type: 'Empire', value: '' },
        { trait_type: 'Emperor', value: '' },
        { trait_type: 'Metal', value: '' },
        { trait_type: 'Diameter', value: '' },
        { trait_type: 'Weight', value: '' },
      ];
      onMetadataChange({
        ...metadata,
        attributes: defaultAttributes,
      });
    }
  }, []);

  return (
    <Stack spacing={4}>
      {/* Basic Information */}
      <StyledCard>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#D4AF37', color: 'white' }}>
              <DescriptionIcon />
            </Avatar>
          }
          title={
            <Typography variant="h6" fontWeight={600} color="#0A1F44">
              Basic Information
            </Typography>
          }
          subheader="Provide the essential details for your NFT"
        />
        <CardContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="NFT Name *"
              placeholder="e.g., 1923 Peace Silver Dollar"
              value={metadata.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              variant="outlined"
              required
              helperText="Choose a descriptive name for your coin"
            />

            <TextField
              fullWidth
              label="Description *"
              placeholder="Describe this coin's history, significance, and unique characteristics..."
              value={metadata.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              required
              helperText="Provide a detailed description of your coin"
            />

            <TextField
              fullWidth
              label="External URL"
              placeholder="https://example.com/coin-details"
              value={metadata.external_url}
              onChange={(e) => handleInputChange('external_url', e.target.value)}
              variant="outlined"
              helperText="Optional link to more information about this coin"
              InputProps={{
                startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Stack>
        </CardContent>
      </StyledCard>

      {/* Attributes */}
      <StyledCard>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#D4AF37', color: 'white' }}>
              <CategoryIcon />
            </Avatar>
          }
          title={
            <Typography variant="h6" fontWeight={600} color="#0A1F44">
              Attributes
            </Typography>
          }
          subheader="Add coin attributes and characteristics"
        />
        <CardContent>
          <Stack spacing={2}>
            {/* Existing Attributes */}
            {metadata.attributes.map((attribute, index) => (
              <AttributeRow key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    label="Attribute Name"
                    value={attribute.trait_type}
                    onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                    size="small"
                    sx={{ minWidth: 150 }}
                    error={attributeErrors[index]?.trait_type}
                    helperText={attributeErrors[index]?.trait_type ? 'Attribute name cannot be empty' : ''}
                  />
                  <TextField
                    label="Value"
                    value={attribute.value}
                    onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                    size="small"
                    fullWidth
                    placeholder="Enter value..."
                    error={attributeErrors[index]?.value}
                    helperText={attributeErrors[index]?.value ? 'Value cannot be empty' : ''}
                  />
                  <IconButton
                    onClick={() => removeAttribute(index)}
                    color="error"
                    size="small"
                    sx={{
                      bgcolor: 'error.light',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'error.main',
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </AttributeRow>
            ))}

            {/* Add New Attribute */}
            <AttributeRow>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Attribute Name"
                  placeholder="e.g., Historical Period"
                  value={newAttribute.trait_type}
                  onChange={(e) => {
                    setNewAttribute({ ...newAttribute, trait_type: e.target.value });
                    if (newAttributeErrors.trait_type && e.target.value.trim()) {
                      setNewAttributeErrors(prev => ({ ...prev, trait_type: false }));
                    }
                  }}
                  size="small"
                  sx={{ minWidth: 150 }}
                  error={newAttributeErrors.trait_type}
                  helperText={newAttributeErrors.trait_type ? 'Attribute name cannot be empty' : ''}
                />
                <TextField
                  label="Value"
                  placeholder="e.g., Art Deco Era"
                  value={newAttribute.value}
                  onChange={(e) => {
                    setNewAttribute({ ...newAttribute, value: e.target.value });
                    if (newAttributeErrors.value && e.target.value.trim()) {
                      setNewAttributeErrors(prev => ({ ...prev, value: false }));
                    }
                  }}
                  size="small"
                  fullWidth
                  error={newAttributeErrors.value}
                  helperText={newAttributeErrors.value ? 'Value cannot be empty' : ''}
                />
                <Button
                  variant="contained"
                  onClick={addAttribute}
                  disabled={!newAttribute.trait_type.trim() || !newAttribute.value.trim()}
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: '#0A1F44',
                    '&:hover': { bgcolor: '#0A1F44', opacity: 0.9 },
                  }}
                >
                  Add
                </Button>
              </Stack>
            </AttributeRow>
          </Stack>
        </CardContent>
      </StyledCard>

      {metadata.attributes.length === 0 && (
        <Alert severity="info" icon={<CategoryIcon />}>
          No attributes added yet. Add some attributes to make your NFT more valuable and descriptive.
        </Alert>
      )}
    </Stack>
  );
}
