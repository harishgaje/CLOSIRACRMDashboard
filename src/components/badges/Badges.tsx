import React from 'react';
import { View, Text } from 'react-native';
import { LeadStatus, Channel } from '../../types';
import { MessageCircle, Mail, Phone } from 'lucide-react-native';

export const StatusBadge = ({ status }: { status: LeadStatus }) => {
  const config = {
    new: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'New' },
    qualified: { bg: 'bg-green-100', text: 'text-green-700', label: 'Qualified' },
    escalated: { bg: 'bg-red-100', text: 'text-red-700', label: 'Escalated' },
  };
  
  const style = config[status];

  return (
    <View className={`${style.bg} px-2.5 py-1 rounded-full border border-white`}>
      <Text className={`${style.text} text-xs font-bold capitalize`}>{style.label}</Text>
    </View>
  );
};

export const ChannelBadge = ({ channel }: { channel: Channel }) => {
  const config = {
    whatsapp: { bg: 'bg-green-50', icon: MessageCircle, color: '#16A34A' },
    email: { bg: 'bg-blue-50', icon: Mail, color: '#2563EB' },
    call: { bg: 'bg-amber-50', icon: Phone, color: '#F59E0B' },
  };

  const style = config[channel];
  const Icon = style.icon;

  return (
    <View className={`${style.bg} p-2 rounded-xl mr-2 border border-white`}>
      <Icon size={14} color={style.color} />
    </View>
  );
};
