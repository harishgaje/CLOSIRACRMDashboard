import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import { Lead } from '../../types';
import { StatusBadge, ChannelBadge } from '../badges/Badges';
import { Shadows } from '../../theme/tokens';

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard = ({ lead }: LeadCardProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Conversation')}
      activeOpacity={0.7}
      className="bg-white p-4 rounded-[20px] border border-slate-50 mb-3"
      style={Shadows.soft}
    >
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center flex-1 pr-3">
          <ChannelBadge channel={lead.channel} />
          <Text className="text-[15px] font-black text-slate-900 ml-2" numberOfLines={1}>
            {lead.customer}
          </Text>
        </View>
        <StatusBadge status={lead.status} />
      </View>
      
      <View className="bg-slate-50/50 rounded-xl p-3 mb-1">
        <Text className="text-sm font-semibold text-slate-700" numberOfLines={1}>
          {lead.reason}
        </Text>
        <Text className="text-xs text-slate-500 mt-1 font-medium" numberOfLines={1}>
          {lead.summary}
        </Text>
      </View>
      
      <View className="flex-row justify-between items-center mt-2 px-1">
        <Text className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
          {new Date(lead.receivedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-[11px] font-bold text-blue-500 mr-1">View Details</Text>
          <ChevronRight size={14} color="#3B82F6" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
