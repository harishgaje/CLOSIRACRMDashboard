import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading = false,
  isDisabled = false,
  className = '',
}: ButtonProps) => {
  
  // 1. Determine Background & Border Styles
  const getContainerStyles = () => {
    const base = "flex-row items-center justify-center rounded-xl transition-opacity";
    const opacity = isDisabled || isLoading ? "opacity-50" : "active:opacity-80";
    
    const variants = {
      primary: "bg-primary shadow-sm",
      secondary: "bg-white border border-slate-200 shadow-sm",
      danger: "bg-danger shadow-sm",
      ghost: "bg-transparent",
    };

    const sizes = {
      sm: "py-2 px-3",
      md: "py-3 px-4",
      lg: "py-4 px-6",
    };

    return `${base} ${variants[variant]} ${sizes[size]} ${opacity} ${className}`;
  };

  // 2. Determine Text & Icon Colors
  const getTextColor = () => {
    if (variant === 'secondary') return 'text-slate-700';
    if (variant === 'ghost') return 'text-primary';
    return 'text-white';
  };

  const getIconColor = () => {
    if (variant === 'secondary') return '#475569'; // slate-600
    if (variant === 'ghost') return '#2563EB'; // primary blue
    return '#ffffff';
  };

  const getTextStyles = () => {
    const sizes = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };
    return `font-bold ${getTextColor()} ${sizes[size]} ${Icon || isLoading ? 'ml-2' : ''}`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled || isLoading}
      className={getContainerStyles()}
    >
      {isLoading ? (
        <ActivityIndicator color={getIconColor()} size="small" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} color={getIconColor()} />
      ) : null}
      
      <Text className={getTextStyles()}>
        {isLoading ? 'Processing...' : title}
      </Text>
    </TouchableOpacity>
  );
};
