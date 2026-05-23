import React from 'react';
import { DimensionValue, View, Text } from 'react-native';
import { RefreshCw } from 'lucide-react-native';

/**
 * Loading Skeleton / Shimmer effect for data loading states
 */

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  className = 'bg-slate-200 rounded',
}) => {
  return <View style={{ width, height }} className={`${className} animate-pulse`} />;
};

/**
 * Skeleton card for list items
 */
export const SkeletonCard: React.FC = () => (
  <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-slate-100">
    <Skeleton width="60%" height={20} className="bg-slate-200 rounded mb-3" />
    <Skeleton width="100%" height={16} className="bg-slate-100 rounded mb-2" />
    <Skeleton width="80%" height={16} className="bg-slate-100 rounded" />
  </View>
);

/**
 * Skeleton grid for dashboard KPI cards
 */
export const SkeletonGrid: React.FC = () => (
  <View className="flex-row flex-wrap justify-between">
    {[1, 2, 3, 4].map((i) => (
      <View key={i} className="w-[48%] mb-4">
        <Skeleton width="100%" height={140} className="bg-slate-200 rounded-xl" />
      </View>
    ))}
  </View>
);

/**
 * Loading spinner overlay
 */
interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => (
  <View className="flex-1 justify-center items-center">
    <RefreshCw size={32} color="#0066cc" className="animate-spin mb-3" />
    <Text className="text-slate-600 font-medium">{message}</Text>
  </View>
);

/**
 * Shimmer animation component
 */
export const Shimmer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View className="animate-pulse">{children}</View>
);
