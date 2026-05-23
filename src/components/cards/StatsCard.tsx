import React from 'react';
import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Shadows } from '../../theme/tokens';

interface StatsCardProps {
  title: string;
  value: number | string;
  Icon: LucideIcon;
  colorClass: string;
  trend?: string;
}

export const StatsCard = ({ title, value, Icon, colorClass, trend }: StatsCardProps) => {
  const accentColor = colorClass.includes('blue')
    ? '#3B82F6'
    : colorClass.includes('red')
      ? '#EF4444'
      : colorClass.includes('amber')
        ? '#F59E0B'
        : '#10B981';

  return (
    <View
      className="bg-white p-5 rounded-[24px] border border-slate-50 w-[48%] mb-4 flex-col justify-between overflow-hidden"
      style={{
        minHeight: 140,
        ...Shadows.colored(accentColor)
      }}
    >
      <View
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.08]"
        style={{ backgroundColor: accentColor }}
      />
      <View className="absolute -left-8 -bottom-8 w-20 h-20 rounded-full opacity-[0.04]"
        style={{ backgroundColor: accentColor }}
      />
      
      <View className="flex-row justify-between items-start mb-4">
        <View className={`p-3 rounded-2xl ${colorClass}`}>
          <Icon size={22} color={accentColor} strokeWidth={2.5} />
        </View>
        {trend && (
          <View className="bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
            <Text className="text-[11px] font-black text-slate-600">{trend}</Text>
          </View>
        )}
      </View>
      <View className="z-10">
        <Text className="text-[32px] font-black text-slate-900 tracking-tight">{value}</Text>
        <Text className="text-[10px] text-slate-400 font-bold mt-0.5 tracking-wider uppercase">{title}</Text>
      </View>
    </View>
  );
};
