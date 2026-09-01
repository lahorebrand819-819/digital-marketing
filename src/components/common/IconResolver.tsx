import React from 'react';
import * as Icons from 'lucide-react';

interface IconResolverProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconResolver: React.FC<IconResolverProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  // Map common aliases or clean strings
  const cleanName = name?.trim() || 'Sparkles';
  
  // Try direct lookup
  // @ts-ignore
  const IconComponent = Icons[cleanName] || Icons[cleanName.charAt(0).toUpperCase() + cleanName.slice(1)] || Icons.Sparkles;

  return <IconComponent className={className} size={size} />;
};
