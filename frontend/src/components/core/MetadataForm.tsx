'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Attribute {
  trait_type: string;
  value: string;
  display_type?: string;
}

interface MetadataFormProps {
  metadata: {
    name: string;
    description: string;
    attributes: Attribute[];
  };
  onMetadataChange: (metadata: {
    name: string;
    description: string;
    attributes: Attribute[];
  }) => void;
}

export default function MetadataForm({ metadata, onMetadataChange }: MetadataFormProps) {
  const [newAttribute, setNewAttribute] = useState({ trait_type: '', value: '', display_type: '' });

  const handleInputChange = (field: string, value: string) => {
    onMetadataChange({
      ...metadata,
      [field]: value,
    });
  };

  const addAttribute = () => {
    if (newAttribute.trait_type && newAttribute.value) {
      const attribute: Attribute = {
        trait_type: newAttribute.trait_type,
        value: newAttribute.value,
        ...(newAttribute.display_type && { display_type: newAttribute.display_type }),
      };
      
      onMetadataChange({
        ...metadata,
        attributes: [...metadata.attributes, attribute],
      });
      
      setNewAttribute({ trait_type: '', value: '', display_type: '' });
    }
  };

  const removeAttribute = (index: number) => {
    const newAttributes = metadata.attributes.filter((_, i) => i !== index);
    onMetadataChange({
      ...metadata,
      attributes: newAttributes,
    });
  };

  const addCommonAttribute = (trait_type: string, value: string) => {
    const attribute: Attribute = { trait_type, value };
    onMetadataChange({
      ...metadata,
      attributes: [...metadata.attributes, attribute],
    });
  };

  const commonAttributes = [
    { trait_type: 'Year', placeholder: 'e.g., 1923' },
    { trait_type: 'Mint Mark', placeholder: 'e.g., D, S, P' },
    { trait_type: 'Condition', placeholder: 'e.g., Fine, Very Fine, Uncirculated' },
    { trait_type: 'Rarity', placeholder: 'e.g., Common, Scarce, Rare' },
    { trait_type: 'Material', placeholder: 'e.g., Silver, Gold, Bronze' },
    { trait_type: 'Weight', placeholder: 'e.g., 26.73g' },
    { trait_type: 'Diameter', placeholder: 'e.g., 38.1mm' },
  ];

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#0A1F44] border-b pb-2">Step 1: Basic Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NFT Name *
          </label>
          <Input
            type="text"
            placeholder="e.g., 1923 Peace Silver Dollar"
            value={metadata.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            placeholder="Describe this coin's history, significance, and unique characteristics..."
            value={metadata.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-vertical"
          />
        </div>
      </div>

      {/* Attributes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#0A1F44] border-b pb-2">Step 2: Attributes</h3>
        
        {/* Common Coin Attributes */}
        <Card className="border-gray-200 bg-gray-50/50">
          <CardHeader>
            <CardTitle className="text-md text-[#0A1F44]">
              Common Coin Attributes
            </CardTitle>
            <p className="text-sm text-gray-600">
              Quickly add common attributes for your coin.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonAttributes.map((attr) => (
                <div key={attr.trait_type} className="flex items-center space-x-2">
                  <Input
                    placeholder={attr.placeholder}
                    className="flex-1 border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        addCommonAttribute(attr.trait_type, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder="${attr.placeholder}"]`) as HTMLInputElement;
                      if (input?.value) {
                        addCommonAttribute(attr.trait_type, input.value);
                        input.value = '';
                      }
                    }}
                    className="border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Attributes */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-md text-[#0A1F44]">
              Custom Attributes
            </CardTitle>
            <p className="text-sm text-gray-600">
              Add unlimited custom attributes for your NFT.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Attribute name"
                value={newAttribute.trait_type}
                onChange={(e) => setNewAttribute({ ...newAttribute, trait_type: e.target.value })}
                className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <Input
                placeholder="Value"
                value={newAttribute.value}
                onChange={(e) => setNewAttribute({ ...newAttribute, value: e.target.value })}
                className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <select
                value={newAttribute.display_type}
                onChange={(e) => setNewAttribute({ ...newAttribute, display_type: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
              >
                <option value="">Text</option>
                <option value="number">Number</option>
                <option value="boost_number">Boost Number</option>
                <option value="boost_percentage">Boost Percentage</option>
                <option value="date">Date</option>
              </select>
              <Button
                onClick={addAttribute}
                disabled={!newAttribute.trait_type || !newAttribute.value}
                className="w-full bg-[#0A1F44] text-white hover:bg-opacity-90"
              >
                Add Attribute
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Attributes */}
        {metadata.attributes.length > 0 && (
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-md text-[#0A1F44]">
                Current Attributes ({metadata.attributes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {metadata.attributes.map((attribute, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2 py-1 px-3 bg-[#D4AF37]/10 text-[#0A1F44] border border-[#D4AF37]/50 rounded-full"
                  >
                    <span className="font-semibold">{attribute.trait_type}:</span>
                    <span>{attribute.value}</span>
                    {attribute.display_type && (
                      <span className="text-xs opacity-75">({attribute.display_type})</span>
                    )}
                    <button
                      onClick={() => removeAttribute(index)}
                      className="ml-1 text-[#0A1F44] hover:text-red-500 focus:outline-none"
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
