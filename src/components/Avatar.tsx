'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export default function Avatar({ src, alt, className = '', fallback }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Se houve erro, mostrar fallback
  if (imageError) {
    return (
      <div className={`bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center ${className}`}>
        {fallback ? (
          <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
            {fallback}
          </span>
        ) : (
          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
}
